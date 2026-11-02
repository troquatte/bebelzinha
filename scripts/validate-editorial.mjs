import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { compileEditorial } from './compile-editorial.mjs';
import { pageUrl, parseHtml } from './seo-artifacts.mjs';

const json = async file => JSON.parse(await readFile(file, 'utf8'));
const manifest = await json('content/editorial/index.json');
const channel = await json('public/content/canal/index.json');
const sources = Object.fromEntries(await Promise.all(manifest.recipes.map(async entry => [entry.file, await json(join('content/editorial', entry.file))])));
const root = process.argv[2] ?? 'dist/bebelzinha/browser';
const catalog = await json(join(root, 'content/editorial/recipes.json'));
assert.deepEqual(catalog, await json('public/content/editorial/recipes.json'));
assert.deepEqual(catalog.recipes.map(recipe => recipe.slug).sort(), manifest.recipes.filter(entry => entry.status === 'published').map(entry => entry.slug).sort());
await assert.rejects(access(join(root, 'content/editorial/legacy')), 'Legado não pode estar no site');
await assert.rejects(access(join(root, 'content/recipes')), 'Fonte legada não pode estar no site');
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
for (const entry of manifest.recipes) {
  const file = join(root, 'comidinhas', entry.slug, 'index.html');
  if (entry.status !== 'published') {
    await assert.rejects(access(file), 'Rascunho/arquivado ganhou página pública');
    assert.ok(!sitemap.includes(pageUrl('/comidinhas/' + entry.slug)));
    continue;
  }
  const recipe = sources[entry.file];
  const html = await readFile(file, 'utf8');
  assert.match(html, /ng-server-context="ssg"/, 'Receita publicada precisa de página SSG real');
  const document = parseHtml(html);
  assert.equal(document.title, recipe.seo.title);
  assert.equal(document.querySelector('meta[name="description"]')?.content, recipe.seo.description);
  assert.ok(document.querySelector('h1')?.textContent.includes(recipe.title));
  assert.ok(html.includes(recipe.videoId), 'Vídeo da publicação ausente');
  assert.equal(document.querySelectorAll('.dinner__steps input[type="checkbox"]').length, recipe.recipe.steps.length, 'Checklist de preparo incompleto');
  assert.equal(document.querySelectorAll('[role="switch"]').length, recipe.recipe.ingredients.filter(item => item.shopping !== false).length, 'Compras incompletas');
  assert.ok(document.querySelector('.dinner__recipe #recipe-title'), 'Título precisa estar dentro do card da receita');
  assert.ok(document.querySelector('.dinner__shopping app-shopping-checklist'), 'Usar checklist do produto');
  assert.ok(!document.body.textContent.includes('Adicionar faltantes à lista de compras'), 'Ação removida não deve aparecer');
  assert.ok(!document.body.textContent.includes('Abrir lista de compras →'), 'Link removido não deve aparecer');
  if (recipe.recipe.sourceNote) assert.ok(!document.body.textContent.includes(recipe.recipe.sourceNote), 'Parágrafo removido não deve aparecer');
  assert.equal(document.querySelectorAll('input[type="checkbox"][checked], [role="switch"][aria-checked="true"]').length, 0, 'HTML não pode distribuir marcações pessoais');
  assert.equal(document.querySelectorAll('iframe').length, 0, 'Não carregar YouTube antes do clique');
  assert.ok(document.querySelector('.recipe-public__media button.recipe-public__play img'), 'Capa/play devem ocupar o topo do card');
  assert.ok(!document.querySelector('details#video'), 'Remover seção duplicada de vídeo');
  for (const item of recipe.recipe.ingredients) assert.ok(document.body.textContent.includes(item.name), 'Ingrediente ausente: ' + item.id);
  for (const step of recipe.recipe.steps) assert.ok(document.body.textContent.includes(step.text), 'Passo ausente: ' + step.id);
  for (const source of recipe.sources ?? []) assert.ok([...document.querySelectorAll('a')].some(link => link.href === source.url), 'Fonte não exibida');
  for (const item of recipe.recipe.equipment ?? []) assert.ok(document.body.textContent.includes(item), 'Utensílio ausente');
  for (const tip of recipe.recipe.tips ?? []) assert.ok(document.body.textContent.includes(tip.text), 'Orientação ausente');
  assert.ok(sitemap.includes(pageUrl('/comidinhas/' + entry.slug)), 'Receita publicada fora do sitemap');
}

