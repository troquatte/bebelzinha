import { copyFileSync, existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, extname, resolve } from 'node:path';
import { mkdirSync } from 'node:fs';
import { fileHash, safe } from '../storage.ts';
import type { Background } from './contracts.ts';

const videos = ['.mp4', '.webm', '.mov'];
const images = ['.png', '.jpg', '.jpeg', '.webp'];
export function background(root: string, requested: Background): Background {
  if (!/^assets\/cenario\//.test(requested.asset)) throw new Error('Fundo deve estar em assets/cenario/');
  safe(root, requested.asset);
  const extension = extname(requested.asset).toLowerCase();
  if (![...videos, ...images].includes(extension)) throw new Error('Extensão de fundo não suportada');
  const stem = requested.asset.slice(0, -extension.length), folder = stem.slice(0, stem.lastIndexOf('/'));
  const names = existsSync(safe(root, folder)) ? readdirSync(safe(root, folder)) : [];
  const base = stem.slice(stem.lastIndexOf('/') + 1);
  for (const ext of [...videos, ...images]) {
    const name = names.find((n) => n.toLowerCase() === `${base}${ext}`.toLowerCase());
    if (name && statSync(safe(root, `${folder}/${name}`)).isFile())
      return { ...requested, asset: `${folder}/${name}`, type: videos.includes(ext) ? 'video' : 'image' };
  }
  throw new Error(`Fundo ausente: ${stem} (.mp4/.webm/.mov ou imagem)`);
}

export function importImage(root: string, source: string, kind: string, name: string) {
  if (!['cenario', 'personagem', 'itens'].includes(kind) || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name))
    throw new Error('Use tipo cenario/personagem/itens e nome slug sem extensão');
  const from = resolve(source), data = readFileSync(from);
  if (!data.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10]))) throw new Error('Imagem gerada precisa ser PNG');
  const hash = fileHash(from); let version = 1;
  while (true) {
    const file = `assets/${kind}/${name}${version === 1 ? '' : `-${String(version).padStart(2, '0')}`}.png`;
    const to = safe(root, file);
    if (!existsSync(to)) {
      mkdirSync(dirname(to), { recursive: true }); copyFileSync(from, to, 1);
      if (fileHash(to) !== hash) throw new Error('Imagem mudou durante importação');
      return { asset: file, reused: false };
    }
    if (fileHash(to) === hash) return { asset: file, reused: true };
    version++;
  }
}
