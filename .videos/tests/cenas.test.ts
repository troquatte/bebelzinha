import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { atomic, engineRoot, exclusive, fileHash, safe } from '../factory/storage.ts';
import { queueRoot, states } from '../factory/cenas/contracts.ts';
import type { Plan } from '../factory/cenas/contracts.ts';
import { create, find, list, narration, recover, reserve, work } from '../factory/cenas/queue.ts';
import { background, importImage } from '../factory/cenas/assets.ts';
import { editorial, remember } from '../factory/cenas/editorial.ts';
import { acceleratedFrames } from '../factory/cenas/speed.ts';
import { backgroundRate, bank, fingerprint, prepare, validatePlan } from '../factory/cenas/prepare.ts';
import { compact } from '../factory/cenas/render.ts';
import { synthesize, wordMarkers } from '../factory/narration/elevenlabs.ts';
import type { VoiceConfig } from '../factory/narration/elevenlabs.ts';

function fixture(t: { after: (fn: () => void) => void }) {
  mkdirSync(safe(engineRoot, 'temp'), { recursive: true });
  const root = mkdtempSync(safe(engineRoot, 'temp/cenas-test-'));
  for (const state of states) mkdirSync(safe(root, `${queueRoot}/${state}`), { recursive: true });
  t.after(() => rmSync(root, { recursive: true }));
  return root;
}
function add(root: string, key = '001-arroz', state = states[0] as typeof states[number]) {
  const path = `${queueRoot}/${state}/${key}`;
  mkdirSync(safe(root, path));
  writeFileSync(safe(root, `${path}/roteiro.md`), '# Arroz\n\n## Narração\nMinha filha, confira a despensa!\n\n## Cenas\nDuas cenas.');
  return find(root, key);
}
const plan = (): Plan => ({ schemaVersion: 1, narration: 'Minha filha', audio: 'audio.mp3',
  font: 'assets/fontes/roboto.ttf', holdSeconds: 0.3, scenes: [
    { id: 'cena-01', from: 0, to: 2, background: { asset: 'assets/cenario/cozinha.png', type: 'image' }, items: [], titles: [] },
    { id: 'cena-02', from: 2, to: 4, background: { asset: 'assets/cenario/cozinha.png', type: 'image' }, items: [], titles: [] },
  ] });

test('velocidade final 1.3x mantém FPS e arredonda a duração completa', () => {
  assert.equal(acceleratedFrames(609, 1.3), 469);
  assert.equal(acceleratedFrames(183, 1.3), 141);
});

test('clipe de demonstração usa o tempo da cena; cozinha contínua usa o tema', () => {
  const s = plan().scenes[1]; s.from = 10; s.to = 13; s.background.type = 'video';
  s.background.timing = 'scene'; assert.equal(backgroundRate(s, 3, 18), 1);
  assert.equal(backgroundRate(s, 1.5, 18), .5);
  s.background.timing = 'global'; assert.equal(backgroundRate(s, 3, 18), 1 / 6);
});

test('lista ilustrada exige título e uma a três linhas não vazias', () => {
  const p = plan(); p.scenes[0].checklist = {heading:'Lista',lines:['Ingrediente que falta']};
  assert.doesNotThrow(() => validatePlan(p,4));
  p.scenes[0].checklist.lines=['']; assert.throws(() => validatePlan(p,4), /Lista ilustrada/);
  p.scenes[0].checklist.lines=['a','b','c','d']; assert.throws(() => validatePlan(p,4), /Lista ilustrada/);
});

test('demonstração culinária rejeita etapa desconhecida e enquadramento inválido', () => {
  const p=plan(); p.scenes[0].cooking={stage:'saute',table:false};
  assert.doesNotThrow(()=>validatePlan(p,4));
  p.scenes[0].cooking.stage='desconhecido' as 'saute';
  assert.throws(()=>validatePlan(p,4),/Etapa culinária/);
  p.scenes[0].cooking={stage:'serve',table:1 as unknown as boolean};
  assert.throws(()=>validatePlan(p,4),/Etapa culinária/);
});

test('tema cria ID novo sem sobrescrever outro com mesmo nome', (t) => {
  const root = fixture(t), first = create(root, 'Arroz repetido!', 20), second = create(root, 'Arroz repetido!', 20);
  assert.equal(first.task, '001-arroz-repetido'); assert.equal(second.task, '002-arroz-repetido');
  assert.throws(() => narration(scriptText(root, first.roteiro)), /vazia/);
  assert.throws(() => create(root, '../', 20)); assert.throws(() => create(root, 'Tema', 0));
});
function scriptText(root: string, path: string) { return readFileSync(safe(root, path), 'utf8'); }

