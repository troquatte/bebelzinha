import { copyFileSync, existsSync, mkdirSync, renameSync, rmSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';
import { atomic, digest, engineRoot, fileHash, safe } from '../storage.ts';
import { browserExecutable, execute, probe, validateMetadata } from '../media.ts';
import { assets, bank, compile, fingerprint, readPlan } from './prepare.ts';
import { move, saveWork, work } from './queue.ts';
import type { Task, ThemeProps } from './contracts.ts';
import { accelerate } from './speed.ts';
import { appendEnding, ending, exportFrames } from './ending.ts';

const stagePath = (id: string) => {
  if (!/^[a-f0-9-]{36}$/.test(id)) throw new Error('ID de staging inválido');
  return `public/generated/cenas-${id}`;
};
export function signature(planSignature: string) {
  const code = ['src/scenes/BebelTema.tsx', 'src/scenes/BebelFollow.tsx', 'src/scenes/BebelEngagement.tsx', 'src/scenes/PreparationDemo.tsx', 'src/scenes/CookingPan.tsx', 'src/Root.tsx', 'factory/cenas/contracts.ts', 'factory/cenas/item-sounds.ts',
    'factory/cenas/prepare.ts', 'factory/cenas/assets.ts', 'factory/cenas/render.ts', 'factory/cenas/speed.ts', 'factory/cenas/ending.ts', 'brand/miolo.json', 'package-lock.json'];
  return digest(JSON.stringify({ planSignature, endingHash: ending()?.hash, engine: code.map((p) => fileHash(safe(engineRoot, p))) }));
}
export function stage(root: string, task: Task, compiled = compile(root, task)): ThemeProps {
  const w = work(root, task), path = stagePath(w.id);
  mkdirSync(safe(engineRoot, path), { recursive: true });
  const paths: Record<string, string> = {};
  for (const p of assets(compiled.plan)) {
    const relative = `${path}/${p.slice(7)}`;
    mkdirSync(safe(engineRoot, relative.slice(0, relative.lastIndexOf('/'))), { recursive: true });
    copyFileSync(bank(root, p), safe(engineRoot, relative));
    if (fileHash(safe(engineRoot, relative)) !== compiled.hashes[p]) throw new Error(`Staging divergente: ${p}`);
    paths[p] = relative.slice(7);
  }
  const audio = `${path}/audio.mp3`;
  copyFileSync(safe(root, `${task.path}/audio.mp3`), safe(engineRoot, audio));
  if (fileHash(safe(engineRoot, audio)) !== compiled.hashes['audio.mp3']) throw new Error('Áudio mudou durante staging');
  const props = structuredClone(compiled.props);
  props.audio = audio.slice(7); props.font = paths[compiled.plan.font];
  if (props.itemSound) props.itemSound.asset=paths[props.itemSound.asset];
  props.media = Object.fromEntries(Object.entries(props.media).map(([p, info]) => [paths[p], info]));
  for (const s of props.scenes) {
    s.background.asset = paths[s.background.asset];
    if (s.follow) s.follow.avatar = paths[s.follow.avatar];
    for (const pose of s.character?.poses ?? []) pose.asset = paths[pose.asset];
    for (const item of s.items) item.asset = paths[item.asset];
    if (s.engagement) s.engagement.sound=paths[s.engagement.sound];
  }
  atomic(safe(root, `${task.path}/.runtime/props.json`), props);
  return props;
}
export function render(root: string, task: Task) {
  if (task.state !== '002-desenvolvendo') throw new Error('Render exige tema em desenvolvimento');
  const compiled = compile(root, task), sig = signature(compiled.signature), w = work(root, task);
  if (w.run?.complete && w.run.signature === sig) {
    const output = w.promotion?.output.file ?? w.run.file;
    const file = safe(root, `${task.path}/${output}`);
    if (existsSync(file) && fileHash(file) === w.run.hash) return { file: output, resumed: true };
  }
  if (w.promotion) throw new Error('Promoção pendente; execute cenas:reconcile antes de mudar a montagem');
  const runtime = safe(root, `${task.path}/.runtime`);
  if (existsSync(runtime)) rmSync(runtime, { recursive: true });
  stage(root, task, compiled);
  w.run = { signature: sig, file: '.runtime/render.mp4', complete: false }; delete w.pending;
  saveWork(root, task, w);
  const input = fingerprint(root, task), browser = browserExecutable();
  execute(process.execPath, [resolve(engineRoot, 'node_modules/@remotion/cli/remotion-cli.js'),
    'render', 'src/index.ts', 'BebelMioloTema', safe(root, `${task.path}/${w.run.file}`),
    `--props=${safe(root, `${task.path}/.runtime/props.json`)}`, '--codec=h264', '--audio-codec=aac',
    '--pixel-format=yuv420p', '--color-space=bt709', '--crf=18', '--concurrency=2', '--overwrite=false', '--log=error',
    ...(browser ? [`--browser-executable=${browser}`] : [])], engineRoot);
  if (fingerprint(root, task) !== input) throw new Error('Entradas mudaram durante render; resultado não promovido');
  accelerate(safe(root, `${task.path}/${w.run.file}`), compiled.props.durationInFrames);
  appendEnding(safe(root, `${task.path}/${w.run.file}`), compiled.props.durationInFrames);
  if (signature(compiled.signature) !== sig) throw new Error('Configuração ou CTA mudou durante render');
  w.run.complete = true; w.run.hash = fileHash(safe(root, `${task.path}/${w.run.file}`));
  saveWork(root, task, w); return { file: w.run.file, resumed: false };
}
export function recoverPromotion(root: string, task: Task) {
  const w = work(root, task), p = w.promotion;
  if (!p) return;
  if (p.source !== '.runtime/render.mp4' || !/^output\/convertido-\d{4,}\.mp4$/.test(p.output.file) ||
    !w.run?.complete || w.run.signature !== p.output.signature || w.run.hash !== p.output.hash)
    throw new Error('Promoção sem render validado');
  if (signature(compile(root, task).signature) !== p.output.signature) throw new Error('Entradas da promoção mudaram');
  const source = safe(root, `${task.path}/${p.source}`), dest = safe(root, `${task.path}/${p.output.file}`);
  if (existsSync(source) && existsSync(dest)) throw new Error('Destino ocupado; não sobrescrito');
  if (existsSync(source)) {
    if (fileHash(source) !== p.output.hash) throw new Error('MP4 divergente');
    mkdirSync(safe(root, `${task.path}/output`), { recursive: true }); renameSync(source, dest);
  }
  if (!existsSync(dest) || fileHash(dest) !== p.output.hash) throw new Error('Promoção incompleta');
  const plan = readPlan(root, task); plan.output = p.output;
  atomic(safe(root, `${task.path}/montagem.json`), plan);
}
export function compact(root: string, task: Task) {
  if (task.state !== '003-gerados') throw new Error('Limpeza exige tema gerado');
  const plan = readPlan(root, task, false);
  if (!plan.output || !/^output\/convertido-\d{4,}\.mp4$/.test(plan.output.file) ||
    fileHash(safe(root, `${task.path}/${plan.output.file}`)) !== plan.output.hash)
    throw new Error('Saída ausente/alterada; controles preservados');
  const control = safe(root, `${task.path}/.work.json`);
  if (existsSync(control)) {
    const dir = safe(engineRoot, stagePath(work(root, task).id));
    if (existsSync(dir)) rmSync(dir, { recursive: true });
    const runtime = safe(root, `${task.path}/.runtime`);
    if (existsSync(runtime)) rmSync(runtime, { recursive: true });
    unlinkSync(control);
  }
}
export function finish(root: string, task: Task) {
  if (task.state !== '002-desenvolvendo') throw new Error('Conclusão exige tema em desenvolvimento');
  const w = work(root, task), compiled = compile(root, task), run = w.run;
  if (!run?.complete || !run.hash || run.signature !== signature(compiled.signature)) throw new Error('Render ausente ou montagem mudou');
  const file = safe(root, `${task.path}/${w.promotion?.output.file ?? run.file}`);
  if (fileHash(file) !== run.hash) throw new Error('MP4 alterado');
  validateMetadata(probe(file), exportFrames(compiled.props.durationInFrames));
  if (!w.promotion) {
    let n = 1;
    while (existsSync(safe(root, `${task.path}/output/convertido-${String(n).padStart(4, '0')}.mp4`))) n++;
    w.promotion = { source: run.file, output: { file: `output/convertido-${String(n).padStart(4, '0')}.mp4`, hash: run.hash, signature: run.signature } };
    saveWork(root, task, w);
  }
  recoverPromotion(root, task);
  const result = move(root, task, '003-gerados'); compact(root, result);
  return { task: result.key, output: `${result.path}/${w.promotion.output.file}`, approval: null };
}
