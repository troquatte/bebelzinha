import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, symlinkSync, utimesSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { atomic, engineRoot, exclusive, fileHash, safe } from '../factory/storage.ts';
import { configSignature, inputSignature, kinds, queueRoot, sources, states, timing, validateConfig } from '../factory/cta/contracts.ts';
import type { Config, Kind } from '../factory/cta/contracts.ts';
import { hashes, list, move, readManifest, recover, reserve } from '../factory/cta/queue.ts';
import { compareAudio, frameTimes, recoverPromotion } from '../factory/cta/validate.ts';
import { renderSignature } from '../factory/cta/render.ts';

function fixture(t: { after: (fn: () => void) => void }) {
  mkdirSync(join(engineRoot, 'temp'), { recursive: true });
  const root = mkdtempSync(join(engineRoot, 'temp/cta-test-'));
  for (const state of states) for (const kind of kinds)
    mkdirSync(safe(root, `${queueRoot}/${state}/${kind}`), { recursive: true });
  t.after(() => rmSync(root, { recursive: true }));
  return root;
}
function add(root: string, name = '001-tema', kind: Kind = kinds[0]) {
  const folder = `${queueRoot}/${states[0]}/${kind}/${name}`;
  mkdirSync(safe(root, folder));
  for (const file of Object.values(sources)) {
    const path = safe(root, `${folder}/${file}`); writeFileSync(path, `fixture:${file}`);
    utimesSync(path, new Date(0), new Date(0));
  }
  return list(root).find((t) => t.name === name && t.kind === kind)!;
}
function config(): Config {
  const h = { narration: 'n', video: 'v', cta: 'a' }, signature = inputSignature(h);
  return { schemaVersion: 1, taskId: 'test', templateId: 'cta-inicio', composition: 'BebelInicio',
    sources, inputSignature: signature, hashes: h,
    media: { audioSeconds: 3.5, videoSeconds: 5, videoWidth: 1080, videoHeight: 1916,
      artWidth: 1536, artHeight: 1024, alpha: true, bounds: { left: 76, top: 137, right: 1482, bottom: 870 } },
    timing: { sustainSeconds: 0.5, ctaStartSeconds: 1.5, ctaEntranceSeconds: 0.5 },
    layout: { ctaWidth: 880, ctaTop: 24, entranceOffset: 28, margin: 24 }, render: timing(3.5, 5),
    inspection: { inputSignature: signature, ctaStartSeconds: 1.5, safeBottom: 655,
      notes: 'Fixture de contrato, não evidência de mídia.', narrationEvidence: 'Fixture.', inspectedVideoSeconds: [0, 2.5, 4.9] } };
}
test('duração inclui 0.5s; vídeo longo não acelera; curto desacelera', () => {
  assert.equal(timing(3.32, 5.04).durationInFrames, 115);
  assert.equal(timing(3.32, 5.04).videoPlaybackRate, 1);
  assert.equal(timing(7.5, 5).videoPlaybackRate, 0.625);
  assert.throws(() => timing(NaN, 5));
});
test('caminhos recusam traversal, absoluto e junction', (t) => {
  const root = fixture(t);
  for (const bad of ['../x', '/tmp/x', 'C:/x', 'a\\b', 'a/../b', 'a//b']) assert.throws(() => safe(root, bad));
  symlinkSync(engineRoot, join(root, 'link'), process.platform === 'win32' ? 'junction' : 'dir');
  assert.throws(() => safe(root, 'link/package.json'));
});
test('reserva move originais e preserva identidade/hash', (t) => {
  const root = fixture(t), task = add(root), before = hashes(root, task);
  const moved = exclusive(root, () => reserve(root, task));
  assert.equal(moved.state, '002-desenvolvendo');
  assert.equal(moved.key, task.key); assert.deepEqual(hashes(root, moved), before);
  assert.equal(readManifest(root, moved).approval, null);
  assert.equal(list(root).length, 1); assert.equal(existsSync(safe(root, task.path)), false);
});
test('não reserva arquivo faltante ou ainda em cópia', (t) => {
  const root = fixture(t), task = add(root);
  const file = safe(root, `${task.path}/1-audio.mp3`);
  utimesSync(file, new Date(), new Date()); assert.throws(() => reserve(root, task), /cópia/);
  rmSync(file); assert.throws(() => reserve(root, task), /Falta/);
  assert.equal(existsSync(safe(root, task.path)), true);
});
test('ID duplicado no mesmo tipo é recusado mesmo com outro slug', (t) => {
  const root = fixture(t); add(root);
  mkdirSync(safe(root, `${queueRoot}/${states[2]}/${kinds[0]}/001-outro`));
  assert.throws(() => list(root), /duplicado/);
});
test('mesmo ID em início e final é permitido', (t) => {
  const root = fixture(t); add(root); add(root, '001-tema', kinds[1]);
  assert.equal(list(root).length, 2);
});
test('destino existente nunca é sobrescrito', (t) => {
  const root = fixture(t), task = reserve(root, add(root));
  mkdirSync(safe(root, `${queueRoot}/${states[2]}/${task.kind}/${task.name}`));
  assert.throws(() => move(root, task, states[2]), /existe/);
  assert.equal(existsSync(safe(root, task.path)), true);
});
test('journal recupera crash antes e depois de mover; retomada é idempotente', (t) => {
  const root = fixture(t); let task = reserve(root, add(root));
  const m = readManifest(root, task), target = `${queueRoot}/${states[0]}/${task.kind}/${task.name}`;
  atomic(safe(root, 'logs/cta-journal/test.json'), { from: task.path, to: target, taskId: m.taskId, state: states[0], done: false });
  recover(root); assert.equal(list(root)[0].state, states[0]); assert.deepEqual(recover(root), []);
  task = reserve(root, list(root)[0]);
  atomic(safe(root, 'logs/cta-journal/test2.json'), { from: task.path, to: target, taskId: m.taskId, state: states[0], done: false });
  renameSync(safe(root, task.path), safe(root, target));
  recover(root); assert.equal(readManifest(root, list(root)[0]).stage, states[0]);
});
test('lock de processo vivo impede execução concorrente', (t) => {
  const root = fixture(t);
  exclusive(root, () => assert.throws(() => exclusive(root, () => null), /ocupada/));
  assert.equal(existsSync(safe(root, 'logs/cta.lock')), false);
});
test('sem inspeção ou com layout invasivo não pode renderizar', () => {
  const c = config(); validateConfig(c);
  c.inspection = null; assert.throws(() => validateConfig(c), /Inspeção/);
  const d = config(); d.layout.ctaWidth = 1000; d.inspection!.safeBottom = 550;
  assert.throws(() => validateConfig(d), /invade/);
});
test('slow motion extremo exige decisão; config nova invalida assinatura', () => {
  const c = config(), before = configSignature(c);
  c.media.videoSeconds = 1; c.render = timing(3.5, 1); c.inspection!.inspectedVideoSeconds = [0, 0.5, 0.9];
  assert.throws(() => validateConfig(c), /decisão/);
  c.inspection!.allowSlowVideo = true; validateConfig(c); assert.notEqual(configSignature(c), before);
});
test('quadros exigidos incluem entrada e último frame real', () => {
  const times = frameTimes(config()); assert.ok(times.includes(1.7666666666666666));
  assert.equal(times.at(-1), 119 / 30);
});
function signal() { return Float32Array.from({ length: 32000 }, (_, i) => Math.sin(i * 0.04 + i * i * 0.000003) * 0.2); }
test('áudio preservado com padding AAC e mapeamento mono/stereo passa', () => {
  const a = signal(), b = new Float32Array(a.length + 8000);
  b.set(a.map((v) => v * Math.SQRT1_2), 32);
  const result = compareAudio(a, b, true); assert.equal(result.lagSamples, 32);
});
test('áudio cortado, duplicado, alterado em velocidade ou com cauda falha', () => {
  const a = signal();
  const doubled = new Float32Array(a.length + 8000); doubled.set(a.map((v) => v * 2));
  assert.throws(() => compareAudio(a, doubled, false));
  const cut = new Float32Array(a.length + 8000); cut.set(a.subarray(0, 20000));
  assert.throws(() => compareAudio(a, cut, false));
  const speed = new Float32Array(a.length + 8000); speed.set(a.map((_, i) => a[Math.min(a.length - 1, Math.floor(i * 1.1))]));
  assert.throws(() => compareAudio(a, speed, false));
  const tail = new Float32Array(a.length + 8000); tail.set(a); tail.fill(0.1, a.length);
  assert.throws(() => compareAudio(a, tail, false), /Sustentação/);
});
test('journal de promoção conflitante preserva ambos os arquivos', (t) => {
  const root = fixture(t), task = reserve(root, add(root));
  mkdirSync(safe(root, `${task.path}/runtime/abcd`), { recursive: true });
  mkdirSync(safe(root, `${task.path}/output`));
  const source = `${task.path}/runtime/abcd/video.mp4`, dest = `${task.path}/output/convertido-0001.mp4`;
  writeFileSync(safe(root, source), 'first'); writeFileSync(safe(root, dest), 'second');
  atomic(safe(root, `${task.path}/promotion.json`), { source: 'runtime/abcd/video.mp4', output: { file: 'output/convertido-0001.mp4', hash: 'x', signature: 'x' }, done: false });
  assert.throws(() => recoverPromotion(root, task), /ocupado/);
  assert.equal(readFileSync(safe(root, source), 'utf8'), 'first');
  assert.equal(readFileSync(safe(root, dest), 'utf8'), 'second');
});
for (const alreadyMoved of [false, true]) test(`promoção recupera crash ${alreadyMoved ? 'depois' : 'antes'} do rename`, (t) => {
  const root = fixture(t), task = reserve(root, add(root)), m = readManifest(root, task);
  const c = config(); c.taskId = m.taskId; c.hashes = hashes(root, task);
  c.inputSignature = inputSignature(c.hashes); c.inspection!.inputSignature = c.inputSignature;
  atomic(safe(root, `${task.path}/config.json`), c);
  mkdirSync(safe(root, `${task.path}/runtime/abcd`), { recursive: true });
  mkdirSync(safe(root, `${task.path}/output`));
  const source = 'runtime/abcd/video.mp4', output = 'output/convertido-0001.mp4';
  writeFileSync(safe(root, `${task.path}/${source}`), 'fixture de persistencia');
  const hash = fileHash(safe(root, `${task.path}/${source}`)), signature = renderSignature(c);
  atomic(safe(root, `${task.path}/validation.json`), { file: source, complete: true, outputHash: hash, configSignature: signature });
  atomic(safe(root, `${task.path}/promotion.json`), { source, output: { file: output, hash, signature }, done: false });
  if (alreadyMoved) renameSync(safe(root, `${task.path}/${source}`), safe(root, `${task.path}/${output}`));
  recoverPromotion(root, task); recoverPromotion(root, task);
  assert.equal(readManifest(root, task).output?.hash, hash);
  assert.equal(existsSync(safe(root, `${task.path}/${source}`)), false);
  assert.equal(fileHash(safe(root, `${task.path}/${output}`)), hash);
});
