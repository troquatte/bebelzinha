import { existsSync } from 'node:fs';
import { atomic, readJson, safe } from '../storage.ts';

const path = 'brand/temas-utilizados.json';
type Entry = { id: string; theme: string; category: string; summary: string; createdAt: string; round?: number };
export type Editorial = { schemaVersion: 1; editorial: { personality: string; structure: string; avoid: string[]; categoryRound?: number;
  categories: { id: string; description: string; examples: string[] }[] }; used: Entry[] };
export function editorial(root: string): Editorial | undefined {
  if (!existsSync(safe(root, path))) return undefined;
  const data = readJson(safe(root, path)) as Editorial;
  if (data.schemaVersion !== 1 || !Array.isArray(data.used) || !Array.isArray(data.editorial?.categories))
    throw new Error('Banco editorial inválido; arquivo preservado');
  const ids = new Set<string>();
  for (const entry of data.used) {
    if (!/^\d{3,}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id) || ids.has(entry.id) ||
      typeof entry.theme !== 'string' || typeof entry.summary !== 'string') throw new Error('Registro editorial inválido; arquivo preservado');
    ids.add(entry.id);
  }
  return data;
}
const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export function remember(root: string, id: string, theme: string, category: string, summary: string, allowRepeat = false) {
  const data = editorial(root);
  if (!data) throw new Error('Falta brand/temas-utilizados.json');
  if (!/^\d{3,}-[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id) || !theme.trim() || !summary.trim() || summary.length > 400 ||
    !data.editorial.categories.some((c) => c.id === category)) throw new Error('ID, tema, resumo ou categoria editorial inválidos');
  const previous = data.used.find((e) => e.id === id);
  if (previous) {
    if (previous.theme === theme && previous.category === category && previous.summary === summary) return { id, reused: true };
    throw new Error('ID editorial já registrado com outra ideia; não sobrescrito');
  }
  if (!allowRepeat && data.used.some((e) => normalize(e.theme) === normalize(theme)))
    throw new Error('Tema já usado; escolha outra ideia ou autorize --allow-repeat');
  if (!allowRepeat && data.used.some((e) => normalize(e.summary) === normalize(summary)))
    throw new Error('Ideia já usada; escolha outro resumo e conteúdo');
  const round = data.editorial.categoryRound ?? 1;
  if (!Number.isInteger(round) || round < 1) throw new Error('Rodada editorial inválida');
  if (!allowRepeat && data.used.some((e) => e.category === category && (e.round ?? 1) === round))
    throw new Error('Categoria já usada; escolha uma categoria inédita ou autorize --allow-repeat');
  data.used.push({ id, theme: theme.trim(), category, summary: summary.trim(), createdAt: new Date().toISOString(), round });
  atomic(safe(root, path), data); return { id, reused: false };
}
