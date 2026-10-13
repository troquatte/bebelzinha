import { existsSync, mkdirSync, readdirSync, renameSync, rmSync } from 'node:fs';
import { atomic, fileHash, readJson, safe } from '../storage.ts';
import { probe, validateMetadata } from '../media.ts';
export { validateMetadata } from '../media.ts';
import type { Config, Task } from './contracts.ts';
import { move, readManifest, saveManifest } from './queue.ts';
import { assertInputs, cleanStage, readConfig, renderSignature } from './render.ts';

function rejectPreviews(root: string, path: string, taskPath = path) {
  for (const e of readdirSync(safe(root, path), { withFileTypes: true })) {
    const p = `${path}/${e.name}`; safe(root, p);
    if (e.isDirectory()) rejectPreviews(root, p, taskPath);
    else if (/\.(png|jpe?g|webp)$/i.test(e.name) && p !== `${taskPath}/3-arte.png`)
      throw new Error(`Imagem de prévia inesperada: ${p}`);
  }
}
export function validate(root: string, task: Task) {
  const c = readConfig(root, task), m = readManifest(root, task); assertInputs(root, task, c);
  const run = m.run;
  if (!run?.complete || (task.state !== '003-gerados' && run.signature !== renderSignature(c)) || !run.hash) throw new Error('Render ausente ou configuração/motor mudou');
  const relativeFile = m.output?.signature === run.signature ? m.output.file : run.file;
  const file = safe(root, `${task.path}/${relativeFile}`);
  if (fileHash(file) !== run.hash) throw new Error('MP4 alterado desde o render');
  const p = probe(file);
  validateMetadata(p, c.render.durationInFrames);
  rejectPreviews(root, task.path);
  return { file: relativeFile, outputHash: run.hash, configSignature: run.signature,
    technicalPassed: true, durationSeconds: Number(p.format.duration),
    status: 'OK', noPreviews: true };

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
    atomic(safe(root, `${task.path}/promotion.json`), { source: report.file, output, validated: true, done: false });
    recoverPromotion(root, task);
  }
  const updated = readManifest(root, task);
  updated.status = 'generated'; delete updated.pending;
  saveManifest(root, task, updated, 'Conclusão técnica; aprovação permanece null');
  const result = move(root, task, '003-gerados');
  compactCompleted(root, result);
  return { task: result.key, output: `${result.path}/${output.file}`, approval: null };
}
export function recoverPromotion(root: string, task: Task) {
  const journalPath = safe(root, `${task.path}/promotion.json`);
  if (!existsSync(journalPath)) return;
  const j = readJson(journalPath) as { source: string; output: { file: string; hash: string; signature: string }; validated?: boolean; done: boolean };
  if (j.done) return;
  const source = safe(root, `${task.path}/${j.source}`), dest = safe(root, `${task.path}/${j.output.file}`);
  if (!/^runtime\/[a-f0-9-]+\/video\.mp4$/.test(j.source) || !/^output\/convertido-\d+\.mp4$/.test(j.output.file))
    throw new Error('Promoção fora do contrato');
  if (existsSync(source) && existsSync(dest)) throw new Error('Destino de promoção ocupado');
  const config = readConfig(root, task);
  assertInputs(root, task, config);
  if (j.validated !== true || renderSignature(config) !== j.output.signature)
    throw new Error('Promoção sem validação atual completa');
  if (existsSync(source)) {
    if (fileHash(source) !== j.output.hash) throw new Error('Hash inválido para promoção');
    mkdirSync(safe(root, `${task.path}/output`), { recursive: true });
    renameSync(source, dest);
  }
  if (!existsSync(dest) || fileHash(dest) !== j.output.hash) throw new Error('Promoção incompleta ou divergente');
  const m = readManifest(root, task); m.output = j.output;
  saveManifest(root, task, m, 'MP4 validado promovido');
  atomic(journalPath, { ...j, done: true });
}

// Apenas controles descartáveis; originais e output nunca são removidos.
export function compactCompleted(root: string, task: Task) {
  if (task.state !== '003-gerados') throw new Error('Limpeza exige tarefa gerada');
  const m = readManifest(root, task), c = readConfig(root, task);
  if (!m.output || !/^output\/convertido-\d+\.mp4$/.test(m.output.file) ||
      fileHash(safe(root, `${task.path}/${m.output.file}`)) !== m.output.hash)
    throw new Error('Saída ausente ou alterada; controles preservados');
  const legacy = c as Config & { inspection?: { allowSlowVideo?: boolean } };
  if (legacy.inspection?.allowSlowVideo) c.allowSlowVideo = true;
  delete legacy.inspection;
  assertInputs(root, task, c);
  c.output = m.output;
  atomic(safe(root, `${task.path}/config.json`), c);
  if (m.run) cleanStage(m.run);
  for (const name of ['runtime', 'versions', 'blocked.json', 'transcript.json', 'validation.json',
    'visual-review.json', 'promotion.json', 'manifest.json']) {
    const path = safe(root, `${task.path}/${name}`);
    if (existsSync(path)) rmSync(path, { recursive: name === 'runtime' || name === 'versions' });
  }
  return { task: task.key, output: `${task.path}/${c.output.file}` };
}
