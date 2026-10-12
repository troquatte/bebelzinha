import { digest } from '../storage.ts';

export const queueRoot = 'assets/cta/tarefas';
export const states = ['001-afazer', '002-desenvolvendo', '003-gerados'] as const;
export const kinds = ['001-inicio', '002-final'] as const;
export type State = typeof states[number];
export type Kind = typeof kinds[number];
export const sources = { narration: '1-audio.mp3', video: '2-video.mp4', cta: '3-arte.png' } as const;
export type Hashes = Record<keyof typeof sources, string>;
export type Task = { key: string; name: string; kind: Kind; state: State; path: string };
export type Template = {
  schemaVersion: 1; id: string; composition: string;
  timing: { sustainSeconds: number; ctaEntranceSeconds: number };
  layout: { ctaWidth: number; ctaTop: number; entranceOffset: number; margin: number };
  render: { width: number; height: number; fps: number };
};
export type Inspection = {
  inputSignature: string; ctaStartSeconds: number; safeBottom: number;
  notes: string; inspectedVideoSeconds: number[]; narrationEvidence: string;
  allowSlowVideo?: boolean;
};
export type Config = {
  schemaVersion: 1; taskId: string; templateId: string; composition: string;
  sources: typeof sources; inputSignature: string; hashes: Hashes;
  media: { audioSeconds: number; videoSeconds: number; videoWidth: number; videoHeight: number;
    artWidth: number; artHeight: number; alpha: boolean;
    bounds: { left: number; top: number; right: number; bottom: number } };
  timing: { sustainSeconds: number; ctaStartSeconds: number | null; ctaEntranceSeconds: number };
  layout: Template['layout'];
  render: Template['render'] & { durationInFrames: number; videoPlaybackRate: number };
  inspection: Inspection | null;
};
export type Run = { id: string; signature: string; inputSignature: string; file: string;
  props: string; stage: string; complete: boolean; hash?: string; allIntra?: boolean };
export type Manifest = {
  schemaVersion: 1; taskId: string; key: string; stage: State;
  status: 'prepared' | 'blocked' | 'rendered' | 'generated';
  createdAt: string; updatedAt: string; inputSignature: string;
  approval: null; pending?: string; run?: Run;
  output?: { file: string; hash: string; signature: string };
  history: { at: string; event: string }[];
};
export const templateId = (kind: Kind) => kind === '001-inicio' ? 'cta-inicio' : 'cta-encerramento';
export function timing(audio: number, video: number) {
  if (![audio, video].every((n) => Number.isFinite(n) && n > 0)) throw new Error('Duração inválida');
  const durationInFrames = Math.ceil((audio + 0.5) * 30);
  return { width: 1080, height: 1920, fps: 30, durationInFrames,
    videoPlaybackRate: Math.min(1, video / (durationInFrames / 30)) };
}
export const inputSignature = (hashes: Hashes) => digest(JSON.stringify(hashes));
export const configSignature = (config: Config) => digest(JSON.stringify(config));
export function validateConfig(c: Config): void {
  if (c.schemaVersion !== 1 || Object.keys(c.sources).length !== 3 ||
      Object.entries(sources).some(([k, v]) => c.sources[k as keyof typeof sources] !== v) ||
      c.inputSignature !== inputSignature(c.hashes)) throw new Error('Configuração inválida');
  const expected = timing(c.media.audioSeconds, c.media.videoSeconds);
  if (Object.entries(expected).some(([k, v]) => c.render[k as keyof typeof expected] !== v) || c.timing.sustainSeconds !== 0.5)
    throw new Error('Duração/rate/render divergentes; prepare novamente');
  if (!['cta-inicio', 'cta-encerramento'].includes(c.templateId) ||
      c.composition !== (c.templateId === 'cta-inicio' ? 'BebelInicio' : 'BebelEncerramento'))
    throw new Error('Composição/modelo inválido');
  if (!c.inspection || c.inspection.inputSignature !== c.inputSignature)
    throw new Error('Inspeção visual e da narração pendente');
  const i = c.inspection;
  if (!i.notes?.trim() || !i.narrationEvidence?.trim() || i.inspectedVideoSeconds.length < 3 ||
      !i.inspectedVideoSeconds.every((s) => Number.isFinite(s) && s >= 0 && s < c.media.videoSeconds))
    throw new Error('Registre evidências de início, meio, fim e narração');
  if (c.render.videoPlaybackRate < 0.5 && i.allowSlowVideo !== true)
    throw new Error('Vídeo abaixo de 0.5x: decisão do usuário pendente');
  const start = c.timing.ctaStartSeconds;
  if (start === null || start !== i.ctaStartSeconds || !Number.isFinite(start) || start < 0 ||
      !Number.isFinite(c.timing.ctaEntranceSeconds) || c.timing.ctaEntranceSeconds <= 0 ||
      start + c.timing.ctaEntranceSeconds > c.media.audioSeconds)
    throw new Error('Timing do CTA fora do convite/áudio');
  const { ctaWidth: w, ctaTop: top, entranceOffset: offset, margin } = c.layout;
  if (![w, top, offset, margin, i.safeBottom].every(Number.isFinite) || w < 1 ||
      margin < 16 || w > 1080 - 2 * margin || top < margin || offset < 0 ||
      i.safeBottom > 1920 || i.safeBottom <= 0)
    throw new Error('Layout/margens inválidos');
  const bottom = top + offset + c.media.bounds.bottom * w / c.media.artWidth;
  if (bottom + margin > i.safeBottom) throw new Error('Arte invade a área protegida da personagem');
}
