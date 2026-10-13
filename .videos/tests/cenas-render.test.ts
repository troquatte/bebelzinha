import test from 'node:test';
import assert from 'node:assert/strict';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { atomic, engineRoot, exclusive, fileHash, readJson, safe } from '../factory/storage.ts';
import { assets, compile, readPlan } from '../factory/cenas/prepare.ts';
import { find, list, reserve } from '../factory/cenas/queue.ts';
import { finish, render } from '../factory/cenas/render.ts';
import type { Plan } from '../factory/cenas/contracts.ts';
import { acceleratedFrames, playbackRate } from '../factory/cenas/speed.ts';

test('render real de duas cenas: uma narração, colisão preservada, conclusão e limpeza',
  { skip: process.env.CENAS_RENDER_TEST !== '1' }, () => {
    mkdirSync(safe(engineRoot, 'temp'), { recursive: true });
    const root = mkdtempSync(safe(engineRoot, 'temp/cenas-render-'));
    try {
      exclusive(root, () => {
        const path = 'assets/cenas/tarefas/001-afazer/001-diagnostico';
        mkdirSync(safe(root, path), { recursive: true });
        const plan = readJson(safe(engineRoot, 'examples/montagem-tema.json')) as Plan;
        for (const p of assets(plan)) {
          mkdirSync(dirname(safe(root, p)), { recursive: true }); copyFileSync(safe(engineRoot, p), safe(root, p));
        }
        copyFileSync(safe(engineRoot, 'examples/roteiro-tema.md'), safe(root, `${path}/roteiro.md`));
        copyFileSync(safe(engineRoot, 'assets/cenas/001-cena-01/audio.mp3'), safe(root, `${path}/audio.mp3`));
        atomic(safe(root, `${path}/montagem.json`), plan);
        const task = reserve(root, find(root, '001-diagnostico'));
        const compiled = compile(root, task);
        assert.equal(compiled.props.scenes.length, 2); assert.equal(compiled.props.durationInFrames, 183);
        const originalHash = fileHash(safe(root, `${task.path}/audio.mp3`));
        mkdirSync(safe(root, `${task.path}/output`));
        writeFileSync(safe(root, `${task.path}/output/convertido-0001.mp4`), 'preserve existing output');
        const previousHash = fileHash(safe(root, `${task.path}/output/convertido-0001.mp4`));
        render(root, task); assert.equal(render(root, task).resumed, true);
        const result = finish(root, task), done = find(root, task.key);
        assert.match(result.output, /convertido-0002.mp4$/);
        assert.equal(fileHash(safe(root, `${done.path}/output/convertido-0001.mp4`)), previousHash);
        assert.equal(fileHash(safe(root, `${done.path}/audio.mp3`)), originalHash);
        assert.ok(!existsSync(safe(root, `${done.path}/.work.json`)));
        assert.ok(!existsSync(safe(root, `${done.path}/.runtime`)));
        assert.equal(readPlan(root, done).output?.hash, fileHash(safe(root, result.output)));
        assert.equal(acceleratedFrames(compiled.props.durationInFrames, playbackRate()), Math.ceil(183 / playbackRate()));
        const folder = 'assets/cenas/diagnosticos'; mkdirSync(safe(engineRoot, folder), { recursive: true });
        let n = 1; const filename = () => `${folder}/tema-multicena-${String(n).padStart(4, '0')}.mp4`;
        while (existsSync(safe(engineRoot, filename()))) n++;
        copyFileSync(safe(root, result.output), safe(engineRoot, filename()));
        console.log(`Diagnóstico: ${filename()}`);
        rmSync(safe(root, done.path), { recursive: true }); assert.deepEqual(list(root), []);
      }, 'cenas');
    } finally { rmSync(root, { recursive: true }); }
  });
