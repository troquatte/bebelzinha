import { describe, expect, it } from 'vitest';
import { publishedRecipes } from './recipe-library';
import { libraryPageParams, libraryPageWindow, libraryPath, queryRecipeLibrary } from './library-navigation';
const recipes = Array.from({length:25}, (_, i) => ({ ...publishedRecipes[0], id: 'teste-' + i, slug: 'teste-' + String(i + 1).padStart(2, '0'), title: i === 24 ? 'Macarrão ao limão' : 'Receita caseira ' + i, publishedAt: '2026-10-' + String(i + 1).padStart(2, '0') + 'T00:00:00Z', description: 'Comida de casa', categoryIds: i % 2 === 0 ? ['massas'] : ['doces'], recipe: { ...publishedRecipes[0].recipe, ingredients: [{ id: 'principal', name: i % 2 === 0 ? 'Limão' : 'Chocolate', quantity: 1, unit: 'unidade' }] } }));

describe('Navegação de biblioteca grande (fixtures, sem publicação)', () => {
  it('divide 25 receitas em 12/12/1, em ordem estável, sem perdas ou duplicação', () => {
    const pages = [1,2,3].map(page => queryRecipeLibrary(recipes, '', '', String(page)));
    expect(pages.map(page => page.items.length)).toEqual([12,12,1]);
    expect(pages[0].items[0].slug).toBe('teste-25');
    expect(new Set(pages.flatMap(page => page.items.map(recipe => recipe.id))).size).toBe(25);
    expect(recipes[0].slug).toBe('teste-01');
  });
  it('combina texto sem acento/caixa, ingrediente e categoria', () => {
    expect(queryRecipeLibrary(recipes, 'MACARRAO LIMAO', 'massas', null).items.map(recipe => recipe.slug)).toEqual(['teste-25']);
    expect(queryRecipeLibrary(recipes, 'limao', 'massas', null).total).toBe(13);
    expect(queryRecipeLibrary(recipes, 'limao', 'doces', null).total).toBe(0);
    expect(queryRecipeLibrary(recipes, '', 'inexistente', null).total).toBe(0);
  });
  it('trata catálogo vazio e rejeita páginas inválidas ou inexistentes', () => {
    expect(queryRecipeLibrary([], '', '', null)).toMatchObject({valid:true,total:0,page:1,pageCount:1,items:[]});
    for (const invalid of ['0','-1','01','1.5','abc','99999999999999999999','4']) expect(queryRecipeLibrary(recipes,'','',invalid).valid).toBe(false);
    expect(queryRecipeLibrary(recipes,'limao','doces','2').valid).toBe(false);
  });
  it('gera somente URLs SSG existentes e canonical da primeira página na raiz', () => {
    expect(libraryPageParams(0)).toEqual([]);
    expect(libraryPageParams(12)).toEqual([]);
    expect(libraryPageParams(13)).toEqual([{page:'2'}]);
    expect(libraryPageParams(25)).toEqual([{page:'2'},{page:'3'}]);
    expect(libraryPath(1)).toBe('/comidinhas/');
    expect(libraryPath(3)).toBe('/comidinhas/pagina/3/');
  });
  it('mantém primeira/última páginas acessíveis sem listar milhares de controles', () => {
    const window = libraryPageWindow(500, 1000);
    expect(window).toEqual([1,null,498,499,500,501,502,null,1000]);
    expect(libraryPageWindow(1,3)).toEqual([1,2,3]);
  });
});
