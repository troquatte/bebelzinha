import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const require = createRequire(import.meta.url);
export function executable(name: 'ffmpeg' | 'ffprobe'): string {
  const platform = process.platform === 'win32' ? `win32-${process.arch}-msvc`
    : process.platform === 'darwin' ? `darwin-${process.arch}` : `linux-${process.arch}-gnu`;
  try {
    return resolve(dirname(require.resolve(`@remotion/compositor-${platform}/package.json`)),
      `${name}${process.platform === 'win32' ? '.exe' : ''}`);
  } catch { return name; }
}
export function execute(command: string, args: string[], cwd?: string): Buffer {
  const r = spawnSync(command, args, { cwd, windowsHide: true, maxBuffer: 256 * 1024 * 1024 });
  if (r.error || r.status !== 0)
    throw new Error(`${command.split(/[\\/]/).pop()}: ${r.error?.message || r.stderr?.toString().trim().slice(-2500) || r.stdout?.toString().slice(-2500) || r.status}`);
  return r.stdout;
}
export type Probe = { streams: { codec_type: string; codec_name: string; width?: number;
  height?: number; avg_frame_rate?: string; duration?: string; pix_fmt?: string;
  sample_rate?: string; channels?: number; nb_frames?: string }[]; format: { duration?: string } };
export const probe = (file: string): Probe => JSON.parse(execute(executable('ffprobe'),
  ['-v', 'error', '-show_streams', '-show_format', '-of', 'json', file]).toString());
export function pcm(file: string, channel?: number): Float32Array {
  const raw = execute(executable('ffmpeg'), ['-v', 'error', '-i', file, '-vn',
    ...(channel === undefined ? [] : ['-af', `pan=mono|c0=c${channel}`]),
    '-ar', '16000', '-ac', '1', '-c:a', 'pcm_s16le', '-f', 'wav', 'pipe:1']);
  let offset = 12;
  while (offset + 8 <= raw.length) {
    const tag = raw.toString('ascii', offset, offset + 4), size = raw.readUInt32LE(offset + 4);
    if (tag === 'data') {
      const start = offset + 8, length = Math.min(size, raw.length - start);
      return Float32Array.from({ length: Math.floor(length / 2) }, (_, i) => raw.readInt16LE(start + i * 2) / 32768);
    }
    offset += 8 + size + (size % 2);
  }
  throw new Error('FFmpeg não retornou PCM WAV válido');
}
export function artInfo(file: string) {
  const p = probe(file).streams[0];
  if (p.codec_name !== 'png' || !p.width || !p.height) throw new Error('3-arte.png não é PNG válido');
  const raw = execute(executable('ffmpeg'), ['-v', 'error', '-i', file, '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'rawvideo', '-pix_fmt', 'rgba', 'pipe:1']);
  if (raw.length !== p.width * p.height * 4) throw new Error('PNG não foi decodificado integralmente');
  let left = p.width, right = 0, top = p.height, bottom = 0, transparent = false;
  for (let y = 0; y < p.height; y++) for (let x = 0; x < p.width; x++) {
    const a = raw[(y * p.width + x) * 4 + 3];
    if (a < 255) transparent = true;
    if (a > 0) { left = Math.min(left, x); right = Math.max(right, x + 1);
      top = Math.min(top, y); bottom = Math.max(bottom, y + 1); }
  }
  if (!right) throw new Error('Arte totalmente transparente');
  return { artWidth: p.width, artHeight: p.height, alpha: transparent, bounds: { left, right, top, bottom } };
}
export function browserExecutable(): string | undefined {
  if (process.env.CTA_BROWSER_EXECUTABLE) {
    if (!existsSync(process.env.CTA_BROWSER_EXECUTABLE)) throw new Error('CTA_BROWSER_EXECUTABLE não existe');
    return process.env.CTA_BROWSER_EXECUTABLE;
  }
  for (const base of [process.env.ProgramFiles, process.env['ProgramFiles(x86)']]) {
    if (!base) continue;
    for (const app of ['Google/Chrome/Application/chrome.exe', 'Microsoft/Edge/Application/msedge.exe']) {
      const file = resolve(base, app); if (existsSync(file)) return file;
    }
  }
  return undefined;
}
export function environment() {
  return { node: process.version, remotion: require('remotion/package.json').version,
    ffmpeg: execute(executable('ffmpeg'), ['-version']).toString().split('\n')[0],
    ffprobe: execute(executable('ffprobe'), ['-version']).toString().split('\n')[0],
    browser: browserExecutable() ?? 'Remotion managed Chrome' };
}

export function validateMetadata(p: Probe, frames: number): void {
  const vs = p.streams.filter((s) => s.codec_type === 'video'), as = p.streams.filter((s) => s.codec_type === 'audio');
  if (p.streams.length !== 2 || vs.length !== 1 || as.length !== 1 || vs[0].codec_name !== 'h264' ||
      vs[0].width !== 1080 || vs[0].height !== 1920 || vs[0].avg_frame_rate !== '30/1' ||
      vs[0].pix_fmt !== 'yuv420p' || as[0].codec_name !== 'aac' ||
      Number(vs[0].nb_frames) !== frames || !Number.isFinite(Number(p.format.duration)) ||
      Math.abs(Number(p.format.duration) - frames / 30) > 0.08)
    throw new Error('MP4 fora do contrato de streams/dimensões/FPS/duração');

}
