import { createHash, randomUUID } from 'node:crypto';
import {
  closeSync,
  existsSync,
  fsyncSync,
  lstatSync,
  mkdirSync,
  openSync,
  readFileSync,
  realpathSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from 'node:fs';
import { dirname, isAbsolute, relative, resolve, sep } from 'node:path';

export function relativePath(value: string): void {
  if (typeof value !== 'string' || !value || value.includes('\\') ||
      value.includes(':') || isAbsolute(value) ||
      value.split('/').some((part) => !part || part === '..' || part === '.'))
    throw new Error('Caminho relativo inválido');
}

export const engineRoot = resolve(import.meta.dirname, '..');
export const now = () => new Date().toISOString();
export const digest = (data: string | Buffer) =>
  createHash('sha256').update(data).digest('hex');
export const fileHash = (file: string) => digest(readFileSync(file));
export function safe(root: string, portable: string): string {
  relativePath(portable);
  const base = realpathSync(root);
  const path = resolve(base, portable);
  const rel = relative(base, path);
  if (isAbsolute(rel) || rel === '..' || rel.startsWith(`..${sep}`))
    throw new Error('Caminho fora da raiz');
  let current = base;
  for (const part of portable.split('/')) {
    current = resolve(current, part);
    if (existsSync(current) && lstatSync(current).isSymbolicLink())
      throw new Error(`Link/junction não permitido: ${portable}`);
  }
  return path;
}
export function selectRoot(input?: string): string {
  const root = resolve(input ?? engineRoot);
  if (root !== engineRoot) {
    const fixtures = resolve(engineRoot, 'temp');
    const rel = relative(fixtures, root);
    if (!rel || isAbsolute(rel) || rel.startsWith('..'))
      throw new Error('--root deve ser uma fixture dentro de temp/');
    safe(engineRoot, relative(engineRoot, root).split(sep).join('/'));
  }
  mkdirSync(root, { recursive: true });
  return realpathSync(root);
}
export function readJson(file: string): unknown {
  return JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, ''));
}
export function atomic(file: string, value: unknown): void {
  mkdirSync(dirname(file), { recursive: true });
  const tmp = `${file}.${randomUUID()}.tmp`;
  const fd = openSync(tmp, 'wx');
  try {
    writeFileSync(fd, `${JSON.stringify(value, null, 2)}\n`);
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
  renameSync(tmp, file);
}
export function exclusive<T>(root: string, action: () => T, resource = 'cta'): T {
  if (!/^[a-z][a-z0-9-]{0,63}$/.test(resource)) throw new Error('Recurso de lock inválido');
  const lock = safe(root, `logs/${resource}.lock`);
  mkdirSync(dirname(lock), { recursive: true });
  if (existsSync(lock)) {
    const owner = readJson(lock) as { pid: number; token: string };
    if (!Number.isSafeInteger(owner.pid) || owner.pid <= 0 || !owner.token)
      throw new Error(`Lock ilegível; inspecione logs/${resource}.lock`);
    let alive = true;
    try {
      process.kill(owner.pid, 0);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ESRCH') alive = false;
    }
    if (alive)
      throw new Error(
        `Fábrica ocupada pelo PID ${owner.pid}; tente novamente após conclusão`,
      );
    // Mutex de recuperação evita que dois processos removam o lock recém-criado pelo outro.
    const recovery = `${lock}.recovery`;
    const recoveryFd = openSync(recovery, 'wx');
    closeSync(recoveryFd);
    try {
      if (existsSync(lock)) {
        const latest = readJson(lock) as { token: string };
        if (latest.token !== owner.token)
          throw new Error('Lock mudou durante recuperação; tente novamente');
        const stale = `${lock}.stale-${owner.token}`;
        if (existsSync(stale))
          throw new Error('Evidência de lock stale já existe; inspecione logs');
        renameSync(lock, stale);
      }
    } finally {
      unlinkSync(recovery);
    }
  }
  const token = randomUUID();
  const fd = openSync(lock, 'wx');
  try {
    writeFileSync(fd, JSON.stringify({ pid: process.pid, token, at: now() }));
    fsyncSync(fd);
  } finally {
    closeSync(fd);
  }
  const release = () => {
    if (
      existsSync(lock) &&
      (readJson(lock) as { token: string }).token === token
    )
      unlinkSync(lock);
  };
  try {
    const result = action();
    if (result instanceof Promise) return result.finally(release) as T;
    release();
    return result;
  } catch (error) { release(); throw error; }
}
