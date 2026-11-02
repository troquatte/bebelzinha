import { PublicRecipe } from '../interface/public-recipe.models';

export const RECIPE_PAGE_SIZE = 12;
export const libraryPath = (page: number) => page === 1 ? '/comidinhas/' : '/comidinhas/pagina/' + page + '/';
export const normalizeRecipeSearch = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR').trim();
export const libraryPageParams = (count: number) => Array.from({ length: Math.max(0, Math.ceil(count / RECIPE_PAGE_SIZE) - 1) }, (_, i) => ({ page: String(i + 2) }));

export function queryRecipeLibrary(recipes: readonly PublicRecipe[], search: string, category: string, rawPage: string | null) {
  const tokens = normalizeRecipeSearch(search).split(/\s+/).filter(Boolean);
  const matches = recipes.filter(recipe => {
    if (category && !recipe.categoryIds.includes(category)) return false;
    const haystack = normalizeRecipeSearch([recipe.title, recipe.description, ...recipe.recipe.ingredients.map(item => item.name)].join(' '));
    return tokens.every(token => haystack.includes(token));
  }).sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug));
  const page = rawPage === null ? 1 : /^[1-9]\d*$/.test(rawPage) ? Number(rawPage) : NaN;
  const pageCount = Math.max(1, Math.ceil(matches.length / RECIPE_PAGE_SIZE));
  const valid = Number.isSafeInteger(page) && page <= pageCount;
  return { page, pageCount, valid, total: matches.length, items: valid ? matches.slice((page - 1) * RECIPE_PAGE_SIZE, page * RECIPE_PAGE_SIZE) : [] };
}

export function libraryPageWindow(page: number, pageCount: number): Array<number | null> {
  const numbers = [...new Set([1, pageCount, page - 2, page - 1, page, page + 1, page + 2])].filter(n => n >= 1 && n <= pageCount).sort((a, b) => a - b);
  const result: Array<number | null> = [];
  for (const number of numbers) {
    const previous = result.at(-1);
    if (typeof previous === 'number' && number - previous > 1) result.push(null);
    result.push(number);
  }
  return result;
}
