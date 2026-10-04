import { Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'bebel.meals.v1';

interface MealsState {
  savedRecipeIds: string[];
  weeklyRecipeIds: string[];
}

const EMPTY_STATE: MealsState = {
  savedRecipeIds: [],
  weeklyRecipeIds: [],
};

@Injectable({ providedIn: 'root' })
export class MealsStore {
  private readonly state = signal<MealsState>(this.load());

  readonly savedRecipeIds = () => this.state().savedRecipeIds;
  readonly weeklyRecipeIds = () => this.state().weeklyRecipeIds;

  isSaved(recipeId: string): boolean {
    return this.state().savedRecipeIds.includes(recipeId);
  }

  isInWeek(recipeId: string): boolean {
    return this.state().weeklyRecipeIds.includes(recipeId);
  }

  toggleSaved(recipeId: string): boolean {
    const savedRecipeIds = this.toggleId(this.state().savedRecipeIds, recipeId);
    this.commit({ ...this.state(), savedRecipeIds });
    return savedRecipeIds.includes(recipeId);
  }

  toggleWeek(recipeId: string): boolean {
    const weeklyRecipeIds = this.toggleId(this.state().weeklyRecipeIds, recipeId);
    this.commit({ ...this.state(), weeklyRecipeIds });
    return weeklyRecipeIds.includes(recipeId);
  }

  private toggleId(ids: string[], id: string): string[] {
    return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
  }

  private commit(state: MealsState): void {
    this.state.set(state);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  private load(): MealsState {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return EMPTY_STATE;
    }

    try {
      const parsed = JSON.parse(stored) as Partial<MealsState>;

      return {
        savedRecipeIds: Array.isArray(parsed.savedRecipeIds) ? parsed.savedRecipeIds : [],
        weeklyRecipeIds: Array.isArray(parsed.weeklyRecipeIds) ? parsed.weeklyRecipeIds : [],
      };
    } catch {
      return EMPTY_STATE;
    }
  }
}
