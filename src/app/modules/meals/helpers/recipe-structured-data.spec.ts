import { describe, expect, it } from 'vitest';
import { publishedRecipes } from './recipe-library';
import { recipeStructuredData } from './recipe-structured-data';

describe('recipeStructuredData: vídeo verificado', () => {
  const base = publishedRecipes[0];
  it('não inventa VideoObject quando metadados não foram conferidos', () => {
    const graph = recipeStructuredData({...base, video: undefined})['@graph'] as Array<Record<string, unknown>>;
    expect(graph.some(item => item['@type'] === 'VideoObject')).toBe(false);
    expect(graph.find(item => item['@type'] === 'Recipe')?.['video']).toBeUndefined();
  });
  it('usa a data do vídeo em vez da data da receita e vincula Recipe a VideoObject', () => {
    const recipe = {...base, videoId: 'LFaOXUy7nAQ', video: {name:'Vídeo da abobrinha',description:'Quatro metades recheadas',uploadDate:'2026-10-15',duration:'PT3M29S'}};
    const graph = recipeStructuredData(recipe, 4)['@graph'] as Array<Record<string, unknown>>;
    const video = graph.find(item => item['@type'] === 'VideoObject');
    expect(video?.['uploadDate']).toBe('2026-10-15');
    expect(video?.['duration']).toBe('PT3M29S');
    expect(video?.['embedUrl']).toBe('https://www.youtube-nocookie.com/embed/LFaOXUy7nAQ');
    expect(graph.find(item => item['@type'] === 'Recipe')?.['video']).toEqual({'@id':video?.['@id']});
    expect(graph.find(item => item['@type'] === 'Recipe')?.['recipeYield']).toBe('4 porções');
  });
});
