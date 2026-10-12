import { existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { resolve } from 'node:path';
import { engineRoot, fileHash, safe } from '../storage.ts';
import { executable, execute } from '../media.ts';
import type { Task } from './contracts.ts';

export function transcriptionEnvironment() {
  const python = process.env.CTA_PYTHON_EXECUTABLE ?? resolve(homedir(),
    '.cache/codex-runtimes/codex-primary-runtime/dependencies/python', process.platform === 'win32' ? 'python.exe' : 'bin/python3');
  return { python, available: existsSync(python) && existsSync(safe(engineRoot, '.cache/cta/python/faster_whisper')) &&
    existsSync(safe(engineRoot, '.cache/cta/models/models--Systran--faster-whisper-base')) };
}
export function transcribe(root: string, task: Task) {
  const env = transcriptionEnvironment();
  if (!env.available) throw new Error('Transcrição local indisponível: conferir CTA_PYTHON_EXECUTABLE e .cache/cta/{python,models}; sem download automático');
  const file = safe(root, `${task.path}/1-audio.mp3`), before = fileHash(file);
  const result = JSON.parse(execute(env.python, [safe(engineRoot, 'scripts/transcribe.py'), file, executable('ffmpeg')], engineRoot).toString());
  if (fileHash(file) !== before) throw new Error('Áudio mudou durante transcrição');
  return { audioHash: before, ...result };
}
