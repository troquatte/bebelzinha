import { digest } from '../storage.ts';

export type VoiceConfig = { provider: 'provided' | 'elevenlabs'; voiceId: string | null; modelId: string;
  settings: { stability: number; similarity_boost: number; style: number; use_speaker_boost: boolean; speed: number } };
export type WordMarker = { text: string; start: number; end: number };
type Alignment = { characters: string[]; character_start_times_seconds: number[]; character_end_times_seconds: number[] };
export function voiceStatus(config: VoiceConfig) {
  const voiceId = process.env.ELEVENLABS_VOICE_ID || config.voiceId;
  return { provider: config.provider, keyConfigured: Boolean(process.env.ELEVENLABS_API_KEY),
    voiceConfigured: Boolean(voiceId), modelId: config.modelId };
}
export function speechFingerprint(text: string, config: VoiceConfig, voiceId: string) {
  return digest(JSON.stringify({ text, voiceId, model: config.modelId, settings: config.settings }));
}
export function wordMarkers(alignment: Alignment): WordMarker[] {
  const { characters: chars, character_start_times_seconds: starts, character_end_times_seconds: ends } = alignment;
  if (!Array.isArray(chars) || chars.length !== starts?.length || chars.length !== ends?.length ||
    chars.some((c) => typeof c !== 'string') || starts.some((n, i) => !Number.isFinite(n) || n < 0 ||
      !Number.isFinite(ends[i]) || ends[i] < n || (i > 0 && n < starts[i - 1])))
    throw new Error('ElevenLabs retornou alinhamento inválido');
  const words: WordMarker[] = []; let current: WordMarker | null = null;
  chars.forEach((c, i) => {
    if (/^\s+$/.test(c)) { if (current) words.push(current); current = null; }
    else if (current) { current.text += c; current.end = ends[i]; }
    else current = { text: c, start: starts[i], end: ends[i] };
  });
  if (current) words.push(current);
  return words;
}
export async function synthesize(text: string, config: VoiceConfig, request: typeof fetch = fetch) {
  if (!text.trim()) throw new Error('Narração vazia');
  const key = process.env.ELEVENLABS_API_KEY, voice = process.env.ELEVENLABS_VOICE_ID || config.voiceId;
  if (config.provider !== 'elevenlabs') throw new Error('Ative provider=elevenlabs em brand/narracao.json');
  if (!key) throw new Error('Falta ELEVENLABS_API_KEY no ambiente local');
  if (!voice || !/^[a-zA-Z0-9_-]+$/.test(voice)) throw new Error('Falta ELEVENLABS_VOICE_ID válido');
  if (config.settings.speed !== 1) throw new Error('A velocidade da narração deve ser 1');
  // No automatic retries: an uncertain request can already have consumed credits.
  let response: Response;
  try {
    response = await request(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voice)}/with-timestamps?output_format=mp3_44100_128`,
      { method: 'POST', headers: { 'xi-api-key': key, 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, model_id: config.modelId, voice_settings: config.settings }),
        signal: AbortSignal.timeout(60000) });
  } catch { throw new Error('Requisição ElevenLabs sem resposta confirmada; não repetir automaticamente'); }
  if (!response.ok) throw new Error(`ElevenLabs HTTP ${response.status}; não repetir automaticamente`);
  const result = await response.json() as { audio_base64: string; alignment?: Alignment; normalized_alignment?: Alignment };
  if (!result.audio_base64 || !/^[A-Za-z0-9+/=\r\n]+$/.test(result.audio_base64)) throw new Error('ElevenLabs não retornou áudio válido');
  const audio = Buffer.from(result.audio_base64, 'base64');
  if (audio.length < 32) throw new Error('Áudio ElevenLabs vazio/incompleto');
  const alignment = result.alignment ?? result.normalized_alignment;
  return { audio, fingerprint: speechFingerprint(text, config, voice), markers: alignment ? wordMarkers(alignment) : [] };
}
