import { renameSync, unlinkSync } from 'node:fs';
import { engineRoot, fileHash, readJson, safe } from '../storage.ts';
import { executable, execute, probe, validateMetadata } from '../media.ts';
import { acceleratedFrames, playbackRate } from './speed.ts';

export function ending() {
  const path = (readJson(safe(engineRoot, 'brand/miolo.json')) as { endingClip?: string }).endingClip;
  if (!path) return undefined;
  const file = safe(engineRoot, path), hash = fileHash(file), metadata = probe(file);
  const frames = Number(metadata.streams.find(s => s.codec_type === 'video')?.nb_frames);
  validateMetadata(metadata, frames);
  return { file, frames, hash };
}
export function exportFrames(sourceFrames: number) {
  return acceleratedFrames(sourceFrames, playbackRate()) + (ending()?.frames ?? 0);
}
export function appendEnding(file: string, sourceFrames: number) {
  const clip = ending(); if (!clip) return;
  const output = `${file}.ending.mp4`;
    execute(executable('ffmpeg'), ['-v', 'error', '-i', file, '-i', clip.file,
      '-filter_complex', '[0:v:0][0:a:0][1:v:0][1:a:0]concat=n=2:v=1:a=1[v][a]',
      '-map', '[v]', '-map', '[a]', '-r', '30', '-fps_mode', 'cfr',
      '-frames:v', String(acceleratedFrames(sourceFrames, playbackRate()) + clip.frames),
      '-c:v', 'libx264', '-crf', '18', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-ar', '48000', '-ac', '2', output]);
    if (fileHash(clip.file) !== clip.hash) throw new Error('CTA mudou durante exportação');
    validateMetadata(probe(output), acceleratedFrames(sourceFrames, playbackRate()) + clip.frames);
    const at = Math.min(2, clip.frames / 60);
    const sample = (path: string, seconds: number) => execute(executable('ffmpeg'), ['-v', 'error',
      '-ss', String(seconds), '-i', path, '-frames:v', '1', '-vf', 'scale=48:85',
      '-f', 'image2pipe', '-c:v', 'rawvideo', '-pix_fmt', 'rgb24', 'pipe:1']);
    const original = sample(clip.file, at), appended = sample(output, acceleratedFrames(sourceFrames, playbackRate()) / 30 + at);
    if (original.length !== 48 * 85 * 3 || appended.length !== original.length ||
      original.reduce((sum, value, i) => sum + Math.abs(value - appended[i]), 0) / original.length > 18)
      throw new Error('Imagem do CTA não corresponde ao encerramento fornecido');
    unlinkSync(file); renameSync(output, file);
}
