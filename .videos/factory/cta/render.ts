import { constants, copyFileSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { atomic, digest, engineRoot, fileHash, readJson, safe } from '../storage.ts';
import { browserExecutable, executable, execute, probe } from '../media.ts';
import { configSignature, inputSignature, sources, validateConfig } from './contracts.ts';
import type { Config, Run, Task } from './contracts.ts';
import { hashes, readManifest, saveManifest } from './queue.ts';
import type { CtaProps } from '../../src/schemas/cta.ts';

export const readConfig = (root: string, task: Task) => readJson(safe(root, `${task.path}/config.json`)) as Config;
export function renderSignature(c: Config) {
  const engine = ['src/scenes/BebelCtaScene.tsx', 'src/compositions/CtaCompositions.tsx',
    'src/schemas/cta.ts', 'src/Root.tsx', 'src/index.ts', 'factory/cta/render.ts',
    'remotion.config.ts', 'package-lock.json'].map((p) => fileHash(safe(engineRoot, p)));
  return digest(JSON.stringify({ config: configSignature(c), engine }));
}
export function assertInputs(root: string, task: Task, c: Config) {
  if (inputSignature(hashes(root, task)) !== c.inputSignature) throw new Error('Originais mudaram; prepare e inspecione novamente');
  const m = readManifest(root, task);
  if (m.taskId !== c.taskId || m.key !== task.key) throw new Error('Config/manifest de outra tarefa');
  validateConfig(c);
}
export function stage(root: string, task: Task, c: Config, run: Run) {
  const dir = safe(engineRoot, run.stage);
  mkdirSync(dir, { recursive: true });
  for (const [role, name] of Object.entries(sources)) {
    const destination = safe(engineRoot, `${run.stage}/${name}`);
    if (!existsSync(destination)) copyFileSync(safe(root, `${task.path}/${name}`), destination, constants.COPYFILE_EXCL);
    if (fileHash(destination) !== c.hashes[role as keyof typeof sources]) throw new Error('Staging divergente');
  }
  if (run.allIntra && !existsSync(safe(engineRoot, `${run.stage}/video-all-intra.mp4`))) {
    execute(executable('ffmpeg'), ['-v', 'error', '-i', safe(root, `${task.path}/${sources.video}`),
      '-map', '0:v:0', '-an', '-c:v', 'libx264', '-crf', '18', '-g', '1', '-pix_fmt', 'yuv420p',
      '-fps_mode', 'passthrough', '-n', safe(engineRoot, `${run.stage}/video-all-intra.mp4`)]);
  }
  const props: CtaProps = {
    video: `${run.stage.slice(7)}/${run.allIntra ? 'video-all-intra.mp4' : sources.video}`,
    narration: `${run.stage.slice(7)}/${sources.narration}`, cta: `${run.stage.slice(7)}/${sources.cta}`,
    durationInFrames: c.render.durationInFrames, videoPlaybackRate: c.render.videoPlaybackRate,
    ctaStartSeconds: c.timing.ctaStartSeconds!, ctaEntranceSeconds: c.timing.ctaEntranceSeconds,
    ctaWidth: c.layout.ctaWidth, ctaTop: c.layout.ctaTop, entranceOffset: c.layout.entranceOffset,
  };
  atomic(safe(root, `${task.path}/${run.props}`), props);
}
export function cleanStage(run: Run) {
  if (!/^public\/generated\/cta-[a-f0-9-]+$/.test(run.stage)) throw new Error('Staging fora do contrato');
  const dir = safe(engineRoot, run.stage);
  if (existsSync(dir)) rmSync(dir, { recursive: true });
}
export function render(root: string, task: Task): Run {
  if (task.state !== '002-desenvolvendo') throw new Error('Render exige tarefa em desenvolvimento');
  const c = readConfig(root, task); assertInputs(root, task, c);
  const m = readManifest(root, task), signature = renderSignature(c);
  if (m.run?.complete && m.run.signature === signature && m.output?.signature === signature &&
      existsSync(safe(root, `${task.path}/${m.output.file}`)) &&
      fileHash(safe(root, `${task.path}/${m.output.file}`)) === m.output.hash) return m.run;
  if (m.run?.complete && m.run.signature === signature && m.run.hash &&
      existsSync(safe(root, `${task.path}/${m.run.file}`)) &&
      fileHash(safe(root, `${task.path}/${m.run.file}`)) === m.run.hash) return m.run;
  if (m.run) {
    cleanStage(m.run);
    if (/^runtime\/[a-f0-9-]+\/video\.mp4$/.test(m.run.file)) {
      const previous = safe(root, `${task.path}/${m.run.file.slice(0, -10)}`);
      if (existsSync(previous)) rmSync(previous, { recursive: true });
    }
  }
  const id = randomUUID();
  const run: Run = { id, signature, inputSignature: c.inputSignature, file: `runtime/${id}/video.mp4`,
    props: `runtime/${id}/props.json`, stage: `public/generated/cta-${id}`, complete: false };
  m.run = run; m.status = 'prepared'; saveManifest(root, task, m, 'Render iniciado');
  stage(root, task, c, run);
  const output = safe(root, `${task.path}/${run.file}`);
  const browser = browserExecutable();
  const invoke = () => execute(process.execPath, [resolve(engineRoot, 'node_modules/@remotion/cli/remotion-cli.js'),
    'render', 'src/index.ts', c.composition, output, `--props=${safe(root, `${task.path}/${run.props}`)}`,
    '--codec=h264', '--audio-codec=aac', '--pixel-format=yuv420p', '--color-space=bt709', '--crf=18', '--concurrency=2',
    '--overwrite=false', '--log=error', ...(browser ? [`--browser-executable=${browser}`] : [])], engineRoot);
  try { invoke(); }
  catch (error) {
    if (!/No frame found|decode|decoding/i.test(String(error))) throw error;
    if (existsSync(output)) rmSync(output);
    const intermediate = safe(engineRoot, `${run.stage}/video-all-intra.mp4`);
    execute(executable('ffmpeg'), ['-v', 'error', '-i', safe(root, `${task.path}/${sources.video}`),
      '-map', '0:v:0', '-an', '-c:v', 'libx264', '-crf', '18', '-g', '1', '-pix_fmt', 'yuv420p',
      '-fps_mode', 'passthrough', '-n', intermediate]);
    const p = probe(intermediate), v = p.streams[0];
    if (v.width !== c.media.videoWidth || v.height !== c.media.videoHeight ||
        Math.abs(Number(p.format.duration) - c.media.videoSeconds) > 1 / 30)
      throw new Error('All-intra alterou dimensão/duração');
    run.allIntra = true; stage(root, task, c, run);
    saveManifest(root, task, m, 'Cópia all-intra após falha de decodificação');
    invoke();
  }
  assertInputs(root, task, c);
  run.hash = fileHash(output); run.complete = true; m.status = 'rendered';
  m.pending = 'Checagem rápida do MP4 pendente';
  saveManifest(root, task, m, 'MP4 temporário renderizado');
  return run;
}
