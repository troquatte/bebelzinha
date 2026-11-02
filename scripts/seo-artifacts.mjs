import assert from 'node:assert/strict';
import { readFile, readdir, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM, VirtualConsole } from 'jsdom';

export function parseHtml(html) {
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', error => {
    // O parser de CSS não cobre todo o CSS moderno; SEO inspeciona somente HTML.
    if (error.type !== 'css-parsing') throw error;
  });
  return new JSDOM(html, { virtualConsole }).window.document;
}

export const seo = JSON.parse(await readFile(new URL('../src/app/core/seo.config.json', import.meta.url), 'utf8'));
export const assetUrl = path => new URL(path, seo.origin).href;
export const pageUrl = path => assetUrl(path === '/' ? '/' : path.replace(/\/+$/, '') + '/');
export const isPrivate = path => seo.privatePaths.some(prefix => path === prefix || path.startsWith(prefix + '/'));
export const robotsContent = indexable => `${indexable ? 'index' : 'noindex'},follow,max-image-preview:large`;

export function pageHtml(base, page) {
  const document = parseHtml(base);
  document.title = page.title;
  const canonical = page.path === null ? assetUrl('/404.html') : pageUrl(page.canonical ?? page.path);
  const image = assetUrl(seo.image);
  const metas = [
    ['name', 'description', page.description],
    ['name', 'robots', robotsContent(page.indexable && !isPrivate(page.path))],
    ['property', 'og:title', page.title],
    ['property', 'og:description', page.description],
    ['property', 'og:url', canonical],
    ['property', 'og:image', image],
    ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description],
    ['name', 'twitter:image', image],
  ];
  for (const [attribute, key, content] of metas) {
    let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.append(element);
    }
    element.setAttribute('content', content);
  }
  document.head.querySelectorAll('link[rel="canonical"]').forEach(element => element.remove());
  if (page.path !== null) {
    const link = document.createElement('link');
    link.rel = 'canonical';
    link.href = canonical;
    document.head.append(link);
  }
  // Preservar corpo e dados de hidratação exatamente como saíram do Angular.
  return base.replace(/<head>[\s\S]*?<\/head>/i, document.head.outerHTML);
}

async function htmlFiles(root) {
  const files = [];
  async function walk(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const file = join(directory, entry.name);
      if (entry.isDirectory()) await walk(file);
      else if (entry.name === 'index.html') files.push(file);
    }
  }
  await walk(root);
  return files.sort();
}

export async function discoverPages(root) {
  const urls = new Set();
  const knownShells = new Set(seo.shells.filter(page => page.indexable).map(page => page.path));
  for (const file of await htmlFiles(root)) {
    const route = '/' + relative(root, file).split(sep).slice(0, -1).join('/');
    const html = await readFile(file, 'utf8');
    const document = parseHtml(html);
    const robots = document.head.querySelector('meta[name="robots"]')?.content ?? '';
    if (/\b(noindex|none)\b/i.test(robots) || isPrivate(route)) continue;
    assert.match(robots, /\bindex\b/, `${route}: definir política de indexação explícita`);
    assert.ok(knownShells.has(route) || /ng-server-context="ssg"/.test(html), `${route}: shell vazio não pode entrar no sitemap`);
    if (!knownShells.has(route)) assert.ok(document.querySelector('app-root h1')?.textContent.trim(), `${route}: conteúdo SSG ausente`);
    const links = document.head.querySelectorAll('link[rel="canonical"]');
    assert.equal(links.length, 1, `${route}: definir um único canonical`);
    assert.equal(links[0].getAttribute('href'), pageUrl(route), `${route}: canonical deve corresponder à URL pública, sem query e com barra final`);
    assert.ok(document.title.trim(), `${route}: título ausente`);
    const description = document.head.querySelector('meta[name="description"]')?.content;
    assert.ok(description?.trim(), `${route}: descrição ausente`);
    for (const [selector, expected] of [
      ['meta[property="og:title"]', document.title],
      ['meta[property="og:description"]', description],
      ['meta[property="og:url"]', pageUrl(route)],
      ['meta[name="twitter:title"]', document.title],
      ['meta[name="twitter:description"]', description],
    ]) assert.equal(document.head.querySelector(selector)?.content, expected, `${route}: ${selector} divergente`);
    for (const selector of ['meta[property="og:image"]', 'meta[name="twitter:image"]']) {
      const value = document.head.querySelector(selector)?.content;
      const image = new URL(value ?? '', seo.origin);
      assert.equal(image.origin, seo.origin, `${route}: imagem fora da origem`);
      assert.ok(value?.startsWith(seo.origin + '/'), `${route}: imagem deve ser absoluta`);
      await readFile(join(root, decodeURIComponent(image.pathname)));
    }
    assert.ok(!urls.has(pageUrl(route)), `${route}: canonical duplicado`);
    urls.add(pageUrl(route));
  }
  assert.ok(urls.size > 0 && urls.size <= 50000, 'Sitemap vazio ou acima do limite de 50 mil URLs');
  return [...urls].sort();
}

const escapeXml = text => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&apos;');

export async function generateSeoArtifacts(root) {
  const urls = await discoverPages(root);
  let recipes = [];
  try { recipes = JSON.parse(await readFile(join(root, 'content/editorial/recipes.json'), 'utf8')).recipes; }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
  const modified = new Map(recipes.map(recipe => [pageUrl('/comidinhas/' + recipe.slug), recipe.updatedAt]));
  const xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
    + urls.map(url => `  <url><loc>${escapeXml(url)}</loc>${modified.has(url) ? '<lastmod>' + escapeXml(modified.get(url)) + '</lastmod>' : ''}</url>`).join('\n') + '\n</urlset>\n';
  await writeFile(join(root, 'sitemap.xml'), xml);
  // Permitir crawl inclusive de noindex: o robô precisa ler a diretiva no HTML.
  await writeFile(join(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${assetUrl('/sitemap.xml')}\n`);
  console.log(`SEO gerado: sitemap com ${urls.length} URLs públicas e robots.txt.`);
  return urls;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  await generateSeoArtifacts(process.argv[2] ?? 'dist/bebelzinha/browser');
}
