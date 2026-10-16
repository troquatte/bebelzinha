import { existsSync, mkdirSync, renameSync, statSync } from 'node:fs';
import { atomic, fileHash, now, readJson, safe } from '../storage.ts';
import { queueRoot } from './contracts.ts';
import type { State, Task } from './contracts.ts';
import { carouselPackage, isCarousel } from './carousel.ts';

type Format = 'vertical' | 'horizontal' | 'carousel';
type Target = 'instagram-reels' | 'youtube-shorts' | 'youtube-horizontal' | 'instagram-carousel';
type Receipt = {
  target: Target; integrationId: string; postId: string;
  status: 'scheduled' | 'published' | 'failed';
  scheduledAt: string; checkedAt: string; publishedAt?: string; url?: string;
};
type Publication = {
  schemaVersion: 1; task: string; approvedAt: string; approvedBy: 'user';
  format: Format; file: string; hash: string; targets: Target[]; receipts: Receipt[];
  carousel?: ReturnType<typeof carouselPackage>;
  supersedes?: { file: string; hash: string; approvedAt: string };
};

function output(root: string, task: Task, file: string) {
  if (!/^output\/convertido-\d{4,}\.mp4$/.test(file)) throw new Error('Informe o MP4 final relativo: output/convertido-NNNN.mp4');
  const path = safe(root, `${task.path}/${file}`);
  if (!existsSync(path) || !statSync(path).isFile() || statSync(path).size === 0) throw new Error('MP4 final ausente ou vazio');
  return fileHash(path);
}
function load(root: string, task: Task, checkFiles = true): Publication {
  const record = readJson(safe(root, `${task.path}/publicacao.json`)) as Publication;
  const targets = destinations(record.format);
  if (record.schemaVersion !== 1 || record.task !== task.key || record.approvedBy !== 'user' ||
    !['vertical', 'horizontal', 'carousel'].includes(record.format) || JSON.stringify(record.targets) !== JSON.stringify(targets) ||
    !Array.isArray(record.receipts)) throw new Error('Aprovação ausente ou inválida; não enviar');
  if (!checkFiles) return record;
  if (record.format === 'carousel') {
    const media = carouselPackage(root, task);
    if (media.hash !== record.hash || JSON.stringify(media) !== JSON.stringify(record.carousel) || record.file !== media.slides[0].file) throw new Error('Carrossel, ordem ou legenda alterados após aprovação; não enviar');
  } else if (output(root, task, record.file) !== record.hash) throw new Error('MP4 alterado após aprovação; não enviar');
  return record;
}
function destinations(format: Format): Target[] {
  return format === 'vertical' ? ['instagram-reels', 'youtube-shorts'] : format === 'carousel' ? ['instagram-carousel'] : ['youtube-horizontal'];
}
// O registro é escrito antes do rename atômico. Repetir a operação recupera uma interrupção.
function relocate(root: string, task: Task, state: State): Task {
  if (task.state === state) return task;
  const path = `${queueRoot}/${state}/${task.key}`;
  if (existsSync(safe(root, path))) throw new Error('Destino ocupado; não sobrescrito');
  mkdirSync(safe(root, `${queueRoot}/${state}`), { recursive: true });
  renameSync(safe(root, task.path), safe(root, path));
  return { ...task, state, path };
}
export function approve(root: string, task: Task, file: string, format: string) {
  if (!['003-gerados', '004-aprovados'].includes(task.state)) throw new Error('Aprovação exige vídeo gerado ou já aprovado');
  if (format !== 'vertical' && format !== 'horizontal' && format !== 'carousel') throw new Error('--format vertical, horizontal ou carousel obrigatório');
  if (isCarousel(root, task) && format !== 'carousel') throw new Error('Carrossel não pode ser aprovado como MP4');
  const carousel = format === 'carousel' ? carouselPackage(root, task) : undefined;
  if (carousel) file = carousel.slides[0].file;
  const hash = carousel?.hash ?? output(root, task, file), path = safe(root, `${task.path}/publicacao.json`);
  let old: Publication | undefined;
  if (existsSync(path)) {
    old = load(root, task, false);
    if ((old.hash !== hash || old.file !== file || old.format !== format) && old.receipts.length) throw new Error('Versão já enviada ao Postiz; resolver os agendamentos anteriores antes de aprovar outra versão');
  }
  if (!old || old.hash !== hash || old.file !== file || old.format !== format) {
    const record: Publication = {
      schemaVersion: 1, task: task.key, approvedAt: now(), approvedBy: 'user',
      format, file, hash,
      targets: destinations(format), receipts: [], ...(carousel ? { carousel } : {}),
      ...(old ? { supersedes: { file: old.file, hash: old.hash, approvedAt: old.approvedAt } } : {}),
    };
    atomic(path, record);
  }
  const moved = relocate(root, task, '004-aprovados');
  return { task: moved.key, state: moved.state, output: `${moved.path}/${file}`, ...(carousel ? { slides: carousel.slides.map(s => `${moved.path}/${s.file}`), caption: `${moved.path}/legenda.md` } : {}), scheduling: 'pending' };
}
function timestamp(value: unknown): value is string {
  return typeof value === 'string' && /(?:Z|[+-]\d\d:\d\d)$/.test(value) && Number.isFinite(Date.parse(value));
}
export function recordPublication(root: string, task: Task, input: unknown) {
  if (task.state !== '004-aprovados' && task.state !== '005-postados') throw new Error('Publicação exige aprovação explícita anterior');
  const record = load(root, task), receipt = input as Receipt;
  if (!receipt || !record.targets.includes(receipt.target) || typeof receipt.integrationId !== 'string' || !receipt.integrationId.trim() || typeof receipt.postId !== 'string' || !receipt.postId.trim() ||
    !['scheduled', 'published', 'failed'].includes(receipt.status) || !timestamp(receipt.scheduledAt) || !timestamp(receipt.checkedAt) ||
    (receipt.publishedAt !== undefined && (!timestamp(receipt.publishedAt) || Date.parse(receipt.publishedAt) > Date.parse(receipt.checkedAt) || Date.parse(receipt.publishedAt) < Date.parse(receipt.scheduledAt))) ||
    Date.parse(receipt.checkedAt) > Date.now() + 60_000 ||
    (receipt.url !== undefined && !/^https:\/\//.test(receipt.url))) throw new Error('Comprovante Postiz incompleto; não inferir publicação pelo relógio');
  const previous = record.receipts.find(r => r.target === receipt.target);
  if (previous && (previous.postId !== receipt.postId || previous.integrationId !== receipt.integrationId)) throw new Error('Destino já vinculado; conferir no Postiz antes de criar outra postagem');
  if (previous && (Date.parse(previous.checkedAt) > Date.parse(receipt.checkedAt) || (previous.status === 'published' && receipt.status !== 'published'))) throw new Error('Comprovante desatualizado; estado confirmado preservado');
  // Mesmo horário real para Reels e Shorts; não comparar texto de fusos diferentes.
  if (record.format === 'vertical' && record.receipts.some(r => r.target !== receipt.target && Date.parse(r.scheduledAt) !== Date.parse(receipt.scheduledAt))) throw new Error('Reels e Shorts precisam ter o mesmo horário');
  const clean: Receipt = {
    target: receipt.target, integrationId: receipt.integrationId, postId: receipt.postId,
    status: receipt.status, scheduledAt: receipt.scheduledAt, checkedAt: receipt.checkedAt,
    ...(receipt.publishedAt ? { publishedAt: receipt.publishedAt } : {}), ...(receipt.url ? { url: receipt.url } : {}),
  };
  record.receipts = [...record.receipts.filter(r => r.target !== receipt.target), clean];
  atomic(safe(root, `${task.path}/publicacao.json`), record);
  const complete = record.targets.every(target => record.receipts.some(r => r.target === target && r.status === 'published'));
  const moved = complete ? relocate(root, task, '005-postados') : task;
  return { task: moved.key, state: moved.state, receipts: record.receipts, complete };
}
