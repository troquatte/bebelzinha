export type MealType = 'almoco' | 'janta' | 'cafe-lanche' | 'doce';
export type RecipeTag = 'rapida' | 'barata' | 'rende-bem' | 'aproveitamento';
export type WeekDay = 'segunda' | 'terca' | 'quarta' | 'quinta' | 'sexta' | 'sabado' | 'domingo';

export const WEEK_DAYS: ReadonlyArray<{ id: WeekDay; label: string }> = [
  { id: 'segunda', label: 'Segunda' },
  { id: 'terca', label: 'Terça' },
  { id: 'quarta', label: 'Quarta' },
  { id: 'quinta', label: 'Quinta' },
  { id: 'sexta', label: 'Sexta' },
  { id: 'sabado', label: 'Sábado' },
  { id: 'domingo', label: 'Domingo' },
];

export interface RecipeIngredient {
  id: string;
  name: string;
  quantity: number | string;
  unit: string;
  note: string | null;
}

export interface RecipeStep {
  order: number;
  text: string;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  description: string;
  mealTypes: MealType[];
  tags: RecipeTag[];
  prepTimeMinutes: number;
  servings: number;
  image: string;
  intro: string;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  bebelTip: string | null;
  active: boolean;
}
