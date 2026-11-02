import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parseHtml, pageUrl } from './seo-artifacts.mjs';

const root = process.argv[2] ?? 'dist/bebelzinha/browser';
const pages = [
  ['comidinhas', 'Receitas da Bebel'],
  ['cortadores', 'Tem carinho que vira'],
  ['wpp-bebelzinha', 'Achadinhos úteis para sua'],
];
for (const [route, heading] of pages) {
  const html = await readFile(join(root, route, 'index.html'), 'utf8');
  assert.match(html, /ng-server-context="ssg"/, route + ': HTML deve ser SSG');
  const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(match => match[1].replace(/<[^>]*>/g, '').replace(/\s+/g, ' '));
  assert.ok(headings.some(text => text.includes(heading)), route + ': heading ausente no conteúdo');
  assert.ok(html.includes('href="https://bebelzinha.com.br/'), route + ': canonical incorreto');
}
const channelHtml = await readFile(join(root, 'comidinhas/index.html'), 'utf8');
assert.ok(!channelHtml.includes('id="shorts-title"'), 'Biblioteca deve conter somente receitas');
assert.ok(!channelHtml.includes('https://www.youtube.com/shorts/'), 'Não listar Shorts no blog');
assert.ok(!channelHtml.includes('id="videos-title"'), 'Não deve haver listagem independente de longos');
const editorial = JSON.parse(await readFile(join(root, 'content/editorial/recipes.json'), 'utf8'));

const pageCount = Math.max(1, Math.ceil(editorial.recipes.length / 12));
const allRecipeLinks = [];
const sorted = [...editorial.recipes].sort((a,b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
for (let page = 1; page <= pageCount; page++) {
  const route = page === 1 ? '/comidinhas' : '/comidinhas/pagina/' + page;
  const html = await readFile(join(root, route.slice(1), 'index.html'), 'utf8');
  const document = parseHtml(html);
  assert.match(html, /ng-server-context="ssg"/);
  assert.equal(document.querySelector('link[rel="canonical"]').href, pageUrl(route));
  assert.match(document.querySelector('meta[name="robots"]').content, /^index,follow/);
  const links = [...document.querySelectorAll('.recipe-card')].map(link => link.getAttribute('href').replace(/\/$/, ''));
  assert.deepEqual(links, sorted.slice((page - 1)*12, page*12).map(recipe => '/comidinhas/' + recipe.slug));
  allRecipeLinks.push(...links);
  const hasLink = target => [...document.querySelectorAll('.library-pagination a')].some(link => link.getAttribute('href').replace(/\/$/, '') === target);
  if (page > 1) assert.ok(hasLink(page === 2 ? '/comidinhas' : '/comidinhas/pagina/' + (page - 1)), 'Link anterior ausente');
  if (page < pageCount) assert.ok(hasLink('/comidinhas/pagina/' + (page + 1)), 'Link seguinte ausente');
  for (const category of editorial.categories) {
    const hasRecipes = editorial.recipes.some(recipe => recipe.categoryIds.includes(category.id));
    assert.equal([...document.querySelectorAll('.recipe-filters a')].some(link => link.textContent.trim() === category.label), hasRecipes, 'Categoria vazia/ausente: ' + category.id);
  }
  assert.ok(!document.querySelector('app-onboarding'));
}
assert.equal(new Set(allRecipeLinks).size, editorial.recipes.length, 'Sequência precisa cobrir todas as receitas sem perdas');
const csr = await readFile(join(root, 'index.csr.html'), 'utf8');
assert.ok(!csr.includes('ng-server-context="ssg"'), 'Fallback não deve conter uma página SSG');
assert.equal(await readFile(join(root, '404.html'), 'utf8'), csr, 'Fallback CSR divergente');
assert.ok(csr.includes('noindex,follow'), 'Fallback deve ser noindex');
const personalShell = await readFile(join(root, 'jantar-resolvido/index.html'), 'utf8');
assert.ok(!personalShell.includes('Frango dourado com arroz de cenoura'), 'Conteúdo pago não pode estar no shell');
assert.ok(!personalShell.includes('ng-server-context="ssg"'), 'Área pessoal deve permanecer CSR');
console.log('SSG validado: 3 páginas públicas, catálogo no HTML, canonical e fallback CSR preservados.');
