import { copyFileSync, existsSync, mkdirSync, renameSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { randomUUID } from 'node:crypto';
import { browserExecutable, execute, probe } from '../factory/media.ts';
import { engineRoot, fileHash, readJson, safe } from '../factory/storage.ts';

const scene = 'cenas/001-cena-01';
const data = readJson(safe(engineRoot, 'src/data/miolo-cena-01.json')) as { audioSeconds: number; holdSeconds: number; audioHash: string };
// destino (relativo a public/<cena>/) -> origem (relativa ao motor)
const files: Record<string, string> = {
  'cenario/fundo-video.mp4': 'assets/cenario/fundo-video.mp4',
  'personagem/bebel-olhando.png': 'assets/personagem/bebel-olhando.png',
  'personagem/bebel-surpresa.png': 'assets/personagem/bebel-surpresa.png',
  'personagem/bebel-apontando.png': 'assets/personagem/bebel-apontando.png',
  'itens/arroz.png': 'assets/itens/arroz.png',
  'fontes/roboto.ttf': 'assets/fontes/roboto.ttf',
  'audio.mp3': `assets/${scene}/audio.mp3`,
};
const audioPath = `assets/${scene}/audio.mp3`;
const before = Object.values(files).map((source) => fileHash(safe(engineRoot, source)));
if (fileHash(safe(engineRoot, audioPath)) !== data.audioHash)
  throw new Error('Áudio mudou: medir e atualizar os marcadores antes de renderizar');
if (data.holdSeconds > 0.4) throw new Error('Sustentação desta revisão deve ser no máximo 0.4s');
mkdirSync(safe(engineRoot, `public/${scene}`), { recursive: true });
for (const [destination, source] of Object.entries(files)) {
  const target = safe(engineRoot, `public/${scene}/${destination}`);
  mkdirSync(dirname(target), { recursive: true });
  copyFileSync(safe(engineRoot, source), target);
}
const dir = `assets/${scene}/diagnosticos`;
mkdirSync(safe(engineRoot, dir), { recursive: true });
let version = 1;
while (existsSync(safe(engineRoot, `${dir}/cena-01-${String(version).padStart(4, '0')}.mp4`))) version++;
const output = safe(engineRoot, `${dir}/cena-01-${String(version).padStart(4, '0')}.mp4`);
const temporary = safe(engineRoot, `${dir}/cena-01-${randomUUID()}.tmp.mp4`);
try {
  const browser = browserExecutable();
  execute(process.execPath, [resolve(engineRoot, 'node_modules/@remotion/cli/remotion-cli.js'), 'render',
    'src/index.ts', 'BebelMioloCena01', temporary, '--codec=h264', '--audio-codec=aac', '--pixel-format=yuv420p',
    '--color-space=bt709', '--crf=18', '--concurrency=2', '--overwrite=false', '--log=error',
    ...(browser ? [`--browser-executable=${browser}`] : [])], engineRoot);
  const p = probe(temporary), video = p.streams.find((s) => s.codec_type === 'video'), audio = p.streams.find((s) => s.codec_type === 'audio');
  const frames = Math.ceil((data.audioSeconds + data.holdSeconds) * 30);
  if (p.streams.length !== 2 || video?.codec_name !== 'h264' || video.width !== 1080 || video.height !== 1920 ||
      video.avg_frame_rate !== '30/1' || video.pix_fmt !== 'yuv420p' || Number(video.nb_frames) !== frames ||
      audio?.codec_name !== 'aac' || !Number.isFinite(Number(p.format.duration)) ||
      Math.abs(Number(p.format.duration) - frames / 30) > 0.08) throw new Error('Diagnóstico fora do formato esperado');
  if (Object.values(files).some((source, i) => before[i] !== fileHash(safe(engineRoot, source))))
    throw new Error('Assets mudaram durante o render');
  if (existsSync(output)) throw new Error('Destino ocupado; arquivo preservado');
  renameSync(temporary, output);
  console.log(JSON.stringify({ output, durationSeconds: Number(p.format.duration), status: 'diagnostico', approval: null }));
} catch (error) {
  if (existsSync(temporary)) rmSync(temporary);
  throw error;
}
