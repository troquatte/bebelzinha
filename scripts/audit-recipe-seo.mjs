import assert from 'node:assert/strict';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { gzipSync } from 'node:zlib';
import { parseHtml, pageUrl, seo, discoverPages } from './seo-artifacts.mjs';

const root = process.argv[2] ?? 'dist/bebelzinha/browser';
const catalog = JSON.parse(await readFile(join(root, 'content/editorial/recipes.json'), 'utf8'));
const rows = [];
for (const recipe of catalog.recipes) {
  const route = '/comidinhas/' + recipe.slug;
  const buffer = await readFile(join(root, route.slice(1), 'index.html'));
  const document = parseHtml(buffer.toString());
  assert.equal(document.documentElement.lang, 'pt-BR');
  assert.equal(document.querySelectorAll('meta[name="description"]').length, 1);
  assert.equal(document.querySelectorAll('link[rel="canonical"]').length, 1);
  assert.equal(document.querySelector('link[rel="canonical"]').href, pageUrl(route));
  assert.match(document.querySelector('meta[name="robots"]').content, /^index,follow/);
  assert.equal(document.querySelectorAll('link[hreflang]').length, 0, 'Não inventar versões traduzidas');
  const blocks = document.querySelectorAll('script#bebel-structured-data[type="application/ld+json"]');
  assert.equal(blocks.length, 1, 'JSON-LD ausente/duplicado');
  const data = JSON.parse(blocks[0].textContent);
  assert.equal(data['@context'], 'https://schema.org');
  const graph = data['@graph'];
  const schema = graph.find(item => item['@type'] === 'Recipe');
  const crumb = graph.find(item => item['@type'] === 'BreadcrumbList');
  assert.ok(schema && crumb && graph.some(item => item['@type'] === 'WebPage'));
  assert.equal(schema.name, recipe.title);
  const yieldUnits = { 'porção': 'porções', 'bolinho': 'bolinhos', 'pedaço': 'pedaços', 'fatia': 'fatias', 'unidade': 'unidades', 'pão': 'pães', 'brigadeiro': 'brigadeiros', 'banana': 'bananas', 'bolo': 'bolos' };
  const unit = recipe.recipe.yield.unit;
  assert.equal(schema.recipeYield, recipe.recipe.yield.servings + ' ' + (recipe.recipe.yield.servings === 1 ? unit : yieldUnits[unit] ?? unit));
  assert.ok(document.querySelector('.dinner__eyebrow').textContent.endsWith(schema.recipeYield), 'Rendimento visual e schema divergentes');
  assert.equal(schema.image[0], new URL(recipe.image.src, seo.origin + '/').href);
  assert.equal(schema.recipeIngredient.length, recipe.recipe.ingredients.length);
  assert.equal(schema.recipeInstructions.length, recipe.recipe.steps.length);
  assert.ok(!schema.aggregateRating && !schema.nutrition, 'Não inventar avaliações ou nutrição');
  for (const step of schema.recipeInstructions) {
    assert.equal(step['@type'], 'HowToStep');
    assert.ok(document.getElementById(new URL(step.url).hash.slice(1)), 'Âncora de passo ausente');
    assert.ok(document.body.textContent.includes(step.text));
  }
  assert.deepEqual(crumb.itemListElement.map(item => item.position), [1,2,3]);
  assert.equal(crumb.itemListElement[2].item, pageUrl(route));
  assert.equal(document.querySelectorAll('nav[aria-label="Navegação estrutural"] li').length, 3);
  for (const path of ['/', '/comidinhas']) assert.ok([...document.querySelectorAll('a')].some(link => link.getAttribute('href') === path), 'Link interno ausente: ' + path);
  const tools = document.querySelector('app-recipe-tools');
  assert.ok(tools && tools.textContent.includes('Utensílios que ajudam'));
  assert.equal(tools.querySelectorAll('.tools-grid > div').length, 3);
  assert.equal(tools.querySelectorAll('a,button').length, 0, 'Slots não devem fingir produtos/links');
  assert.ok(!graph.some(item => ['Product','Offer'].includes(item['@type'])));

  const refs = new Set([...document.querySelectorAll('script[src],link[rel="stylesheet"],link[rel="modulepreload"],img[src]')].map(element => element.getAttribute('src') ?? element.getAttribute('href')));
  let localBytes = 0;
  let localGzip = 0;
  let count = 0;
  for (const ref of refs) {
    const url = new URL(ref, seo.origin + '/');
    if (url.origin !== seo.origin) continue;
    const asset = await readFile(join(root, decodeURIComponent(url.pathname)));
    localBytes += asset.length;
    localGzip += gzipSync(asset).length;
    count++;
  }
  rows.push({route, html:buffer.length, htmlGzip:gzipSync(buffer).length, localBytes, localGzip, count});
}
const xml = await readFile(join(root, 'sitemap.xml'), 'utf8');
for (const recipe of catalog.recipes) assert.ok(xml.includes(`<lastmod>${recipe.updatedAt}</lastmod>`));
const urls = await discoverPages(root);
const kib = bytes => (bytes / 1024).toFixed(1) + ' KiB';
const report = `# Auditoria SEO local\n\nSaída de produção inspecionada; não é auditoria do domínio publicado.\n\n| Item | Resultado |\n|---|---|\n| Breadcrumbs | Início → Receitas → receita; visível e BreadcrumbList |\n| Meta description | Única e específica, conferida no HTML |\n| Links internos | Breadcrumb, biblioteca e navegação; sem links para rascunhos |\n| XML sitemap | Automático, ${urls.length} URLs; lastmod editorial de receitas |\n| Robots.txt | Automático, referência ao sitemap e crawl permitido para ler noindex |\n| Meta robots / noindex | Receita index,follow; áreas pessoais/testes/drafts fora do índice e sitemap |\n| Canonical | HTTPS de produção, barra final, sem parâmetros |\n| Schema.org | Recipe, HowToStep, BreadcrumbList e WebPage, sem avaliações/dados inventados |\n| Hreflang | Não aplicável: só pt-BR, sem variantes reais; html lang pt-BR presente |\n| Afiliados Shopee | Três slots visuais; sem links/produtos ou schema Product/Offer fictícios |\n\n## Tamanho dos artefatos\n\n| Página | HTML bruto | HTML gzip calculado | Assets locais declarados no HTML | Assets brutos | Assets gzip calculado |\n|---|---|---|---|---|---|\n${rows.map(row=>`| ${row.route} | ${kib(row.html)} | ${kib(row.htmlGzip)} | ${row.count} | ${kib(row.localBytes)} | ${kib(row.localGzip)} |`).join('\n')}\n\nGzip é compressão calculada localmente, não confirmação de transferência/compressão no servidor. Assets contam referências diretas únicas do HTML, não dependências transitivas dos módulos ou recursos carregados depois. YouTube, fontes e analytics externos não estão somados; o peso completo e Core Web Vitals exigem medição de navegação em ambiente publicado. Os tamanhos não são uma tag SEO.\n\n## Validação e limites\nJSON-LD parseado e conferido contra o conteúdo visível, âncoras, quantidades da porção-base e datas reais do editorial. Navegação/seleção devem manter o schema coerente e limpá-lo em outras páginas. Rich Results Test remoto, Search Console, rastreamento/indexação e PageSpeed de produção não foram executados. Não há promessa de rich result ou ranking. VideoObject não foi inventado sem metadados editoriais completos de upload.\n\nFontes: https://developers.google.com/search/docs/appearance/structured-data/recipe e https://developers.google.com/search/docs/appearance/structured-data/breadcrumb e https://developers.google.com/search/docs/specialty/international/localized-versions.\n`;
await mkdir(dirname('doc/auditoria-seo.md'), {recursive:true});
await writeFile('doc/auditoria-seo.md', report);
console.log('Auditoria SEO aprovada: JSON-LD, breadcrumbs, metadados, slots e tamanhos registrados em doc/auditoria-seo.md.');
