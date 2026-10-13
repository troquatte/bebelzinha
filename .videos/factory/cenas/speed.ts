import { renameSync, unlinkSync } from 'node:fs';
import { engineRoot, readJson, safe } from '../storage.ts';
import { executable, execute } from '../media.ts';
export function playbackRate() {
  const value = (readJson(safe(engineRoot, 'brand/miolo.json')) as { finalPlaybackRate: number }).finalPlaybackRate;
  if (!Number.isFinite(value) || value < 1 || value > 2) throw new Error('Velocidade final do miolo inválida');
  return value;
}
export const acceleratedFrames = (frames: number, rate: number) => Math.ceil(frames / rate);
export function accelerate(file: string, frames: number) {
  const rate = playbackRate(), target = `${file}.accelerated.mp4`;
  execute(executable('ffmpeg'), ['-v', 'error', '-itsscale', String(1 / rate), '-i', file,
    '-r', '30', '-fps_mode', 'cfr', '-frames:v', String(acceleratedFrames(frames, rate)),
    '-af', `atempo=${rate},asetpts=N/SR/TB`, '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-ar', '48000', '-ac', '2', target]);
  unlinkSync(file); renameSync(target, file);
}