test('memória editorial preserva categorias, evita repetição e não depende de vídeos apagados', (t) => {
  const root = fixture(t);
  const initial = editorial(engineRoot)!; initial.used = [];
  atomic(safe(root, 'brand/temas-utilizados.json'), initial);
  const category = 'despensa-e-compras';
  assert.equal(remember(root, '001-arroz-repetido', 'Arroz repetido!', category, 'Conferir despensa').reused, false);
  assert.equal(remember(root, '001-arroz-repetido', 'Arroz repetido!', category, 'Conferir despensa').reused, true);
  assert.throws(() => remember(root, '002-arroz', 'Arroz repetido', category, 'Outra frase'), /já usado/);
    assert.throws(() => remember(root, '002-outra', 'Outra dica', category, 'Ideia diferente'), /Categoria já usada/);
    assert.throws(() => remember(root, '002-igual', 'Outro título', 'rotina-e-humor', 'Conferir despensa'), /Ideia já usada/);
  assert.throws(() => remember(root, '002-politica', 'Outro', 'politica', 'Resumo'), /inválidos/);
  assert.throws(() => remember(root, '001-arroz-repetido', 'Mudou', category, 'Outra ideia'), /não sobrescrito/);
  assert.equal(editorial(root)?.used.length, 1);
  assert.equal(list(root).length, 0);
  assert.equal(create(root, 'Nova dica').task, '002-nova-dica');
  assert.deepEqual(editorial(root)?.editorial.categories, editorial(engineRoot)?.editorial.categories);
  remember(root, '003-arroz', 'Arroz repetido', category, 'Repetição autorizada', true);
  assert.equal(editorial(root)?.used.length, 2);
});

test('nova rodada autorizada libera categoria sem liberar temas anteriores', (t) => {
  const root = fixture(t), initial = editorial(engineRoot)!;
  initial.used = []; initial.editorial.categoryRound = 1;
  atomic(safe(root, 'brand/temas-utilizados.json'), initial);
  remember(root, '001-primeira', 'Primeira ideia', 'cozinha-do-dia-a-dia', 'Resumo inicial');
  const next = editorial(root)!; next.editorial.categoryRound = 2;
  atomic(safe(root, 'brand/temas-utilizados.json'), next);
  remember(root, '002-segunda', 'Segunda ideia', 'cozinha-do-dia-a-dia', 'Outro resumo');
  assert.equal(editorial(root)!.used[1].round, 2);
  assert.throws(() => remember(root, '003-terceira', 'Terceira ideia', 'cozinha-do-dia-a-dia', 'Resumo novo'), /Categoria já usada/);
  assert.throws(() => remember(root, '003-primeira', 'Primeira ideia', 'rotina-e-humor', 'Mudou resumo'), /Tema já usado/);
});

test('vídeo do mesmo nome tem prioridade, imagem é fallback; novo vídeo invalida bloqueio', (t) => {
  const root = fixture(t), task = prepare(root, add(root)).task;
  mkdirSync(safe(root, 'assets/cenario'), { recursive: true });
  writeFileSync(safe(root, 'assets/cenario/cozinha.png'), 'image');
  const requested = { asset: 'assets/cenario/cozinha.png', type: 'image' as const };
  assert.deepEqual(background(root, requested), requested);
  atomic(safe(root, `${task.path}/montagem.json`), plan()); const before = fingerprint(root, task);
  writeFileSync(safe(root, 'assets/cenario/cozinha.mp4'), 'video');
  assert.deepEqual(background(root, requested), { asset: 'assets/cenario/cozinha.mp4', type: 'video' });
  assert.equal(background(root, {...requested, timing: 'scene'}).timing, 'scene');
  assert.notEqual(fingerprint(root, task), before);
  assert.throws(() => background(root, { asset: 'assets/cenario/../../outside.png', type: 'image' }));
  assert.throws(() => background(root, { asset: 'assets/cenario/missing.png', type: 'image' }), /ausente/);
  rmSync(safe(root, 'assets/cenario/cozinha.mp4'));
  assert.deepEqual(background(root, { asset: 'assets/cenario/cozinha.mp4', type: 'video' }), requested);
});
test('imagem importada fica no banco correto, reaproveita hash e preserva versão existente', (t) => {
  const root = fixture(t), file = safe(root, 'generated.png');
  const header = Buffer.from([137,80,78,71,13,10,26,10]); writeFileSync(file, Buffer.concat([header, Buffer.from('image-one')]));
  assert.deepEqual(importImage(root, file, 'itens', 'feijao'), { asset: 'assets/itens/feijao.png', reused: false });
  assert.equal(importImage(root, file, 'itens', 'feijao').reused, true);
  const before = fileHash(safe(root, 'assets/itens/feijao.png'));
  writeFileSync(file, Buffer.concat([header, Buffer.from('image-two')]));
  assert.equal(importImage(root, file, 'itens', 'feijao').asset, 'assets/itens/feijao-02.png');
  assert.equal(fileHash(safe(root, 'assets/itens/feijao.png')), before);
  assert.throws(() => importImage(root, file, '../', 'feijao'));
  writeFileSync(file, 'invalid'); assert.throws(() => importImage(root, file, 'cenario', 'cozinha'), /PNG/);
});

