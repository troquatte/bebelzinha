export interface RecipeCategory {
  id: string;
  label: string;
}

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: number | null;
  unit: string;
  note?: string;
  section?: string;
  shopping?: boolean;
}

export interface RecipeStep {
  id: string;
  text: string;
  section?: string;
}

export interface RecipePortion {
  equipment?: string[];
  servings: number;
  note: string;
  ingredientOverrides: Array<{ id: string; quantity: number | null; unit?: string; note?: string }>;
  stepOverrides: Array<{ id: string; text: string }>;
}

export interface PublicRecipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  intro: string;
  categoryIds: string[];
  videoId: string;
  image: { src: string; alt: string };
  publishedAt: string;
  updatedAt: string;
  seo: { title: string; description: string };
  sources?: Array<{ title: string; url: string; role: string }>;
  recipe: {
    yield: { servings: number; unit: string };
    times: { prepMinutes: number | null; cookMinutes: number | null; totalMinutes: number | null };
    timeNote?: string;
    sourceNote?: string;
    equipment?: string[];
    tips?: Array<{ title: string; text: string }>;
    portions?: RecipePortion[];
    ingredients: RecipeIngredient[];
    steps: RecipeStep[];
  };
}

export interface PublicRecipeCatalog {
  schemaVersion: number;
  categories: RecipeCategory[];
  recipes: PublicRecipe[];
}
