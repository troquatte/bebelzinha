import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const distRoot = process.argv[2];
const siteBase = 'https://bebelzinha.com.br/';
const shareImage = `${siteBase}images/bebel/bebel-roxa.jpg`;

if (!distRoot) {
  throw new Error('Informe o diretório de saída do build.');
}

const baseHtml = await readFile(join(distRoot, 'index.html'), 'utf8');

function replaceMeta(html, selector, content) {
  const [attribute, value] = selector;
  const expression = new RegExp(
    `<meta([^>]*\\s${attribute}=["']${value}["'][^>]*)content=["'][^"']*["']([^>]*)>`,
    'i',
  );

  return html.replace(expression, `<meta$1content="${content}"$2>`);
}

function pageHtml({ title, description, url }) {
  let html = baseHtml.replace(/<title>.*?<\/title>/i, `<title>${title}</title>`);

  html = replaceMeta(html, ['name', 'description'], description);
  html = replaceMeta(html, ['property', 'og:title'], title);
  html = replaceMeta(html, ['property', 'og:description'], description);
  html = replaceMeta(html, ['property', 'og:url'], url);
  html = replaceMeta(html, ['property', 'og:image'], shareImage);
  html = replaceMeta(html, ['name', 'twitter:title'], title);
  html = replaceMeta(html, ['name', 'twitter:description'], description);
  html = replaceMeta(html, ['name', 'twitter:image'], shareImage);
  html = html.replace(
    /<link\s+rel=["']canonical["']\s+href=["'][^"']*["']\s*\/?>/i,
    `<link rel="canonical" href="${url}" />`,
  );

  return html;
}

async function writeRoute(route, seo) {
  const output = join(distRoot, route, 'index.html');
  await mkdir(join(distRoot, route), { recursive: true });
  await writeFile(output, pageHtml(seo));
}

await writeRoute('comidinhas', {
  title: 'Comidinhas da Bebel - Receitas simples para o dia a dia',
  description:
    'Receitas simples para almoço, jantar, lanche e doce. A Bebel ajuda você a escolher o que fazer e organizar a semana.',
  url: `${siteBase}comidinhas/`,
});

await writeRoute('compras', {
  title: 'Lista de compras da Bebel - Organize o mercado sem complicação',
  description:
    'Crie suas listas de compras, marque o que já foi para o carrinho e leve ingredientes das receitas da Bebel para o mercado.',
  url: `${siteBase}compras/`,
});

const manifest = JSON.parse(await readFile('public/content/recipes/index.json', 'utf8'));

for (const slug of manifest.recipes) {
  const recipe = JSON.parse(await readFile(`public/content/recipes/${slug}.json`, 'utf8'));

  await writeRoute(join('comidinhas', slug), {
    title: `${recipe.title} - Receita da Bebel`,
    description: recipe.description,
    url: `${siteBase}comidinhas/${slug}/`,
  });
}
