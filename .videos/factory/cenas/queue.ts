import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { atomic, readJson, safe } from '../storage.ts';
import { queueRoot, states } from './contracts.ts';
import type { State, Task, Work } from './contracts.ts';
import { editorial } from './editorial.ts';

export function list(root: string): Task[] {
  const result: Task[] = [], ids = new Set<number>();
  for (const state of states) {
    const dir = `${queueRoot}/${state}`;
    if (!existsSync(safe(root, dir))) continue;
    for (const e of readdirSync(safe(root, dir), { withFileTypes: true })) {
      if (!e.isDirectory() && !e.isSymbolicLink()) continue;
      safe(root, `${dir}/${e.name}`);
      if (!/^\d{3,}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(e.name)) throw new Error(`Tema inválido: ${e.name}`);
      const id = Number(e.name.split('-')[0]);
      if (ids.has(id)) throw new Error(`ID duplicado na fila de temas: ${id}`);
      ids.add(id); result.push({ key: e.name, state, path: `${dir}/${e.name}` });
    }
  }
  return result.sort((a, b) => Number(b.state === states[1]) - Number(a.state === states[1]) || Number(a.key.split('-')[0]) - Number(b.key.split('-')[0]));
}
export function find(root: string, key: string) {
  const task = list(root).find((t) => t.key === key);
  if (!task) throw new Error(`Tema não encontrado: ${key}`);
  return task;
}
export function create(root: string, theme: string, seconds = 20) {
  if (!theme?.trim() || /[\r\n]/.test(theme) || theme.length > 300 || !Number.isFinite(seconds) || seconds < 5 || seconds > 120)
    throw new Error('Informe tema em uma linha e duração estimada entre 5 e 120s');
  const slug = theme.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 70).replace(/-$/, '');
  if (!slug) throw new Error('Tema precisa conter letras ou números');
  const tasks = list(root), used = editorial(root)?.used ?? [];
  const next = Math.max(0, ...[...tasks.map((t) => t.key), ...used.map((t) => t.id)].map((id) => Number(id.split('-')[0]))) + 1;
  const key = `${String(next).padStart(3, '0')}-${slug}`, path = `${queueRoot}/${states[0]}/${key}`;
  mkdirSync(safe(root, `${queueRoot}/${states[0]}`), { recursive: true });
  mkdirSync(safe(root, path));
  writeFileSync(safe(root, `${path}/roteiro.md`), `# ${theme.trim()}\n\nDuração estimada: ${seconds}s.\n\n## Narração\n\n## Cenas\n`, { flag: 'wx' });
  return { task: key, roteiro: `${path}/roteiro.md`, status: 'agente deve escrever narração e cenas' };
}
export const work = (root: string, task: Task) => readJson(safe(root, `${task.path}/.work.json`)) as Work;
export const saveWork = (root: string, task: Task, value: Work) => atomic(safe(root, `${task.path}/.work.json`), value);
type Movement = { from: string; to: string; key: string; id: string; state: State; done?: boolean };
export function recover(root: string) {
  const folder = 'logs/cenas-moves';
  if (!existsSync(safe(root, folder))) return;
  for (const name of readdirSync(safe(root, folder)).filter((s) => s.endsWith('.json'))) {
    const file = safe(root, `${folder}/${name}`), j = readJson(file) as Movement;
    if (j.done) { unlinkSync(file); continue; }
    if (!states.includes(j.state) || !/^\d{3,}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(j.key) ||
      !states.some((s) => j.from === `${queueRoot}/${s}/${j.key}`) ||
      j.from === j.to || j.to !== `${queueRoot}/${j.state}/${j.key}`)
      throw new Error('Movimento fora da fila de temas');
    const from = safe(root, j.from), to = safe(root, j.to);
    if (existsSync(from) && existsSync(to)) throw new Error(`Destino ocupado: ${j.to}`);
    if (existsSync(from)) {
      const w = readJson(safe(root, `${j.from}/.work.json`)) as Work;
      if (w.id !== j.id || w.key !== j.key) throw new Error('Movimento de outro tema');
      renameSync(from, to);
    }
    if (!existsSync(to) || (readJson(safe(root, `${j.to}/.work.json`)) as Work).id !== j.id)
      throw new Error('Movimento incompleto; controle preservado');
    atomic(file, { ...j, done: true }); unlinkSync(file);
  }
}
export function move(root: string, task: Task, state: State): Task {
  const to = `${queueRoot}/${state}/${task.key}`;
  if (existsSync(safe(root, to))) throw new Error(`Destino ocupado: ${to}`);
  mkdirSync(safe(root, `${queueRoot}/${state}`), { recursive: true });
  const w = work(root, task);
  atomic(safe(root, `logs/cenas-moves/${randomUUID()}.json`), { from: task.path, to, key: task.key, id: w.id, state });
  recover(root); return { ...task, state, path: to };
}
export function script(root: string, task: Task) {
  const file = safe(root, `${task.path}/roteiro.md`);
  if (!existsSync(file) || !statSync(file).isFile()) throw new Error(`Falta ${task.key}/roteiro.md`);
  const text = readFileSync(file, 'utf8').replace(/^\uFEFF/, '').trim();
  if (!text) throw new Error(`Roteiro vazio: ${task.key}`);
  return text;
}
export function narration(text: string) {
  const section = text.match(/^##\s+(?:narra[çc][ãa]o|fala[^\r\n]*)\s*\r?\n([\s\S]*?)(?=^##\s|$(?![\s\S]))/im);
  if (!section) throw new Error('Roteiro precisa de uma seção ## Narração com somente a fala');
  const result = section[1].trim().replace(/^["“]|["”]$/g, '').replace(/\s+/g, ' ').trim();
  if (!result) throw new Error('Narração vazia no roteiro');
  return result;
}
export function reserve(root: string, task: Task) {
  if (task.state !== states[0]) return task;
  script(root, task);
  if (!existsSync(safe(root, `${task.path}/.work.json`))) saveWork(root, task, { id: randomUUID(), key: task.key });
  return move(root, task, states[1]);
}
