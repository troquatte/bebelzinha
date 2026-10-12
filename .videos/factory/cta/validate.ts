import { existsSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { atomic, fileHash, now, readJson, safe } from '../storage.ts';
import { execute, executable, pcm, probe } from '../media.ts';
import type { Config, Task } from './contracts.ts';
import { move, readManifest, saveManifest } from './queue.ts';
import { assertInputs, cleanStage, readConfig, renderSignature } from './render.ts';

function rms(a: Float32Array) { let total = 0; for (const x of a) total += x * x; return Math.sqrt(total / Math.max(1, a.length)); }
function compare(a: Float32Array, b: Float32Array, lag: number, start = 0, end = a.length, step = 1) {
  let aa = 0, bb = 0, ab = 0;
  for (let i = Math.max(start, -lag); i < Math.min(end, b.length - lag); i += step) {
    aa += a[i] * a[i]; bb += b[i + lag] * b[i + lag]; ab += a[i] * b[i + lag];
  }
  return { correlation: ab / Math.sqrt(aa * bb), gain: ab / aa, energy: aa };
}
export function compareAudio(a: Float32Array, b: Float32Array, monoToStereo: boolean) {
  if (rms(a) < 0.0001) throw new Error('Narração silenciosa: não é possível comprovar integridade da fala');
  let lag = 0, best = -Infinity;
  for (let offset = -800; offset <= 800; offset += 8) {
    const r = compare(a, b, offset, 0, a.length, 8);
    if (r.correlation > best) { best = r.correlation; lag = offset; }
  }
  const coarse = lag;
  best = -Infinity;
  for (let offset = coarse - 8; offset <= coarse + 8; offset++) {
    const r = compare(a, b, offset);
    if (r.correlation > best) { best = r.correlation; lag = offset; }
  }
  const full = compare(a, b, lag);
  const naturalGain = Math.abs(full.gain - 1) < 0.04 || (monoToStereo && Math.abs(full.gain - Math.SQRT1_2) < 0.04);
  if (full.correlation < 0.98 || !naturalGain || Math.abs(lag) > 512)
    throw new Error(`Áudio divergente: correlação=${full.correlation}, ganho=${full.gain}, lag=${lag}`);
  let windows = 0;
  for (let start = 0; start < a.length; start += 4000) {
    const window = compare(a, b, lag, start, Math.min(start + 4000, a.length));
    if (window.energy < 0.001) continue;
    windows++;
    if (window.correlation < 0.9 || Math.abs(window.gain - full.gain) > 0.12)
      throw new Error(`Fala alterada/cortada em ${start / 16000}s`);
  }
  const tail = b.subarray(a.length + Math.max(lag, 0) + 1280);
  const tailRms = rms(tail);
  if (tail.length < 0.35 * 16000 || tailRms > 0.001) throw new Error('Sustentação ausente ou áudio extra/duplicado');
  return { ...full, lagSamples: lag, checkedWindows: windows, tailSeconds: tail.length / 16000, tailRms };
}
export function frameTimes(c: Config): number[] {
  const frames = [0, Math.round((c.timing.ctaStartSeconds! + c.timing.ctaEntranceSeconds / 2) * 30),
    Math.round((c.timing.ctaStartSeconds! + c.timing.ctaEntranceSeconds) * 30),
    Math.floor(c.render.durationInFrames / 2), c.render.durationInFrames - 1];
  return [...new Set(frames)].sort((a, b) => a - b).map((f) => f / 30);
}
function rejectPreviews(root: string, path: string, taskPath = path) {
  for (const e of readdirSync(safe(root, path), { withFileTypes: true })) {
    const p = `${path}/${e.name}`; safe(root, p);
    if (e.isDirectory()) rejectPreviews(root, p, taskPath);
    else if (/\.(png|jpe?g|webp)$/i.test(e.name) && p !== `${taskPath}/3-arte.png`)
      throw new Error(`Imagem de prévia inesperada: ${p}`);
  }
}
export function validate(root: string, task: Task, requireVisual = true) {
  const c = readConfig(root, task), m = readManifest(root, task); assertInputs(root, task, c);
  const run = m.run;
  if (!run?.complete || run.signature !== renderSignature(c) || !run.hash) throw new Error('Render ausente ou configuração/motor mudou');
  const relativeFile = m.output?.signature === run.signature ? m.output.file : run.file;
  const file = safe(root, `${task.path}/${relativeFile}`);
  if (fileHash(file) !== run.hash) throw new Error('MP4 alterado desde o render');
  const p = probe(file), vs = p.streams.filter((s) => s.codec_type === 'video'), as = p.streams.filter((s) => s.codec_type === 'audio');
  if (p.streams.length !== 2 || vs.length !== 1 || as.length !== 1 || vs[0].codec_name !== 'h264' ||
      vs[0].width !== 1080 || vs[0].height !== 1920 || vs[0].avg_frame_rate !== '30/1' ||
      vs[0].pix_fmt !== 'yuv420p' || as[0].codec_name !== 'aac' ||
      Number(vs[0].nb_frames) !== c.render.durationInFrames ||
      Math.abs(Number(p.format.duration) - c.render.durationInFrames / 30) > 0.08)
    throw new Error('MP4 fora do contrato de streams/dimensões/FPS/duração');
  execute(executable('ffmpeg'), ['-v', 'error', '-xerror', '-i', file, '-c:v', 'rawvideo', '-c:a', 'pcm_s16le', '-f', 'null', '-']);
  const original = safe(root, `${task.path}/1-audio.mp3`), audioProbe = probe(original);
  const channels = audioProbe.streams.find((s) => s.codec_type === 'audio')!.channels!;
  if (![1, 2].includes(channels) || ![1, 2].includes(as[0].channels!)) throw new Error('Layout de áudio não suportado');
  const audio = [];
  for (let channel = 0; channel < as[0].channels!; channel++)
    audio.push(compareAudio(pcm(original, Math.min(channel, channels - 1)), pcm(file, channel), channels === 1 && as[0].channels === 2));
  if (channels === 2 && as[0].channels !== 2) throw new Error('Canais de áudio descartados');
  const frames = frameTimes(c);
  for (const seconds of frames) {
    const bytes = execute(executable('ffmpeg'), ['-v', 'error', '-ss', String(seconds), '-i', file,
      '-frames:v', '1', '-vf', 'scale=270:480', '-f', 'image2pipe', '-c:v', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1']);
    if (bytes.length !== 270 * 480 * 3) throw new Error(`Quadro não decodificado: ${seconds}`);
  }
  rejectPreviews(root, task.path);
  const reviewPath = safe(root, `${task.path}/visual-review.json`);
  const visual = existsSync(reviewPath) ? readJson(reviewPath) as {
    outputHash: string; configSignature: string; frameTimes: number[]; notes: string; passed: boolean;
  } : null;
  const visualPassed = visual?.passed === true && visual.outputHash === run.hash &&
    visual.configSignature === run.signature && visual.notes?.trim().length > 20 &&
    frames.every((s) => visual.frameTimes?.some((t) => Math.abs(t - s) < 0.001));
  const report = { schemaVersion: 1, at: now(), file: relativeFile, outputHash: run.hash,
    configSignature: run.signature, technicalPassed: true, visualPassed: Boolean(visualPassed),
    complete: Boolean(visualPassed), durationSeconds: Number(p.format.duration), audio,
    requiredVisualFrameTimes: frames, visual, originalHashes: c.hashes, noPreviews: true };
  atomic(safe(root, `${task.path}/validation.json`), report);
  if (requireVisual && !visualPassed) throw new Error('Validação técnica passou; falta inspeção visual vinculada ao hash em visual-review.json');
  return report;
}
export function finish(root: string, task: Task) {
  if (task.state !== '002-desenvolvendo') throw new Error('Concluir exige desenvolvimento');
  const report = validate(root, task), m = readManifest(root, task);
  let output = m.output;
  if (!output || output.signature !== report.configSignature) {
    let version = 1;
    while (existsSync(safe(root, `${task.path}/output/convertido-${String(version).padStart(4, '0')}.mp4`))) version++;
    const file = `output/convertido-${String(version).padStart(4, '0')}.mp4`;
    // Journal dentro da tarefa; um crash após rename é recuperado pelo reconcile.
    output = { file, hash: report.outputHash, signature: report.configSignature };
    atomic(safe(root, `${task.path}/promotion.json`), { source: report.file, output, done: false });
    recoverPromotion(root, task);
  }
  const updated = readManifest(root, task);
  updated.status = 'generated'; delete updated.pending;
  saveManifest(root, task, updated, 'Conclusão técnica; aprovação permanece null');
  const result = move(root, task, '003-gerados');
  cleanStage(updated.run!);
  const runtime = safe(root, `${result.path}/runtime`);
  if (existsSync(runtime)) rmSync(runtime, { recursive: true });
  return { task: result.key, output: `${result.path}/${output.file}`, approval: null };
}
export function recoverPromotion(root: string, task: Task) {
  const journalPath = safe(root, `${task.path}/promotion.json`);
  if (!existsSync(journalPath)) return;
  const j = readJson(journalPath) as { source: string; output: { file: string; hash: string; signature: string }; done: boolean };
  if (j.done) return;
  const source = safe(root, `${task.path}/${j.source}`), dest = safe(root, `${task.path}/${j.output.file}`);
  if (!/^runtime\/[a-f0-9-]+\/video\.mp4$/.test(j.source) || !/^output\/convertido-\d+\.mp4$/.test(j.output.file))
    throw new Error('Promoção fora do contrato');
  if (existsSync(source) && existsSync(dest)) throw new Error('Destino de promoção ocupado');
  const report = readJson(safe(root, `${task.path}/validation.json`)) as { file: string; complete: boolean; outputHash: string; configSignature: string };
  const config = readConfig(root, task);
  assertInputs(root, task, config);
  if (!report.complete || report.outputHash !== j.output.hash || report.configSignature !== j.output.signature ||
      renderSignature(config) !== j.output.signature) throw new Error('Promoção sem validação atual completa');
  if (existsSync(source)) {
    if (fileHash(source) !== j.output.hash) throw new Error('Hash inválido para promoção');
    mkdirSync(safe(root, `${task.path}/output`), { recursive: true });
    renameSync(source, dest);
  }
  if (!existsSync(dest) || fileHash(dest) !== j.output.hash) throw new Error('Promoção incompleta ou divergente');
  const m = readManifest(root, task); m.output = j.output;
  saveManifest(root, task, m, 'MP4 validado promovido');
  report.file = j.output.file;
  atomic(safe(root, `${task.path}/validation.json`), report);
  atomic(safe(root, `${task.path}/versions/${j.output.file.split('/').pop()}.json`),
    { output: j.output, config: readConfig(root, task), validation: readJson(safe(root, `${task.path}/validation.json`)) });
  atomic(journalPath, { ...j, done: true });
}