test('roteiro separa fala de instruções, aceita acentos e fim do arquivo', () => {
  assert.equal(narration('## Narração\n“Olá!\nMinha filha.”\n## Cenas\nNão ler isto'), 'Olá! Minha filha.');
  assert.equal(narration('## Narracao\nOi!'), 'Oi!');
  assert.throws(() => narration('## Narração\n\n## Cenas\nTeste'));
  assert.throws(() => narration('# Apenas direção visual'));
});
test('reserva move tema inteiro e prioriza desenvolvimento, sem tipos CTA', (t) => {
  const root = fixture(t), first = add(root);
  const second = add(root, '002-outro');
  const prepared = prepare(root, second);
  assert.equal(prepared.task.state, states[1]);
  assert.equal(list(root)[0].key, second.key);
  assert.equal(prepared.pending.length, 2);
  assert.ok(existsSync(safe(root, `${prepared.task.path}/roteiro.md`)));
  assert.equal(find(root, first.key).state, states[0]);
});
test('roteiro ausente não reserva e ID duplicado bloqueia fila', (t) => {
  const root = fixture(t), task = add(root);
  rmSync(safe(root, `${task.path}/roteiro.md`));
  assert.throws(() => reserve(root, task), /roteiro.md/);
  assert.equal(find(root, task.key).state, states[0]);
  mkdirSync(safe(root, `${queueRoot}/${states[1]}/001-outro`));
  assert.throws(() => list(root), /duplicado/);
});
test('movimento interrompido após rename recupera identidade e é idempotente', (t) => {
  const root = fixture(t), task = reserve(root, add(root)), control = work(root, task);
  const to = `${queueRoot}/${states[2]}/${task.key}`;
  atomic(safe(root, 'logs/cenas-moves/interrupt.json'), { from: task.path, to, key: task.key, id: control.id, state: states[2] });
  renameSync(safe(root, task.path), safe(root, to));
  recover(root); recover(root);
  assert.equal(find(root, task.key).state, states[2]);
  assert.equal(work(root, find(root, task.key)).id, control.id);
});
test('journal não pode mover uma pasta externa ao tema', (t) => {
  const root = fixture(t);
  atomic(safe(root, 'logs/cenas-moves/bad.json'), { from: queueRoot, to: `${queueRoot}/${states[2]}/001-arroz`, key: '001-arroz', id: 'x', state: states[2] });
  assert.throws(() => recover(root), /fora da fila/);
});
test('lock assíncrono permanece até concluir, independente do CTA', async (t) => {
  const root = fixture(t);
  let release!: () => void;
  const running = exclusive(root, () => new Promise<void>((resolve) => { release = resolve; }), 'cenas');
  assert.throws(() => exclusive(root, () => true, 'cenas'), /ocupada/);
  assert.equal(exclusive(root, () => true), true);
  release(); await running;
  assert.equal(exclusive(root, () => true, 'cenas'), true);
  await assert.rejects(exclusive(root, async () => { throw new Error('teste'); }, 'cenas'));
  assert.ok(!existsSync(safe(root, 'logs/cenas.lock')));
});
test('timeline contínua aceita múltiplas cenas; lacunas, cortes e poses inválidas bloqueiam', () => {
  validatePlan(plan(), 4);
  for (const from of [1.8, 2.2]) { const p = plan(); p.scenes[1].from = from; assert.throws(() => validatePlan(p, 4)); }
  assert.throws(() => validatePlan(plan(), 5), /duração real/);
  const p = plan(); p.scenes[0].character = { faceX: 500, faceY: 900, poses: [{ at: 0.5, asset: 'x', width: 800, anchorX: 0, anchorY: 0 }] };
  assert.throws(() => validatePlan(p, 4), /Personagem/);
});
test('saída de item exige intervalo e duração válidos', () => {
  const p = plan();
  p.scenes[0].items = [{ id: 'arroz', asset: 'assets/itens/arroz.png', x: 70, ground: 1780, width: 330, at: .2, until: 1.8, exit: .45 }];
  validatePlan(p, 4);
  for (const until of [.2, 2.1]) {
    p.scenes[0].items[0].until = until;
    assert.throws(() => validatePlan(p, 4));
  }
  p.scenes[0].items[0].until = 1.8;
  p.scenes[0].items[0].exit = 0;
  assert.throws(() => validatePlan(p, 4));
});

