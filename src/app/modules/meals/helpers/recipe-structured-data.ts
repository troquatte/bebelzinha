import { recipeYieldLabel } from './recipe-yield';
import seo from '../../../core/seo.config.json';
import { PublicRecipe } from '../interface/public-recipe.models';

export function recipeStructuredData(recipe: PublicRecipe, servings = recipe.recipe.yield.servings): Record<string, unknown> {
  const url = new URL(`/comidinhas/${recipe.slug}/`, seo.origin).href;
  const portion = recipe.recipe.portions?.find(portion => portion.servings === servings);
  const ingredients = recipe.recipe.ingredients.map(item => ({ ...item, ...portion?.ingredientOverrides.find(override => override.id === item.id) }));
  const steps = recipe.recipe.steps.map(step => ({ ...step, ...portion?.stepOverrides.find(override => override.id === step.id) }));
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': url, url, name: recipe.title, inLanguage: 'pt-BR',
        mainEntity: { '@id': url + '#recipe' }, breadcrumb: { '@id': url + '#breadcrumb' },
        isPartOf: { '@type': 'WebSite', name: 'Bebel', url: seo.origin + '/' },
      },
      {
        '@type': 'BreadcrumbList', '@id': url + '#breadcrumb',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: seo.origin + '/' },
          { '@type': 'ListItem', position: 2, name: 'Receitas', item: seo.origin + '/comidinhas/' },
          { '@type': 'ListItem', position: 3, name: recipe.title, item: url },
        ],
      },
      {
        '@type': 'Recipe', '@id': url + '#recipe', url, mainEntityOfPage: { '@id': url },
        name: recipe.title, description: recipe.description, inLanguage: 'pt-BR',
        image: [new URL(recipe.image.src, seo.origin + '/').href],
        author: { '@type': 'Organization', name: 'Bebel', url: seo.origin + '/' },
        datePublished: recipe.publishedAt, dateModified: recipe.updatedAt,
        recipeYield: recipeYieldLabel(servings, recipe.recipe.yield.unit),
        ...(servings === recipe.recipe.yield.servings && recipe.recipe.times.totalMinutes
          ? { totalTime: `PT${recipe.recipe.times.totalMinutes}M` } : {}),
        ...(recipe.recipe.times.prepMinutes ? { prepTime: `PT${recipe.recipe.times.prepMinutes}M` } : {}),
        ...(recipe.recipe.times.cookMinutes ? { cookTime: `PT${recipe.recipe.times.cookMinutes}M` } : {}),
        recipeIngredient: ingredients.map(item => `${item.name} — ${item.quantity === null ? item.unit : item.quantity.toLocaleString('pt-BR') + ' ' + item.unit}${item.note ? ' (' + item.note + ')' : ''}`),
        recipeInstructions: steps.map((step, index) => ({ '@type': 'HowToStep', name: `Passo ${index + 1}`, text: step.text, url: url + '#passo-' + step.id })),
        citation: recipe.sources?.map(source => source.url) ?? [],
        ...(recipe.video && recipe.videoId ? { video: { '@id': url + '#video' } } : {}),
      },
      ...(recipe.video && recipe.videoId ? [{
        '@type': 'VideoObject', '@id': url + '#video',
        name: recipe.video.name, description: recipe.video.description,
        thumbnailUrl: [new URL(recipe.image.src, seo.origin + '/').href],
        uploadDate: recipe.video.uploadDate, duration: recipe.video.duration,
        embedUrl: 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(recipe.videoId),
        contentUrl: 'https://www.youtube.com/watch?v=' + encodeURIComponent(recipe.videoId),
      }] : []),
    ],
  };
}
