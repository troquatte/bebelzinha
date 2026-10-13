import { existsSync } from 'node:fs';
import { randomUUID } from 'node:crypto';
import { engineRoot, exclusive, safe, selectRoot } from '../factory/storage.ts';
import { fingerprint, prepare } from '../factory/cenas/prepare.ts';
import { create, find, list, narration, recover, saveWork, script, work } from '../factory/cenas/queue.ts';
import { editorial, remember } from '../factory/cenas/editorial.ts';
import { importImage } from '../factory/cenas/assets.ts';
import { compact, finish, recoverPromotion, render, stage } from '../factory/cenas/render.ts';
import { audio, config } from '../factory/narration/task.ts';
import { voiceStatus } from '../factory/narration/elevenlabs.ts';
import { executable, execute } from '../factory/media.ts';
import { transcriptionEnvironment } from '../factory/cta/transcribe.ts';

const args = process.argv.slice(2), command = args.shift();
const value = (flag: string) => {
  const i = args.indexOf(flag);
  if (i < 0) return undefined;
  if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`Valor ausente: ${flag}`);
  return args[i + 1];
};
async function main() {
  if (existsSync(safe(engineRoot, '.env'))) process.loadEnvFile(safe(engineRoot, '.env'));
  const root = selectRoot(value('--root')), key = value('--task');
  const selected = () => { if (!key) throw new Error('--task 001-nome-do-tema obrigatório'); return find(root, key); };
  if (command === 'list') return list(root).map((t) => ({ task: t.key, state: t.state }));
  if (command === 'voice-status') return voiceStatus(config());
  if (command === 'editorial') return editorial(root) ?? { pending: 'Falta brand/temas-utilizados.json' };
  return exclusive(root, async () => {
    recover(root);
    if (command === 'remember') {
      const task = selected(), text = script(root, task); narration(text);
      const theme = text.match(/^#\s+(.+)$/m)?.[1]?.trim();
      if (!theme) throw new Error('Roteiro precisa de título # Tema');
      return remember(root, task.key, theme, value('--category') ?? '', value('--summary') ?? '', args.includes('--allow-repeat'));
    }
    if (command === 'new') return create(root, value('--theme') ?? '', Number(value('--seconds') ?? 20));
    if (command === 'asset') {
      const source = value('--source'); if (!source) throw new Error('--source obrigatório');
      return importImage(root, source, value('--kind') ?? '', value('--name') ?? '');
    }
    if (command === 'reconcile') {
      for (const task of list(root)) {
        const hasControl = existsSync(safe(root, `${task.path}/.work.json`));
        if (task.state === '003-gerados') { if (hasControl) compact(root, task); }
        else if (hasControl) recoverPromotion(root, task);
      }
      return { status: 'OK' };
    }
    if (command === 'prepare') {
      const result = prepare(root, selected());
      return { task: result.task.key, montagem: `${result.task.path}/montagem.json`, pending: result.pending };
    }
    if (command === 'audio') return audio(root, selected(), args.includes('--generate'), args.includes('--retry-request'));
    if (command === 'transcribe') {
      const task = selected(), env = transcriptionEnvironment();
      if (!env.available) throw new Error('Transcrição local indisponível; não há download automático');
      return JSON.parse(execute(env.python, [safe(engineRoot, 'scripts/transcribe.py'), safe(root, `${task.path}/audio.mp3`), executable('ffmpeg')], engineRoot).toString());
    }
    if (command === 'render') return render(root, selected());
    if (command === 'finish') return finish(root, selected());
    if (command === 'stage') {
      const task = selected();
      if (task.state === '001-afazer') throw new Error('Prepare o tema antes de abrir a montagem');
      if (!existsSync(safe(root, `${task.path}/.work.json`))) saveWork(root, task, { key: task.key, id: randomUUID() });
      stage(root, task);
      return { composition: 'BebelMioloTema', props: `${task.path}/.runtime/props.json` };
    }
    if (command !== 'process') throw new Error('Comando: new, asset, list, prepare, process, render, finish, reconcile, stage, transcribe, audio, voice-status');
    const tasks = list(root).filter((t) => t.state !== '003-gerados' && (!key || key === t.key));
    if (key && !tasks.length) throw new Error('Tema inexistente ou já gerado');
    const result = [];
    for (let task of tasks) {
      try {
        if (task.state === '002-desenvolvendo') {
          recoverPromotion(root, task);
          const w = work(root, task);
          if (w.blocked === fingerprint(root, task) && !args.includes('--retry')) {
            result.push({ task: task.key, pending: w.pending }); continue;
          }
        }
        const prepared = prepare(root, task); task = prepared.task;
        if (prepared.pending.length) throw new Error(prepared.pending.join('; '));
        render(root, task); result.push(finish(root, task));
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const latest = find(root, task.key);
        if (latest.state === '002-desenvolvendo' && existsSync(safe(root, `${latest.path}/.work.json`))) {
          const w = work(root, latest); w.pending = message; w.blocked = fingerprint(root, latest); saveWork(root, latest, w);
        }
        result.push({ task: task.key, pending: message });
      }
    }
    return result;
  }, 'cenas');
}
try { const result = await main(); process.stdout.write(`${JSON.stringify(result, null, 2)}\n`); }
catch (error) { process.stderr.write(`${error instanceof Error ? error.message : error}\n`); process.exitCode = 1; }
