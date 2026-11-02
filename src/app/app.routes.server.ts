import { libraryPageParams } from './modules/meals/helpers/library-navigation';
import { publishedRecipes, publishedRecipeParams } from './modules/meals/helpers/recipe-library';
import { PrerenderFallback, RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: 'comidinhas', renderMode: RenderMode.Prerender },
  { path: 'comidinhas/pagina/:page', renderMode: RenderMode.Prerender, fallback: PrerenderFallback.Client, getPrerenderParams: async () => libraryPageParams(publishedRecipes.length) },
  { path: 'comidinhas/:slug', renderMode: RenderMode.Prerender, fallback: PrerenderFallback.Client, getPrerenderParams: async () => publishedRecipeParams() },
  { path: 'cortadores', renderMode: RenderMode.Prerender },
  { path: 'wpp-bebelzinha', renderMode: RenderMode.Prerender },
  // Compras, acesso e experimentos de venda dependem do navegador.
  { path: '**', renderMode: RenderMode.Client },
];
