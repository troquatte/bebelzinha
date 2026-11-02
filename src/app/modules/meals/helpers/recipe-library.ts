import content from '../../../../../public/content/editorial/recipes.json';
import { PublicRecipeCatalog } from '../interface/public-recipe.models';

const catalog: PublicRecipeCatalog = content;

export const publishedRecipes = catalog.recipes;
export const recipeBySlug = (slug: string) => publishedRecipes.find(recipe => recipe.slug === slug);
export const recipeForVideo = (videoId: string) => publishedRecipes.find(recipe => recipe.videoId === videoId);
export const recipesByCategory = (categoryId: string) => publishedRecipes.filter(recipe => recipe.categoryIds.includes(categoryId));
export const recipePath = (slug: string) => `/comidinhas/${slug}/`;
export const publishedRecipeParams = () => publishedRecipes.map(recipe => ({ slug: recipe.slug }));
export const publishedCategories = () => catalog.categories.filter(category => recipesByCategory(category.id).length > 0);
