import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { seo, pageHtml, generateSeoArtifacts } from './seo-artifacts.mjs';

const root = process.argv[2];
if (!root) throw new Error('Informe o diretório de saída do build.');
const shell = await readFile(join(root, 'index.csr.html'), 'utf8');
const fallback = pageHtml(shell, {
  path: null,
  title: 'Página não encontrada | Bebelzinha',
  description: 'Volte às receitas e ferramentas da Bebel.',
  indexable: false,
});
await writeFile(join(root, 'index.csr.html'), fallback);
await writeFile(join(root, '404.html'), fallback);
for (const page of seo.shells) {
  const directory = join(root, page.path.slice(1));
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), pageHtml(shell, page));
}
// O catálogo antigo não publica shells de receitas sem uma rota e conteúdo reais.
await generateSeoArtifacts(root);