test('objeto visível no primeiro quadro não pode ter entrada futura', () => {
  const p = plan();
  p.scenes[0].items = [{ id: 'resultado', asset: 'assets/itens/resultado.png', x: 100, ground: 1760, width: 790, at: 0, initiallyVisible: true }];
  validatePlan(p, 4);
  p.scenes[0].items[0].at = .5;
  assert.throws(() => validatePlan(p, 4));
});

test('bancos recusam arquivos externos; adicionar mídia ausente libera bloqueio', (t) => {
  const root = fixture(t), task = prepare(root, add(root)).task;
  for (const p of ['../x', 'assets/cta/x.png', 'assets/cenario/../../x', 'C:/x']) assert.throws(() => bank(root, p));
  atomic(safe(root, `${task.path}/montagem.json`), plan());
  const before = fingerprint(root, task);
  mkdirSync(safe(root, 'assets/cenario'), { recursive: true });
  writeFileSync(safe(root, 'assets/cenario/cozinha.png'), 'new image');
  assert.notEqual(fingerprint(root, task), before);
});
test('conclusão remove controles, preserva entradas; apagar gerados não cria pendência', (t) => {
  const root = fixture(t), task = add(root, '001-arroz', states[2]);
  const file = `${task.path}/output/convertido-0001.mp4`;
  mkdirSync(safe(root, `${task.path}/output`)); writeFileSync(safe(root, file), 'diagnostic');
  const p = plan(); p.output = { file: 'output/convertido-0001.mp4', hash: fileHash(safe(root, file)), signature: 'test' };
  atomic(safe(root, `${task.path}/montagem.json`), p);
  atomic(safe(root, `${task.path}/.work.json`), { id: '00000000-0000-0000-0000-000000000000', key: task.key });
  compact(root, task);
  assert.ok(existsSync(safe(root, `${task.path}/roteiro.md`)));
  assert.ok(!existsSync(safe(root, `${task.path}/.work.json`)));
  rmSync(safe(root, task.path), { recursive: true }); assert.deepEqual(list(root), []);
});
test('ElevenLabs deriva palavras dos tempos reais e rejeita alinhamento inválido', () => {
  const alignment = { characters: [...'Oi Bebel'], character_start_times_seconds: [0,.1,.2,.3,.4,.5,.6,.7], character_end_times_seconds: [.1,.2,.3,.4,.5,.6,.7,.8] };
  assert.deepEqual(wordMarkers(alignment), [{ text: 'Oi', start: 0, end: .2 }, { text: 'Bebel', start: .3, end: .8 }]);
  assert.throws(() => wordMarkers({ ...alignment, character_start_times_seconds: [-1] }));
});
test('ElevenLabs exige ativação; chamada simulada usa fala integral 1x e não repete erros', async (t) => {
  const key = process.env.ELEVENLABS_API_KEY, voice = process.env.ELEVENLABS_VOICE_ID;
  process.env.ELEVENLABS_API_KEY = 'fake-test-key'; process.env.ELEVENLABS_VOICE_ID = 'fake-voice';
  t.after(() => { if (key === undefined) delete process.env.ELEVENLABS_API_KEY; else process.env.ELEVENLABS_API_KEY = key;
    if (voice === undefined) delete process.env.ELEVENLABS_VOICE_ID; else process.env.ELEVENLABS_VOICE_ID = voice; });
  const config: VoiceConfig = { provider: 'provided', voiceId: null, modelId: 'eleven_multilingual_v2', settings: { stability: .7, similarity_boost: .85, style: .1, use_speaker_boost: true, speed: 1 } };
  let calls = 0;
  const mock = (async (url: string | URL | Request, options?: RequestInit) => {
    calls++; assert.match(String(url), /with-timestamps/);
    const body = JSON.parse(String(options?.body)); assert.equal(body.text, 'Minha filha!'); assert.equal(body.voice_settings.speed, 1);
    return new Response(JSON.stringify({ audio_base64: Buffer.alloc(64).toString('base64') }), { status: 200 });
  }) as typeof fetch;
  await assert.rejects(synthesize('Minha filha!', config, mock), /Ative/); assert.equal(calls, 0);
  config.provider = 'elevenlabs'; await synthesize('Minha filha!', config, mock); assert.equal(calls, 1);
  calls = 0;
  await assert.rejects(synthesize('Minha filha!', config, (async () => { calls++; return new Response('fake-test-key', { status: 429 }); }) as typeof fetch), /HTTP 429; não repetir/);
  assert.equal(calls, 1);
});
