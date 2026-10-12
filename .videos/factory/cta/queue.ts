import { existsSync, mkdirSync, readdirSync, renameSync, statSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { atomic, fileHash, now, readJson, safe } from '../storage.ts';
import { inputSignature, kinds, queueRoot, sources, states } from './contracts.ts';
import type { Hashes, Manifest, State, Task } from './contracts.ts';

export function list(root: string): Task[] {
  const tasks: Task[] = [], ids = new Set<string>();
  for (const state of states) for (const kind of kinds) {
    const folder = `${queueRoot}/${state}/${kind}`;
    if (!existsSync(safe(root, folder))) continue;
    for (const entry of readdirSync(safe(root, folder), { withFileTypes: true })) {
      if (!entry.isDirectory() && !entry.isSymbolicLink()) continue;
      safe(root, `${folder}/${entry.name}`);
      if (!/^\d{3,}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.name))
        throw new Error(`Tema inválido: ${folder}/${entry.name}`);
      const key = `${kind}/${entry.name}`;
      const id = `${kind}/${Number(entry.name.split('-')[0])}`;
      if (ids.has(id)) throw new Error(`ID duplicado na fila: ${id}`);
      ids.add(id);
      tasks.push({ key, kind, name: entry.name, state, path: `${folder}/${entry.name}` });
    }
  }
  return tasks.sort((a, b) => Number(b.state === '002-desenvolvendo') - Number(a.state === '002-desenvolvendo') ||
    Number(a.name.split('-')[0]) - Number(b.name.split('-')[0]) || a.kind.localeCompare(b.kind));
}
export function find(root: string, key: string): Task {
  const task = list(root).find((t) => t.key === key);
  if (!task) throw new Error(`Tarefa não encontrada: ${key}`);
  return task;
}
export function readManifest(root: string, task: Task): Manifest {
  const m = readJson(safe(root, `${task.path}/manifest.json`)) as Manifest;
  if (m.schemaVersion !== 1 || typeof m.taskId !== 'string' || !m.taskId || m.key !== task.key ||
      !states.includes(m.stage) || !['prepared', 'blocked', 'rendered', 'generated'].includes(m.status) ||
      !Array.isArray(m.history) || m.approval !== null) throw new Error(`Manifest inválido ou aprovado: ${task.key}`);
  return m;
}
export function saveManifest(root: string, task: Task, m: Manifest, event?: string) {
  m.updatedAt = now();
  if (event) m.history.push({ at: m.updatedAt, event });
  atomic(safe(root, `${task.path}/manifest.json`), m);
}
export function hashes(root: string, task: Task, stable = false): Hashes {
  const values = {} as Hashes;
  for (const role of Object.keys(sources) as (keyof Hashes)[]) {
    const file = safe(root, `${task.path}/${sources[role]}`);
    if (!existsSync(file)) throw new Error(`Falta ${task.key}/${sources[role]}`);
    const before = statSync(file);
    if (!before.isFile() || before.size === 0) throw new Error(`Entrada vazia/inválida: ${sources[role]}`);
    if (stable && Date.now() - before.mtimeMs < 2000) throw new Error(`Arquivo ainda recente/em cópia: ${sources[role]}`);
    values[role] = fileHash(file);
    const after = statSync(file);
    if (before.size !== after.size || before.mtimeMs !== after.mtimeMs) throw new Error('Entrada mudou durante leitura');
  }
  return values;
}
type Movement = { from: string; to: string; taskId: string; state: State; done: boolean };
export function recover(root: string): string[] {
  const dir = safe(root, 'logs/cta-journal');
  if (!existsSync(dir)) return [];
  const result: string[] = [];
  for (const name of readdirSync(dir).filter((n) => n.endsWith('.json'))) {
    const file = safe(root, `logs/cta-journal/${name}`), j = readJson(file) as Movement;
    if (j.done) continue;
    const from = safe(root, j.from), to = safe(root, j.to);
    if (!j.from.startsWith(`${queueRoot}/`) || !j.to.startsWith(`${queueRoot}/`)) throw new Error('Journal fora da fila');
    if (existsSync(from) && existsSync(to)) throw new Error(`Colisão ao recuperar ${j.to}`);
    if (existsSync(from)) {
      const m = readJson(safe(root, `${j.from}/manifest.json`)) as Manifest;
      if (m.taskId !== j.taskId) throw new Error('Journal não corresponde à tarefa');
      renameSync(from, to);
    }
    if (!existsSync(to)) throw new Error(`Journal sem origem/destino: ${name}`);
    const m = readJson(safe(root, `${j.to}/manifest.json`)) as Manifest;
    if (m.taskId !== j.taskId) throw new Error('Destino pertence a outra tarefa');
    m.stage = j.state; m.updatedAt = now();
    m.history.push({ at: m.updatedAt, event: `Movimento recuperado: ${j.state}` });
    atomic(safe(root, `${j.to}/manifest.json`), m);
    atomic(file, { ...j, done: true }); result.push(j.to);
  }
  return result;
}
export function move(root: string, task: Task, state: State): Task {
  const to = `${queueRoot}/${state}/${task.kind}/${task.name}`;
  if (existsSync(safe(root, to))) throw new Error(`Destino já existe: ${to}`);
  mkdirSync(safe(root, `${queueRoot}/${state}/${task.kind}`), { recursive: true });
  const m = readManifest(root, task);
  const journal = safe(root, `logs/cta-journal/${randomUUID()}.json`);
  atomic(journal, { from: task.path, to, taskId: m.taskId, state, done: false });
  recover(root);
  return { ...task, path: to, state };
}
export function reserve(root: string, task: Task): Task {
  if (task.state !== '001-afazer') return task;
  const signature = inputSignature(hashes(root, task, true));
  const file = safe(root, `${task.path}/manifest.json`);
  if (!existsSync(file)) {
    const m: Manifest = { schemaVersion: 1, taskId: randomUUID(), key: task.key,
      stage: task.state, status: 'prepared', createdAt: now(), updatedAt: now(),
      inputSignature: signature, approval: null, history: [] };
    atomic(file, m);
  }
  return move(root, task, '002-desenvolvendo');
}
