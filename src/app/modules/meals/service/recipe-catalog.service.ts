import { Injectable, signal } from '@angular/core';

import { Recipe } from '../interface/meals.models';

interface RecipeManifest {
  recipes: string[];
}

@Injectable({ providedIn: 'root' })
export class RecipeCatalog {
  private readonly recipeState = signal<Recipe[]>([]);
  private readonly loadingState = signal(true);
  private readonly errorState = signal(false);

  readonly recipes = this.recipeState.asReadonly();
  readonly loading = this.loadingState.asReadonly();
  readonly error = this.errorState.asReadonly();

  constructor() {
    void this.load();
  }

  private async load(): Promise<void> {
    try {
      const manifestResponse = await fetch('content/recipes/index.json');

      if (!manifestResponse.ok) {
        throw new Error('Não foi possível carregar o catálogo de receitas.');
      }

      const manifest = (await manifestResponse.json()) as RecipeManifest;
      const recipes = await Promise.all(
        manifest.recipes.map(async (slug) => {
          const response = await fetch(`content/recipes/${slug}.json`);

          if (!response.ok) {
            throw new Error(`Não foi possível carregar a receita ${slug}.`);
          }

          return (await response.json()) as Recipe;
        }),
      );

      this.recipeState.set(recipes.filter((recipe) => recipe.active));
    } catch {
      this.errorState.set(true);
    } finally {
      this.loadingState.set(false);
    }
  }
}
