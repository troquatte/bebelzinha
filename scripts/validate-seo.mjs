import assert from 'node:assert/strict';
import { access, copyFile, mkdir, mkdtemp, readFile, realpath, rm, unlink, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { JSDOM } from 'jsdom';
import { discoverPages, generateSeoArtifacts, pageHtml, pageUrl, seo, parseHtml, assetUrl } from './seo-artifacts.mjs';

const root = resolve(process.argv[2] ?? 'dist/bebelzinha/browser');
const htmlDocument = async file => parseHtml(await readFile(file, 'utf8'));
const urls = await discoverPages(root);
const xml = new JSDOM(await readFile(join(root, 'sitemap.xml'), 'utf8'), { contentType: 'application/xml' }).window.document;
assert.equal(xml.documentElement.namespaceURI, 'http://www.sitemaps.org/schemas/sitemap/0.9');
assert.deepEqual([...xml.querySelectorAll('loc')].map(node => node.textContent), urls);
for (const path of ['/', '/comidinhas', '/cortadores', '/wpp-bebelzinha', '/produtos/refeicao-resolvida']) {
  assert.ok(urls.includes(pageUrl(path)), 'URL pública ausente: ' + path);
}
for (const url of urls) {
  const parsed = new URL(url);
  assert.equal(parsed.origin, seo.origin);
  assert.equal(parsed.search + parsed.hash, '');
}
for (const path of seo.privatePaths) {
  assert.ok(!urls.includes(pageUrl(path)), 'Área pessoal/teste no sitemap: ' + path);
  const document = await htmlDocument(join(root, path.slice(1), 'index.html'));
  assert.match(document.querySelector('meta[name="robots"]').content, /\bnoindex\b/);
  if (path.includes('/teste-')) assert.equal(document.querySelector('link[rel="canonical"]').href, pageUrl('/produtos/refeicao-resolvida'));
}
for (const file of ['404.html', 'index.csr.html']) {
  const document = await htmlDocument(join(root, file));
  assert.match(document.querySelector('meta[name="robots"]').content, /\bnoindex\b/);
  assert.equal(document.querySelector('link[rel="canonical"]'), null);
}
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
assert.ok(robots.includes('Sitemap: ' + assetUrl('/sitemap.xml')));
assert.ok(!robots.includes('Disallow:'), 'Não bloquear a leitura de noindex/assets');
const legacy = JSON.parse(await readFile('content/editorial/legacy/index.json', 'utf8'));
const publicCatalog = JSON.parse(await readFile('public/content/editorial/recipes.json', 'utf8'));
for (const slug of legacy.recipes.filter(slug => !publicCatalog.recipes.some(recipe => recipe.slug === slug))) {
  await assert.rejects(access(join(root, 'comidinhas', slug, 'index.html')), 'Shell legado sem rota: ' + slug);
}

// Integração isolada: publicar/despublicar no build sem tocar em URLs reais.
const temporary = await mkdtemp(join(tmpdir(), 'bebel-seo-'));
try {
  const image = join(temporary, seo.image.slice(1));
  await mkdir(dirname(image), { recursive: true });
  await copyFile(join(root, seo.image.slice(1)), image);
  await copyFile(join(root, 'index.html'), join(temporary, 'index.html'));
  const base = await readFile(join(root, 'comidinhas/index.html'), 'utf8');
  const path = '/comidinhas/post-de-validacao';
  const directory = join(temporary, path.slice(1));
  const file = join(directory, 'index.html');
  await mkdir(directory, { recursive: true });
  const page = { path, title: 'Receita de validação', description: 'Conteúdo temporário de integração.', indexable: true };
  await writeFile(file, pageHtml(base, page));
  assert.ok((await generateSeoArtifacts(temporary)).includes(pageUrl(path)), 'Novo post não entrou automaticamente');
  await writeFile(file, pageHtml(base, { ...page, indexable: false }));
  assert.ok(!(await generateSeoArtifacts(temporary)).includes(pageUrl(path)), 'Rascunho/noindex entrou no sitemap');
  await writeFile(file, pageHtml(base, { ...page, canonical: '/destino-incorreto' }));
  await assert.rejects(discoverPages(temporary), /canonical deve corresponder/);
  await writeFile(file, pageHtml(base, page).replace(/<meta[^>]*name="description"[^>]*>/, ''));
  await assert.rejects(discoverPages(temporary), /descrição ausente/);
  await writeFile(file, pageHtml(base, page).replace('ng-server-context="ssg"', ''));
  await assert.rejects(discoverPages(temporary), /shell vazio/);
  await unlink(file);
  assert.ok(!(await generateSeoArtifacts(temporary)).includes(pageUrl(path)), 'Post removido permaneceu no sitemap');
} finally {
  const resolved = await realpath(temporary);
  assert.equal(dirname(resolved).toLowerCase(), (await realpath(tmpdir())).toLowerCase());
  assert.ok(basename(resolved).startsWith('bebel-seo-'));
  await rm(resolved, { recursive: true });
}
console.log(`SEO validado: ${urls.length} URLs, XML, robots, noindex, fallback e inclusão/remoção automática de post.`);
