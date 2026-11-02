import assert from 'node:assert/strict';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const text = value => typeof value === 'string' && value.trim().length > 0;
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const validSlug = value => typeof value === 'string' && slugPattern.test(value);
const unique = (items, label) => assert.equal(new Set(items).size, items.length, label + ': valores duplicados');
function validDate(value, now) {
  return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/.test(value)
    && Number.isFinite(Date.parse(value)) && new Date(value).toISOString() === value.replace('Z', '.000Z') && Date.parse(value) <= now;
}

export function compileEditorial(manifest, load, channel, assetExists, now = Date.now()) {
  assert.equal(manifest.schemaVersion, 1, 'Versão editorial inválida');
  assert.ok(Array.isArray(manifest.categories) && Array.isArray(manifest.recipes), 'Manifesto inválido');
  unique(manifest.categories.map(category => category.id), 'Categorias');
  for (const category of manifest.categories) assert.ok(validSlug(category.id) && text(category.label), 'Categoria inválida');
  const categories = new Set(manifest.categories.map(category => category.id));
  const longVideos = new Set(channel.videos.map(video => video.id));
  const records = manifest.recipes.map(entry => {
    assert.ok(validSlug(entry.id) && validSlug(entry.slug), 'ID/slug inválido');
    assert.ok(['draft', 'published', 'archived'].includes(entry.status), 'Status inválido');
    assert.equal(entry.file, `recipes/${entry.slug}.json`, 'Arquivo editorial fora do contrato');
    const recipe = load(entry.file);
    assert.equal(recipe.id, entry.id, 'ID divergente');
    assert.equal(recipe.slug, entry.slug, 'Slug divergente');
    assert.ok(text(recipe.title), entry.slug + ': título obrigatório');
    assert.ok(recipe.videoId === null || longVideos.has(recipe.videoId), entry.slug + ': vincular vídeo longo existente, não Short');
    assert.ok(!recipe.video || recipe.videoId !== null, entry.slug + ': metadados sem vídeo');
    assert.ok(Array.isArray(recipe.categoryIds) && recipe.categoryIds.length > 0 && recipe.categoryIds.every(id => categories.has(id)), entry.slug + ': categoria desconhecida');
    unique(recipe.categoryIds, 'Categorias da receita');
    return { entry, recipe };
  });
  unique(records.map(({ recipe }) => recipe.id), 'IDs');
  unique(records.map(({ recipe }) => recipe.slug), 'Slugs');
  unique(records.map(({ recipe }) => recipe.videoId).filter(id => id !== null), 'Vídeos longos');
  const recipes = [];
  for (const { entry, recipe } of records) {
    if (entry.status !== 'published') continue;
    const label = recipe.slug + ': ';
    assert.ok(recipe.review?.status === 'approved' && text(recipe.review.reviewer) && validDate(recipe.review.reviewedAt, now), label + 'revisão pendente');
    assert.ok(validDate(recipe.publishedAt, now) && validDate(recipe.updatedAt, now), label + 'datas inválidas/futuras');
    assert.ok(Date.parse(recipe.updatedAt) >= Date.parse(recipe.publishedAt) && Date.parse(recipe.updatedAt) >= Date.parse(recipe.review.reviewedAt), label + 'ordem de datas inválida');
    assert.ok(text(recipe.description) && text(recipe.intro), label + 'descrição/introdução ausente');
    assert.ok(text(recipe.seo?.title) && text(recipe.seo?.description), label + 'SEO ausente');
    assert.ok(/^images\/[a-zA-Z0-9/_-]+\.(webp|jpg|jpeg|png)$/.test(recipe.image?.src ?? '') && text(recipe.image?.alt) && assetExists(recipe.image.src), label + 'imagem ausente/inválida');
    const body = recipe.recipe;
    assert.ok(body && Number.isInteger(body.yield?.servings) && body.yield.servings > 0 && text(body.yield.unit), label + 'rendimento inválido');
    const times = body.times;
    assert.ok(times && ['prepMinutes', 'cookMinutes', 'totalMinutes'].every(key => times[key] === null || (Number.isInteger(times[key]) && times[key] >= 0))
      && (times.totalMinutes === null || (times.totalMinutes > 0 && times.totalMinutes >= (times.prepMinutes ?? 0) + (times.cookMinutes ?? 0))), label + 'tempos inválidos');
    if (times.totalMinutes === null) assert.ok(text(body.timeNote), label + 'explicar tempo não informado');
    assert.ok(Array.isArray(body.ingredients) && body.ingredients.length > 0, label + 'ingredientes ausentes');
    unique(body.ingredients.map(item => item.id), label + 'ingredientes');
    for (const item of body.ingredients) assert.ok(validSlug(item.id) && text(item.name) && text(item.unit)
      && ((Number.isFinite(item.quantity) && item.quantity > 0) || (item.quantity === null && item.unit === 'a gosto')), label + 'ingrediente/quantidade inválido');
    assert.ok(Array.isArray(body.steps) && body.steps.length > 0, label + 'preparo ausente');
    unique(body.steps.map(step => step.id), label + 'passos');
    for (const step of body.steps) assert.ok(validSlug(step.id) && text(step.text), label + 'passo inválido');
    assert.ok(Array.isArray(recipe.sources) && recipe.sources.length > 0, label + 'fontes obrigatórias');
    for (const source of recipe.sources) {
      assert.ok(text(source.title) && text(source.role) && new URL(source.url).protocol === 'https:', label + 'fonte inválida');
    }
    if (body.equipment) assert.ok(Array.isArray(body.equipment) && body.equipment.every(text), label + 'utensílios inválidos');
    if (body.tips) assert.ok(Array.isArray(body.tips) && body.tips.every(tip => text(tip.title) && text(tip.text)), label + 'dicas inválidas');
    if (recipe.video) {
      assert.ok(text(recipe.video.name) && text(recipe.video.description) && /^\d{4}-\d{2}-\d{2}$/.test(recipe.video.uploadDate) && new Date(recipe.video.uploadDate).toISOString().slice(0,10) === recipe.video.uploadDate && Date.parse(recipe.video.uploadDate) <= now && /^PT(?=\d)(?:\d+H)?(?:\d+M)?(?:\d+S)?$/.test(recipe.video.duration), label + 'metadados de vídeo inválidos');
    }
    if (body.storage) assert.ok(Array.isArray(body.storage) && body.storage.length > 0 && body.storage.every(item => text(item.title) && text(item.text)), label + 'conservação inválida');
    if (body.portions) {
      assert.ok(Array.isArray(body.portions) && body.portions.some(portion => portion.servings === body.yield.servings), label + 'porção base ausente');
      unique(body.portions.map(portion => portion.servings), label + 'porções');
      for (const portion of body.portions) {
        if (portion.equipment) assert.ok(Array.isArray(portion.equipment) && portion.equipment.length > 0 && portion.equipment.every(text), label + 'utensílios da porção inválidos');
        assert.ok(Number.isInteger(portion.servings) && portion.servings > 0 && text(portion.note), label + 'porção inválida');
        assert.ok(Array.isArray(portion.ingredientOverrides) && Array.isArray(portion.stepOverrides), label + 'ajustes inválidos');
        unique(portion.ingredientOverrides.map(item => item.id), label + 'ajustes de ingredientes');
        unique(portion.stepOverrides.map(step => step.id), label + 'ajustes de passos');
        for (const item of portion.ingredientOverrides) {
          const original = body.ingredients.find(original => original.id === item.id);
          assert.ok(original && ((Number.isFinite(item.quantity) && item.quantity > 0) || (item.quantity === null && (item.unit ?? original.unit) === 'a gosto')), label + 'ajuste de ingrediente inválido');
          if (item.unit !== undefined) assert.ok(text(item.unit), label + 'unidade inválida');
          if (item.note !== undefined) assert.ok(text(item.note), label + 'nota inválida');
        }
        for (const step of portion.stepOverrides) assert.ok(body.steps.some(original => original.id === step.id) && text(step.text), label + 'ajuste de passo inválido');
      }
    }
    const { id, slug, title, description, intro, categoryIds, videoId, image, publishedAt, updatedAt, seo } = recipe;
    // Lista explícita: notas internas, revisão e rascunhos nunca entram no pacote público.
    recipes.push({ id, slug, title, description, intro, categoryIds, videoId,
      image: { src: image.src, alt: image.alt }, publishedAt, updatedAt,
      ...(recipe.video ? { video: { name: recipe.video.name, description: recipe.video.description, uploadDate: recipe.video.uploadDate, duration: recipe.video.duration } } : {}),
      seo: { title: seo.title, description: seo.description },
      ...(recipe.sources ? { sources: recipe.sources.map(({ title, url, role }) => ({ title, url, role })) } : {}),
      recipe: {
        yield: { servings: body.yield.servings, unit: body.yield.unit },
        times: { prepMinutes: times.prepMinutes, cookMinutes: times.cookMinutes, totalMinutes: times.totalMinutes },
        ...(text(body.timeNote) ? { timeNote: body.timeNote } : {}),
        ...(text(body.sourceNote) ? { sourceNote: body.sourceNote } : {}),
        ...(body.equipment ? { equipment: [...body.equipment] } : {}),
        ...(body.tips ? { tips: body.tips.map(({ title, text }) => ({ title, text })) } : {}),
        ...(body.storage ? { storage: body.storage.map(({ title, text }) => ({ title, text })) } : {}),
        ...(body.portions ? { portions: body.portions.map(({ servings, note, equipment, ingredientOverrides, stepOverrides }) => ({ servings, note, ...(equipment ? { equipment: [...equipment] } : {}), ingredientOverrides: ingredientOverrides.map(({ id, quantity, unit, note }) => ({ id, quantity, ...(unit ? { unit } : {}), ...(note ? { note } : {}) })), stepOverrides: stepOverrides.map(({ id, text }) => ({ id, text })) })) } : {}),
        ingredients: body.ingredients.map(({ id, name, quantity, unit, note, section, shopping }) => ({ id, name, quantity, unit, ...(shopping === false ? { shopping: false } : {}), ...(text(note) ? { note } : {}), ...(text(section) ? { section } : {}) })),
        steps: body.steps.map(({ id, text: stepText, section }) => ({ id, text: stepText, ...(text(section) ? { section } : {}) })),
      },
    });
  }
  recipes.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
  return { schemaVersion: 1, categories: manifest.categories.map(({ id, label }) => ({ id, label })), recipes };
}

export function generateEditorial(root = process.cwd()) {
  const source = join(root, 'content/editorial');
  const json = file => JSON.parse(readFileSync(file, 'utf8'));
  const result = compileEditorial(json(join(source, 'index.json')), file => json(join(source, file)),
    json(join(root, 'public/content/canal/index.json')), file => existsSync(join(root, 'public', file)));
  const output = join(root, 'public/content/editorial/recipes.json');
  mkdirSync(dirname(output), { recursive: true });
  writeFileSync(output, JSON.stringify(result, null, 2) + '\n');
  console.log(`Editorial validado: ${result.recipes.length} receitas publicadas; rascunhos e arquivo legado não são distribuídos.`);
  return result;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) generateEditorial();
