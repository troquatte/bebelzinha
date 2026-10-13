import { existsSync, renameSync, writeFileSync } from 'node:fs';
import { atomic, engineRoot, fileHash, readJson, safe } from '../storage.ts';
import { probe } from '../media.ts';
import { prepare, readPlan } from '../cenas/prepare.ts';
import { saveWork, work } from '../cenas/queue.ts';
import type { Task } from '../cenas/contracts.ts';
import { speechFingerprint, synthesize, voiceStatus } from './elevenlabs.ts';
import type { VoiceConfig } from './elevenlabs.ts';

export const config = () => readJson(safe(engineRoot, 'brand/narracao.json')) as VoiceConfig;
export async function audio(root: string, candidate: Task, generate = false, retryRequest = false) {
  const { task } = prepare(root, candidate), plan = readPlan(root, task), settings = config();
  const file = safe(root, `${task.path}/audio.mp3`), w = work(root, task);
  if (existsSync(file)) return { task: task.key, audio: `${task.path}/audio.mp3`, status: 'preservado' };
  const status = voiceStatus(settings);
  if (!generate) return { task: task.key, ...status, characters: plan.narration.length, status: 'sem chamada à API' };
  if (w.speechRequest && !retryRequest) throw new Error('Requisição de voz pendente/incerta; conferir ElevenLabs antes de --retry-request');
  if (settings.provider !== 'elevenlabs' || !status.keyConfigured || !status.voiceConfigured)
    throw new Error('ElevenLabs não configurado: provider, ELEVENLABS_API_KEY e ELEVENLABS_VOICE_ID necessários');
  const voice = process.env.ELEVENLABS_VOICE_ID || settings.voiceId!;
  const requestHash = speechFingerprint(plan.narration, settings, voice);
  const temporary = safe(root, `${task.path}/.narracao.tmp.mp3`);
  if (existsSync(temporary)) throw new Error('Áudio temporário existe; recuperar antes de pedir outra geração');
  w.speechRequest = { fingerprint: requestHash, status: 'requesting' };
  saveWork(root, task, w);
  try {
    const result = await synthesize(plan.narration, settings);
    if (readPlan(root, task).narration !== plan.narration) throw new Error('Narração mudou durante a requisição');
    writeFileSync(temporary, result.audio, { flag: 'wx' });
    if (!probe(temporary).streams.some((s) => s.codec_type === 'audio')) throw new Error('Áudio gerado não decodifica');
    if (existsSync(file)) throw new Error('Outro áudio apareceu; arquivo original preservado');
    renameSync(temporary, file);
    plan.voice = { provider: 'elevenlabs', fingerprint: result.fingerprint, audioHash: fileHash(file) };
    atomic(safe(root, `${task.path}/montagem.json`), plan);
    delete w.speechRequest; delete w.blocked; delete w.pending; saveWork(root, task, w);
    return { task: task.key, audio: `${task.path}/audio.mp3`, markers: result.markers, status: 'gerado' };
  } catch (error) {
    w.speechRequest = { fingerprint: requestHash, status: 'uncertain' }; saveWork(root, task, w); throw error;
  }
}
