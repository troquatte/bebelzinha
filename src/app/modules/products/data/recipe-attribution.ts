import { recipeBySlug } from '../../meals/helpers/recipe-library';

/** Apenas slugs editoriais públicos; nunca encaminha texto livre ou códigos. */
export function publicRecipeSource(value: string | null): string | null {
  if (!value || value.length > 120 || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) return null;
  return recipeBySlug(value)?.slug ?? null;
}
