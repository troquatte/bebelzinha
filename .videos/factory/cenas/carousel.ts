import { existsSync, mkdirSync, readFileSync, renameSync, statSync } from 'node:fs';
import { digest, fileHash, readJson, safe } from '../storage.ts';
import { queueRoot } from './contracts.ts';
import type { Task } from './contracts.ts';

export const isCarousel = (root: string, task: Task) => existsSync(safe(root, `${task.path}/carrossel.json`));
export function carouselPackage(root: string, task: Task) {
  const manifest = readJson(safe(root, `${task.path}/carrossel.json`)) as { schemaVersion: number; type: string; slides: string[]; caption: string };
  if (manifest.schemaVersion !== 1 || manifest.type !== 'carousel' || manifest.caption !== 'legenda.md' ||
    !Array.isArray(manifest.slides) || manifest.slides.length < 2 || new Set(manifest.slides).size !== manifest.slides.length) throw new Error('Carrossel exige manifesto, legenda e pelo menos duas imagens distintas em ordem');
  const slides = manifest.slides.map(file => {
    if (typeof file !== 'string' || !/^slides\/[a-zA-Z0-9_-]+\.(png|jpg|jpeg)$/.test(file)) throw new Error('Imagem do carrossel precisa estar em slides/ e ser PNG/JPG');
    const path = safe(root, `${task.path}/${file}`);
    if (!existsSync(path) || !statSync(path).isFile() || statSync(path).size === 0) throw new Error(`Slide ausente ou vazio: ${file}`);
    const bytes = readFileSync(path);
    const valid = file.endsWith('.png') ? bytes.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) : bytes[0] === 255 && bytes[1] === 216;
    if (!valid) throw new Error(`Formato da imagem inválido: ${file}`);
    return { file, hash: fileHash(path) };
  });
  const captionPath = safe(root, `${task.path}/legenda.md`);
  if (!existsSync(captionPath) || !readFileSync(captionPath, 'utf8').trim()) throw new Error('Carrossel exige legenda.md preenchida');
  const content = { slides, caption: { file: 'legenda.md', hash: fileHash(captionPath) } };
  return { ...content, hash: digest(JSON.stringify(content)) };
}
export function finishCarousel(root: string, task: Task) {
  if (!['001-afazer', '002-desenvolvendo', '003-gerados'].includes(task.state)) throw new Error('Carrossel aprovado/postado não pode ser alterado pela preparação');
  const media = carouselPackage(root, task);
  if (!existsSync(safe(root, `${task.path}/roteiro.md`)) || !readFileSync(safe(root, `${task.path}/roteiro.md`), 'utf8').trim()) throw new Error('Falta roteiro do carrossel');
  if (task.state === '003-gerados') return { task: task.key, state: task.state, approval: null, slides: media.slides.map(s => `${task.path}/${s.file}`) };
  const path = `${queueRoot}/003-gerados/${task.key}`;
  if (existsSync(safe(root, path))) throw new Error('Destino ocupado; não sobrescrito');
  mkdirSync(safe(root, `${queueRoot}/003-gerados`), { recursive: true });
  renameSync(safe(root, task.path), safe(root, path));
  return { task: task.key, state: '003-gerados', approval: null, slides: media.slides.map(s => `${path}/${s.file}`) };
}
