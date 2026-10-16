import { existsSync, statSync } from 'node:fs';
import { atomic, digest, engineRoot, fileHash, readJson, safe } from '../storage.ts';
import { pcm, probe } from '../media.ts';
import { narration, reserve, saveWork, script, work } from './queue.ts';
import { isCarousel } from './carousel.ts';
import type { AssetInfo, Plan, Scene, Task, ThemeProps } from './contracts.ts';
import { background } from './assets.ts';

export function readPlan(root: string, task: Task, resolveBackgrounds = true): Plan {
  const plan = readJson(safe(root, `${task.path}/montagem.json`)) as Plan;
  if (!Array.isArray(plan.scenes)) throw new Error('Montagem precisa de scenes');
  return resolveBackgrounds ? { ...plan, scenes: plan.scenes.map((s) => ({ ...s, background: background(root, s.background) })) } : plan;
}
export function bank(root: string, path: string): string {
  if (typeof path !== 'string' || !/^assets\/(cenario|personagem|itens|fontes|logos|sons)\//.test(path))
    throw new Error(`Mídia deve referenciar um banco: ${path}`);
  const file = safe(root, path);
  if (!existsSync(file) || !statSync(file).isFile()) throw new Error(`Mídia ausente: ${path}`);
  return file;
}
export function assets(plan: Plan) {
  const paths = new Set<string>([plan.font]);
  const sound = itemSoundConfig();
  if (sound && plan.scenes.some(s=>s.items.length)) paths.add(sound.asset);
  for (const scene of plan.scenes) {
    paths.add(scene.background.asset);
    if (scene.follow) paths.add(scene.follow.avatar);
    for (const pose of scene.character?.poses ?? []) paths.add(pose.asset);
    for (const item of scene.items) paths.add(item.asset);
    if (scene.engagement) paths.add(scene.engagement.sound);
  }
  return [...paths].sort();
}
function itemSoundConfig(): {asset:string;volume:number}|undefined {
  const sound=(readJson(safe(engineRoot,'brand/miolo.json')) as {itemEntranceSound?:{asset:string;volume:number}}).itemEntranceSound;
  if (sound && (!/^assets\/sons\/.+\.(wav|mp3)$/.test(sound.asset) || !Number.isFinite(sound.volume) || sound.volume<0 || sound.volume>1))
    throw new Error('Som de entrada de item inválido');
  return sound;
}
export function validatePlan(plan: Plan, audioSeconds: number) {
  if (plan.schemaVersion !== 1 || !plan.narration?.trim() || plan.audio !== 'audio.mp3' ||
    !Number.isFinite(audioSeconds) || audioSeconds <= 0 || !Number.isFinite(plan.holdSeconds) ||
    plan.holdSeconds < 0 || plan.holdSeconds > 1.2 || !Array.isArray(plan.scenes) || !plan.scenes.length)
    throw new Error('Montagem incompleta: áudio, narração, sustentação ou cenas inválidos');
  const ids = new Set<string>(); let previous = 0;
  const number = (n: number) => Number.isFinite(n);
  const rect = (r: { x: number; y: number; width: number; height: number }) =>
    [r.x, r.y, r.width, r.height].every(number) && r.width > 0 && r.height > 0;
  for (const s of plan.scenes) {
    if (!/^[a-zA-Z0-9-]+$/.test(s.id) || ids.has(s.id) || ![s.from, s.to].every(number) ||
      Math.abs(s.from - previous) > 0.001 || s.to <= s.from || Math.round(s.to * 30) <= Math.round(s.from * 30) ||
      !['video', 'image'].includes(s.background?.type) || !Array.isArray(s.items) || !Array.isArray(s.titles) ||
      (s.background.timing !== undefined && !['global', 'scene'].includes(s.background.timing)) ||
      (s.transition !== undefined && !['cut', 'fade'].includes(s.transition)))
      throw new Error(`Cena inválida ou timeline com lacuna/sobreposição: ${s.id}`);
    ids.add(s.id); previous = s.to;
    if (s.objectFocus !== undefined && typeof s.objectFocus !== 'boolean') throw new Error(`Foco de objetos inválido: ${s.id}`);
    if (s.cooking && (!['preview','saute','garlic','tomato','wells','add-eggs','cook','lid','serve'].includes(s.cooking.stage) ||
      (s.cooking.table !== undefined && typeof s.cooking.table !== 'boolean'))) throw new Error(`Etapa culinária inválida: ${s.id}`);
    if (s.preparation && !['rice','eggs','sauce','ready','egg-colors'].includes(s.preparation)) throw new Error(`Demonstração inválida: ${s.id}`);
    if (s.checklist && (!s.checklist.heading?.trim() || !Array.isArray(s.checklist.lines) ||
      s.checklist.lines.length < 1 || s.checklist.lines.length > 3 ||
      s.checklist.lines.some(line => typeof line !== 'string' || !line.trim()) ||
      (s.checklist.y !== undefined && (!Number.isFinite(s.checklist.y) || s.checklist.y < 0 || s.checklist.y > 1500)) ||
      (s.checklist.checked !== undefined && typeof s.checklist.checked !== 'boolean'))) throw new Error(`Lista ilustrada inválida: ${s.id}`);
    const inside = (t: number) => number(t) && t >= 0 && t < s.to - s.from;
    if (s.follow && (!inside(s.follow.at) || !inside(s.follow.tapAt) || s.follow.tapAt <= s.follow.at ||
      !/^assets\/(personagem|logos)\/.+\.(png|jpg|jpeg|webp)$/.test(s.follow.avatar) ||
      !/^[a-zA-Z0-9._]{1,30}$/.test(s.follow.handle) ||
      (s.follow.subtitle !== undefined && (!s.follow.subtitle.trim() || s.follow.subtitle.length > 40)) ||
      (s.follow.y !== undefined && (!number(s.follow.y) || s.follow.y < 180 || s.follow.y > 1450))))
      throw new Error(`Cartão de seguir inválido: ${s.id}`);
    if (s.engagement && (![s.engagement.likeAt,s.engagement.commentAt,s.engagement.shareAt].every(inside) ||
      s.engagement.likeAt >= s.engagement.commentAt || s.engagement.commentAt >= s.engagement.shareAt ||
      !/^assets\/sons\/.+\.(wav|mp3)$/.test(s.engagement.sound))) throw new Error(`Fechamento interativo inválido: ${s.id}`);
    if (s.character) {
      const c = s.character;
      if (![c.faceX, c.faceY].every(number) || !c.poses.length || c.poses[0].at !== 0)
        throw new Error(`Personagem incompleta: ${s.id}`);
      c.poses.forEach((p, i) => {
        if (!inside(p.at) || p.width <= 0 || ![p.width, p.anchorX, p.anchorY].every(number) ||
          (i > 0 && p.at <= c.poses[i - 1].at)) throw new Error(`Pose inválida: ${s.id}`);
      });
    }
    const itemIds = new Set<string>();
    for (const i of s.items) {
      if (!i.id || itemIds.has(i.id) || !inside(i.at) || ![i.x, i.ground, i.width].every(number) || i.width <= 0 ||
        (i.entrance !== undefined && (!number(i.entrance) || i.entrance <= 0)) ||
        (i.entranceOffset !== undefined && (!number(i.entranceOffset) || i.entranceOffset < 0 || i.entranceOffset > 60)) ||
        (i.initiallyVisible !== undefined && (typeof i.initiallyVisible !== 'boolean' || (i.initiallyVisible && i.at !== 0))) ||
        (i.until !== undefined && (!number(i.until) || i.until <= i.at || i.until > s.to - s.from + 0.001)) ||
        (i.exit !== undefined && (!number(i.exit) || i.exit <= 0)) ||
        (i.anchorY !== undefined && (!number(i.anchorY) || i.anchorY <= 0 || i.anchorY > 1)) ||
        (i.layer !== undefined && !['front', 'back'].includes(i.layer)) ||
        (i.clip && !rect(i.clip)) || (i.occlusion && !rect(i.occlusion))) throw new Error(`Item inválido: ${s.id}/${i.id}`);
      if (i.zoom && (!Number.isFinite(i.zoom.to) || i.zoom.to < 1 || i.zoom.to > 1.15 ||
        !Number.isFinite(i.zoom.seconds) || i.zoom.seconds <= 0)) throw new Error(`Zoom de item inválido: ${s.id}/${i.id}`);
      itemIds.add(i.id);
    }
    s.titles.forEach((t, i) => {
      if ((t.style !== undefined && t.style !== 'speech') || !inside(t.at) || !Array.isArray(t.lines) || !t.lines.length || t.lines.length > 2 ||
        t.lines.some((l) => typeof l !== 'string' || !l.trim()) ||
        (i > 0 && t.at <= s.titles[i - 1].at) ||
        [t.x ?? 90, t.y ?? 140, t.fontSize ?? 100].some((n) => !number(n)) || (t.fontSize ?? 100) <= 0)
        throw new Error(`Título inválido: ${s.id}`);
    });
  }
  if (Math.abs(previous - audioSeconds) > 0.04) throw new Error('Fim das cenas deve coincidir com a duração real do áudio');
}
export function fingerprint(root: string, task: Task) {
  const values: unknown[] = [];
  for (const name of ['roteiro.md', 'audio.mp3', 'montagem.json']) {
    const file = safe(root, `${task.path}/${name}`);
    values.push(existsSync(file) ? fileHash(file) : `missing:${name}`);
  }
  const file = safe(root, `${task.path}/montagem.json`);
  if (existsSync(file)) {
    try { for (const p of assets(readPlan(root, task))) {
      try { values.push([p, fileHash(bank(root, p))]); }
      catch { values.push([p, 'missing']); }
    } }
    catch { /* A validação apresenta a pendência exata, sem repetir falhas inalteradas. */ }
  }
  return digest(JSON.stringify(values));
}
export function prepare(root: string, candidate: Task) {
  if (isCarousel(root, candidate)) throw new Error('Carrossel não usa render de vídeo; use cenas:carousel-ready');
  if (candidate.state !== '001-afazer' && candidate.state !== '002-desenvolvendo') throw new Error('Tema concluído; crie outro ID para uma nova produção');
  const text = narration(script(root, candidate));
  const task = reserve(root, candidate), file = safe(root, `${task.path}/montagem.json`);
  if (!existsSync(file)) atomic(file, { schemaVersion: 1, narration: text, audio: 'audio.mp3',
    font: 'assets/fontes/roboto.ttf', holdSeconds: 0.6, scenes: [] } satisfies Plan);
  const plan = readPlan(root, task);
  if (plan.narration !== text) throw new Error('Narração da montagem diverge do roteiro; atualizar montagem sem reescrever a fala');
  const pending: string[] = [];
  if (!existsSync(safe(root, `${task.path}/audio.mp3`))) pending.push(`Falta ${task.key}/audio.mp3; áudio fornecido ou ElevenLabs na etapa de voz`);
  if (!plan.scenes.length) pending.push('Montagem das cenas pendente; agente deve planejar as camadas usando os bancos');
  const w = work(root, task); w.pending = pending.join('; ') || undefined; saveWork(root, task, w);
  return { task, plan, pending };
}
export function compile(root: string, task: Task) {
  const plan = readPlan(root, task);
  if (plan.narration !== narration(script(root, task))) throw new Error('Montagem e roteiro divergentes');
  const audioFile = safe(root, `${task.path}/audio.mp3`);
  if (!existsSync(audioFile)) throw new Error(`Falta ${task.key}/audio.mp3`);
  const sourceSeconds = pcm(audioFile).length / 16000;
  if (plan.audioTrimEndSeconds !== undefined && (!Number.isFinite(plan.audioTrimEndSeconds) ||
    plan.audioTrimEndSeconds <= 0 || plan.audioTrimEndSeconds > sourceSeconds)) throw new Error('Fim do áudio inválido');
  const audioSeconds = plan.audioTrimEndSeconds ?? sourceSeconds;
  validatePlan(plan, audioSeconds);
  const hashes: Record<string, string> = { 'audio.mp3': fileHash(audioFile), 'roteiro.md': fileHash(safe(root, `${task.path}/roteiro.md`)) };
  const media: Record<string, AssetInfo> = {};
  for (const path of assets(plan)) {
    const file = bank(root, path); hashes[path] = fileHash(file);
    if (path === plan.font) continue;
    const p = probe(file), stream = p.streams.find((s) => s.codec_type === 'video');
    if (path.startsWith('assets/sons/')) {
      if (!p.streams.some(s=>s.codec_type==='audio')) throw new Error(`Efeito sonoro inválido: ${path}`);
      continue;
    }
    if (!stream?.width || !stream.height) throw new Error(`Mídia visual inválida: ${path}`);
    media[path] = { width: stream.width, height: stream.height,
      seconds: stream.codec_name === 'png' || stream.codec_name === 'mjpeg' ? undefined : Number(stream.duration ?? p.format.duration) };
  }
  const frames = Math.ceil((audioSeconds + plan.holdSeconds) * 30);
  const scenes = plan.scenes.map((s: Scene, i) => {
    for (const p of [...(s.character?.poses ?? []), ...s.items]) {
      if (media[p.asset].seconds !== undefined) throw new Error(`Camada deve ser imagem estática: ${p.asset}`);
    }
    const seconds = media[s.background.asset].seconds;
    if (s.background.type === 'video' && (!Number.isFinite(seconds) || seconds! <= 0)) throw new Error(`Fundo não é um vídeo válido: ${s.id}`);
    if (s.background.type === 'image' && seconds !== undefined) throw new Error(`Fundo não é imagem estática: ${s.id}`);
    return { ...s, fromFrame: Math.round(s.from * 30),
      durationInFrames: (i === plan.scenes.length - 1 ? frames : Math.round(s.to * 30)) - Math.round(s.from * 30),
      backgroundRate: backgroundRate(s, seconds, frames / 30) };
  });
  const editable = { ...plan }; delete editable.output;
  const signature = digest(JSON.stringify({ plan: editable, hashes, frames }));
  const props: ThemeProps = { scenes, audio: 'audio.mp3', font: plan.font, durationInFrames: frames, media,
    ...(plan.scenes.some(s=>s.items.length) ? {itemSound:itemSoundConfig()} : {}),
    ...(plan.audioTrimEndSeconds === undefined ? {} : { audioEndAt: Math.ceil(plan.audioTrimEndSeconds * 30) }) };
  return { plan, props, hashes, signature, audioSeconds };
}
export function backgroundRate(scene: Scene, videoSeconds: number | undefined, themeSeconds: number) {
  return scene.background.type === 'video' ? Math.min(1, videoSeconds! /
    (scene.background.timing === 'scene' ? scene.to - scene.from : themeSeconds)) : 1;
}
