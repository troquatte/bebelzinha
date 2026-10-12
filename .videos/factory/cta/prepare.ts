import { existsSync } from 'node:fs';
import { artInfo, pcm, probe } from '../media.ts';
import { atomic, engineRoot, readJson, safe } from '../storage.ts';
import { hashes, readManifest, reserve, saveManifest } from './queue.ts';
import { inputSignature, sources, templateId, timing } from './contracts.ts';
import type { Config, Task, Template } from './contracts.ts';

export function prepare(root: string, candidate: Task): { task: Task; config: Config } {
  if (candidate.state === '003-gerados') throw new Error('Tarefa concluída: crie outra tarefa para nova edição');
  // Verifica integridade antes de reservar, além da estabilidade dos arquivos.
  const currentHashes = hashes(root, candidate, true);
  const signature = inputSignature(currentHashes);
  const configPath = `${candidate.path}/config.json`;
  if (candidate.state === '002-desenvolvendo' && existsSync(safe(root, configPath))) {
    const saved = readJson(safe(root, configPath)) as Config;
    if (saved.inputSignature === signature) return { task: candidate, config: saved };
  }
  const audio = safe(root, `${candidate.path}/${sources.narration}`);
  const video = safe(root, `${candidate.path}/${sources.video}`);
  if (probe(audio).streams.filter((s) => s.codec_type === 'audio').length !== 1)
    throw new Error('Narração deve conter um stream de áudio');
  const audioSeconds = pcm(audio).length / 16000;
  const videoProbe = probe(video);
  const stream = videoProbe.streams.find((s) => s.codec_type === 'video');
  const videoSeconds = Number(stream?.duration ?? videoProbe.format.duration);
  if (!stream?.width || !stream.height) throw new Error('Vídeo sem resolução verificável');
  const art = artInfo(safe(root, `${candidate.path}/${sources.cta}`));
  const t = readJson(safe(engineRoot, `brand/${templateId(candidate.kind)}.json`)) as Template;
  if (t.id !== templateId(candidate.kind) || t.schemaVersion !== 1) throw new Error('Modelo inválido');
  if (inputSignature(hashes(root, candidate, true)) !== signature) throw new Error('Entradas mudaram durante preparação');
  const task = reserve(root, candidate), m = readManifest(root, task);
  const config: Config = { schemaVersion: 1, taskId: m.taskId, templateId: t.id,
    composition: t.composition, sources, hashes: currentHashes, inputSignature: signature,
    media: { audioSeconds, videoSeconds, videoWidth: stream.width, videoHeight: stream.height, ...art },
    timing: { ...t.timing, ctaStartSeconds: null }, layout: { ...t.layout },
    render: timing(audioSeconds, videoSeconds), inspection: null };
  if (existsSync(safe(root, `${task.path}/config.json`)))
    atomic(safe(root, `${task.path}/versions/config-${m.inputSignature}.json`), readJson(safe(root, `${task.path}/config.json`)));
  atomic(safe(root, `${task.path}/config.json`), config);
  m.inputSignature = signature; m.status = 'prepared'; m.pending = 'Inspeção das mídias e timing pendentes';
  saveManifest(root, task, m, 'Entradas medidas; inspeção pendente');
  return { task, config };
}
