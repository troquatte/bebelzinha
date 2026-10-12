import { existsSync } from 'node:fs';
import { relative, sep } from 'node:path';
import { engineRoot, exclusive, safe, selectRoot } from '../factory/storage.ts';
import { environment, execute, executable } from '../factory/media.ts';
import { find, hashes, list, readManifest, recover, saveManifest } from '../factory/cta/queue.ts';
import { prepare } from '../factory/cta/prepare.ts';
import { assertInputs, readConfig, render, stage } from '../factory/cta/render.ts';
import { compactCompleted, finish, recoverPromotion, validate } from '../factory/cta/validate.ts';
import { configSignature, inputSignature } from '../factory/cta/contracts.ts';
import type { Task } from '../factory/cta/contracts.ts';
import { transcribe, transcriptionEnvironment } from '../factory/cta/transcribe.ts';

const args = process.argv.slice(2), command = args.shift();
const value = (flag: string) => {
  const i = args.indexOf(flag);
  if (i < 0) return undefined;
  if (!args[i + 1] || args[i + 1].startsWith('--')) throw new Error(`Valor ausente: ${flag}`);
  return args[i + 1];
};
function main() {
  const root = selectRoot(value('--root')), key = value('--task');
  const selected = () => { if (!key) throw new Error('--task 001-inicio/001-tema ou 002-final/001-tema obrigatório'); return find(root, key); };
  if (command === 'list') return list(root).map((t) => ({ task: t.key, state: t.state }));
  if (command === 'doctor') return { environment: environment(), transcription: transcriptionEnvironment(), tasks: list(root), scope: 'CTA', root: root === engineRoot ? '.' : root };
  if (command === 'frame') {
    const t = selected(), source = value('--source') ?? 'output', seconds = Number(value('--seconds') ?? 0);
    if (!Number.isFinite(seconds) || seconds < 0) throw new Error('Segundo inválido');
    const m = source === 'output' ? readManifest(root, t) : null;
    const name = source === 'video' ? '2-video.mp4' : source === 'art' ? '3-arte.png' : source === 'output' ?
      (m?.output?.signature === m?.run?.signature ? m?.output?.file : m?.run?.file) : undefined;
    if (!name) throw new Error('Fonte/saída ausente');
    const bytes = execute(executable('ffmpeg'), ['-v', 'error', '-ss', String(seconds), '-i', safe(root, `${t.path}/${name}`),
      '-frames:v', '1', '-f', 'image2pipe', '-c:v', 'png', 'pipe:1']);
    process.stdout.write(bytes); return undefined;
  }
  return exclusive(root, () => {
    recover(root);
    if (command === 'reconcile') {
      const items = [];
      for (const t of list(root)) {
        if (t.state === '003-gerados') {
          if (existsSync(safe(root, `${t.path}/manifest.json`))) compactCompleted(root, t);
          continue;
        }
        if (!existsSync(safe(root, `${t.path}/manifest.json`))) {
          if (t.state !== '001-afazer') throw new Error(`Tarefa fora de afazer sem manifest: ${t.key}`);
          continue;
        }
        recoverPromotion(root, t);
        const m = readManifest(root, t);
        if (m.key !== t.key) throw new Error(`Tema renomeado: ${t.key}`);
        if (m.stage !== t.state) {
          if (m.status === 'generated') throw new Error(`Movimento manual exige revisão: ${t.key}`);
          m.stage = t.state; saveManifest(root, t, m, 'Movimento manual reconciliado');
        }
        items.push({ key: t.key, state: t.state });
      }
      return items;
    }
    if (command === 'prepare') {
      const { task, config } = prepare(root, selected());
      return { task: task.key, config: `${task.path}/config.json`, ctaStartSeconds: config.timing.ctaStartSeconds };
    }
    if (command === 'transcribe') return transcribe(root, selected());
    if (command === 'render') return render(root, selected());
    if (command === 'validate') return validate(root, selected());
    if (command === 'finish') return finish(root, selected());
    if (command === 'stage') {
      const t = selected(), c = readConfig(root, t), m = readManifest(root, t);
      assertInputs(root, t, c);
      if (!m.run) throw new Error('Execute process/render primeiro');
      stage(root, t, c, m.run);
      const props = relative(engineRoot, safe(root, `${t.path}/${m.run.props}`)).split(sep).join('/');
      return { props, composition: c.composition,
        studio: `npm run dev -- --props="${props}"` };
    }
    if (command === 'process') {
      const results = [];
      for (let task of list(root).filter((t) => t.state !== '003-gerados' && (!key || t.key === key))) {
        try {
          if (task.state === '002-desenvolvendo') {
            recoverPromotion(root, task);
            const m = readManifest(root, task);
            if (m.stage !== task.state) throw new Error('Execute cta:reconcile antes de processar');
            if (m.status === 'blocked' && !args.includes('--retry')) {
              const c = existsSync(safe(root, `${task.path}/config.json`)) ? readConfig(root, task) : null;
              const blocked = m.blocked;
              if (blocked && blocked.input === inputSignature(hashes(root, task)) && blocked.config === (c ? configSignature(c) : '')) {
                results.push({ task: task.key, pending: m.pending }); continue;
              }
            }
          }
          const prepared = prepare(root, task); task = prepared.task;
          render(root, task);
          results.push(finish(root, task));
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          // A reserva pode ter movido a pasta antes de uma falha de preparação.
          const latest: Task = find(root, task.key);
          if (latest.state === '002-desenvolvendo' && existsSync(safe(root, `${latest.path}/manifest.json`))) {
            const m = readManifest(root, latest); m.status = 'blocked'; m.pending = message;
            const c = existsSync(safe(root, `${latest.path}/config.json`)) ? readConfig(root, latest) : null;
            let signature = '';
            try { signature = inputSignature(hashes(root, latest)); } catch { /* Material pendente registrado. */ }
            m.blocked = { input: signature, config: c ? configSignature(c) : '' };
            saveManifest(root, latest, m);
          }
          results.push({ task: task.key, pending: message });
        }
      }
      if (key && !results.length) throw new Error('Tarefa inexistente ou já gerada');
      return results;
    }
    throw new Error('Comando: doctor, list, process, prepare, transcribe, render, validate, finish, reconcile, stage, frame');
  });
}
try {
  const result = main(); if (result !== undefined) process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : error}\n`); process.exitCode = 1;
}
