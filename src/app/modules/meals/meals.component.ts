import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MealType, Recipe } from './meals.models';
import { MealsStore } from './meals.store';
import { RecipeCatalog } from './recipe-catalog.service';

type GuideNeed = 'almoco' | 'janta' | 'cafe-lanche' | 'doce' | 'rapida' | 'barata';
type GuideStep = 'need' | 'time' | 'results';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-meals',
  styleUrl: './meals.component.scss',
  templateUrl: './meals.component.html',
})
export class MealsComponent {
  readonly catalog = inject(RecipeCatalog);
  readonly store = inject(MealsStore);

  readonly search = signal('');
  readonly mealFilter = signal<'all' | MealType>('all');
  readonly maxTime = signal(0);
  readonly tagFilter = signal<'all' | 'barata' | 'rende-bem'>('all');

  readonly guideStep = signal<GuideStep>('need');
  readonly guideNeed = signal<GuideNeed | null>(null);
  readonly guideTime = signal(0);
  readonly suggestionOffset = signal(0);

  readonly filteredRecipes = computed(() => {
    const query = this.normalize(this.search());
    const meal = this.mealFilter();
    const time = this.maxTime();
    const tag = this.tagFilter();

    return this.catalog.recipes().filter((recipe) => {
      const matchesText =
        !query ||
        this.normalize(recipe.title).includes(query) ||
        this.normalize(recipe.description).includes(query) ||
        recipe.ingredients.some((ingredient) => this.normalize(ingredient.name).includes(query));

      const matchesMeal = meal === 'all' || recipe.mealTypes.includes(meal);
      const matchesTime = !time || recipe.prepTimeMinutes <= time;
      const matchesTag = tag === 'all' || recipe.tags.includes(tag);

      return matchesText && matchesMeal && matchesTime && matchesTag;
    });
  });

  readonly guideSuggestions = computed(() => {
    const need = this.guideNeed();

    if (!need) {
      return [];
    }

    const time = this.guideTime();
    let matching = this.catalog.recipes().filter((recipe) => this.matchesNeed(recipe, need));

    if (time) {
      const withTime = matching.filter((recipe) => recipe.prepTimeMinutes <= time);
      if (withTime.length > 0) {
        matching = withTime;
      }
    }

    if (matching.length === 0) {
      matching = this.catalog.recipes();
    }

    const offset = matching.length ? this.suggestionOffset() % matching.length : 0;
    return [...matching.slice(offset), ...matching.slice(0, offset)].slice(0, 3);
  });

  readonly savedRecipes = computed(() => {
    const ids = this.store.savedRecipeIds();
    return this.catalog.recipes().filter((recipe) => ids.includes(recipe.id));
  });

  readonly weeklyRecipes = computed(() => {
    const ids = this.store.weeklyRecipeIds();
    return this.catalog.recipes().filter((recipe) => ids.includes(recipe.id));
  });

  updateSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  updateMealFilter(event: Event): void {
    this.mealFilter.set((event.target as HTMLSelectElement).value as 'all' | MealType);
  }

  updateTimeFilter(event: Event): void {
    this.maxTime.set(Number((event.target as HTMLSelectElement).value));
  }

  updateTagFilter(event: Event): void {
    this.tagFilter.set((event.target as HTMLSelectElement).value as 'all' | 'barata' | 'rende-bem');
  }

  chooseNeed(need: GuideNeed): void {
    this.guideNeed.set(need);
    this.guideTime.set(0);
    this.suggestionOffset.set(0);
    this.guideStep.set('time');
  }

  chooseTime(minutes: number): void {
    this.guideTime.set(minutes);
    this.suggestionOffset.set(0);
    this.guideStep.set('results');
  }

  otherSuggestions(): void {
    this.suggestionOffset.update((offset) => offset + 3);
  }

  restartGuide(): void {
    this.guideNeed.set(null);
    this.guideTime.set(0);
    this.suggestionOffset.set(0);
    this.guideStep.set('need');
  }

  toggleSaved(recipe: Recipe): void {
    this.store.toggleSaved(recipe.id);
  }

  toggleWeek(recipe: Recipe): void {
    this.store.toggleWeek(recipe.id);
  }

  isSaved(recipe: Recipe): boolean {
    return this.store.isSaved(recipe.id);
  }

  isInWeek(recipe: Recipe): boolean {
    return this.store.isInWeek(recipe.id);
  }

  private matchesNeed(recipe: Recipe, need: GuideNeed): boolean {
    if (need === 'rapida') {
      return recipe.prepTimeMinutes <= 30;
    }

    if (need === 'barata') {
      return recipe.tags.includes('barata');
    }

    return recipe.mealTypes.includes(need);
  }

  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}