// Teste de transições em memória. Não publica receita nem altera fontes reais.
const fixtureManifest = {schemaVersion:1,categories:[{id:'testes',label:'Teste'}],recipes:[{id:'teste',slug:'teste',file:'recipes/teste.json',status:'draft'}]};
const fixtureRecipe = {id:'teste',slug:'teste',title:'Receita de integração',videoId:channel.videos[0].id,categoryIds:['testes'],description:'Teste',intro:'Teste',image:{src:'images/teste.webp',alt:'Teste'},publishedAt:'2026-01-01T12:00:00Z',updatedAt:'2026-01-01T12:00:00Z',seo:{title:'Teste SEO',description:'Descrição SEO'},review:{status:'approved',reviewer:'Integração em memória',reviewedAt:'2026-01-01T12:00:00Z'},editorialNotes:['Não distribuir'],sources:[{title:'Fonte de teste',role:'Integração em memória',url:'https://example.com/receita'}],recipe:{yield:{servings:1,unit:'porção'},times:{prepMinutes:1,cookMinutes:1,totalMinutes:2},ingredients:[{id:'teste',name:'Ingrediente de teste',quantity:1,unit:'unidade'}],steps:[{id:'teste',text:'Passo de teste'}]}};
function run(status, mutateRecipe = () => {}, mutateManifest = () => {}) {
  const recipe = structuredClone(fixtureRecipe);
  const data = structuredClone(fixtureManifest);
  data.recipes[0].status = status;
  mutateRecipe(recipe);
  mutateManifest(data);
  return compileEditorial(data, () => recipe, channel, () => true);
}
assert.equal(run('draft', recipe => { recipe.recipe = null; }).recipes.length, 0);
assert.equal(run('published').recipes.length, 1);
assert.equal(run('published', recipe => { recipe.recipe.times = {prepMinutes:null,cookMinutes:null,totalMinutes:null}; recipe.recipe.timeNote = 'Siga a embalagem'; }).recipes.length, 1);
assert.throws(() => run('published', recipe => { recipe.recipe.times.totalMinutes = null; }), /explicar tempo/);
assert.equal(run('archived').recipes.length, 0);
assert.ok(!JSON.stringify(run('published')).includes('Não distribuir'));
for (const [mutate, message] of [
  [recipe => { recipe.review.status = 'pending'; }, /revisão pendente/],
  [recipe => { recipe.videoId = channel.shorts[0].id; }, /vídeo longo/],
  [recipe => { recipe.videoId = 'inexistente'; }, /vídeo longo/],
  [recipe => { recipe.recipe.ingredients[0].quantity = 0; }, /quantidade inválido/],
  [recipe => { recipe.updatedAt = '2099-01-01T12:00:00Z'; }, /datas inválidas/],
  [recipe => { recipe.seo = null; }, /SEO ausente/],
  [recipe => { recipe.recipe.steps.push(recipe.recipe.steps[0]); }, /duplicados/],
  [recipe => { recipe.categoryIds = ['inexistente']; }, /categoria desconhecida/],
  [recipe => { delete recipe.recipe.ingredients[0].id; }, /ingrediente/],
]) assert.throws(() => run('published', mutate), message);
assert.throws(() => run('draft', () => {}, data => { data.recipes.push(data.recipes[0]); }), /duplicados/);
assert.throws(() => run('draft', () => {}, data => { data.recipes[0].file = '../produto-pago.json'; }), /fora do contrato/);
console.log(`Editorial validado: ${manifest.recipes.length} fontes, ${catalog.recipes.length} publicadas; transições, exclusões e cobertura SSG/sitemap aprovadas.`);

const portionFixture = recipe => { recipe.recipe.portions = [{ servings:1, note:'Base de teste', ingredientOverrides:[], stepOverrides:[] }]; };
assert.equal(run('published', portionFixture).recipes[0].recipe.portions.length, 1);
assert.deepEqual(run('published', recipe => { portionFixture(recipe); recipe.recipe.portions[0].equipment = ['Panela de teste']; }).recipes[0].recipe.portions[0].equipment, ['Panela de teste']);
assert.throws(() => run('published', recipe => { portionFixture(recipe); recipe.recipe.portions[0].equipment = ['']; }), /utensílios da porção/);
assert.throws(() => run('published', recipe => { portionFixture(recipe); recipe.recipe.portions.push(recipe.recipe.portions[0]); }), /duplicados/);
assert.throws(() => run('published', recipe => { portionFixture(recipe); recipe.recipe.portions[0].ingredientOverrides = [{id:'inexistente',quantity:2}]; }), /ajuste de ingrediente/);
assert.throws(() => run('published', recipe => { portionFixture(recipe); recipe.recipe.portions[0].stepOverrides = [{id:'inexistente',text:'Inválido'}]; }), /ajuste de passo/);
assert.throws(() => run('published', recipe => { recipe.sources = [{title:'Fonte',role:'Teste',url:'javascript:alert(1)'}]; }), /fonte inválida/);
const lemon = catalog.recipes.find(recipe => recipe.slug === 'macarrao-ao-limao-sem-creme-de-leite');
if (lemon) {
  assert.deepEqual(lemon.recipe.portions.map(portion => portion.servings), [2,4]);
  for (const count of [2,4]) {
    const portion = lemon.recipe.portions.find(portion => portion.servings === count);
    assert.equal(portion.ingredientOverrides.find(item => item.id === 'espaguete').quantity, count * 100);
    assert.equal(portion.ingredientOverrides.find(item => item.id === 'agua').quantity, count === 2 ? 2 : 4);
    assert.ok(portion.stepOverrides.find(step => step.id === 'preparar').text.includes(count + ' colheres (chá)'));
  }
  assert.equal(lemon.sources.length, 3);
}
console.log('Complementos validados: fontes HTTPS, variantes e preparo coerentes.');

assert.throws(() => run('published', recipe => { recipe.sources = []; }), /fontes obrigatórias/);
