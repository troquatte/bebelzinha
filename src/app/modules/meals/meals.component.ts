import { ChangeDetectionStrategy, Component, HostListener, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../core/seo.service';
import { MealType, Recipe, RecipeTag } from './meals.models';
import { MealsStore } from './meals.store';
import { RecipeCatalog } from './recipe-catalog.service';

type GuideNeed = 'almoco' | 'janta' | 'cafe-lanche' | 'doce' | 'rapida' | 'barata';
type GuideStep = 'need' | 'time' | 'results';
type RecipeTagFilter = Extract<RecipeTag, 'rapida' | 'barata' | 'rende-bem'>;

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-meals',
  styleUrl: './meals.component.scss',
  templateUrl: './meals.component.html',
})
export class MealsComponent {
  private readonly seo = inject(SeoService);

  readonly catalog = inject(RecipeCatalog);
  readonly store = inject(MealsStore);

  readonly search = signal('');
  readonly mealFilter = signal<'all' | MealType>('all');
  readonly maxTime = signal(0);
  readonly tagFilter = signal<'all' | RecipeTagFilter>('all');
  readonly visibleCount = signal(10);

  readonly guideStep = signal<GuideStep>('need');
  readonly guideNeed = signal<GuideNeed | null>(null);
  readonly guideTime = signal(0);

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

  readonly visibleRecipes = computed(() => this.filteredRecipes().slice(0, this.visibleCount()));
  readonly hasMoreRecipes = computed(() => this.visibleCount() < this.filteredRecipes().length);
  readonly hasActiveFilters = computed(
    () =>
      this.search().trim().length > 0 ||
      this.mealFilter() !== 'all' ||
      this.maxTime() > 0 ||
      this.tagFilter() !== 'all',
  );

  readonly savedRecipes = computed(() => {
    const ids = this.store.savedRecipeIds();
    return this.catalog.recipes().filter((recipe) => ids.includes(recipe.id));
  });

  readonly weeklyRecipes = computed(() => {
    const ids = this.store.weeklyRecipeIds();
    return this.catalog.recipes().filter((recipe) => ids.includes(recipe.id));
  });

  constructor() {
    this.seo.update({
      title: 'Comidinhas da Bebel - Receitas simples para o dia a dia',
      description:
        'Receitas simples para almoço, jantar, lanche e doce. A Bebel ajuda você a escolher o que fazer e organizar a semana.',
      path: '/comidinhas',
    });
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (!this.hasMoreRecipes()) {
      return;
    }

    const documentHeight = document.documentElement.scrollHeight;
    const currentPosition = window.innerHeight + window.scrollY;

    if (currentPosition >= documentHeight - 520) {
      this.visibleCount.update((count) => Math.min(count + 10, this.filteredRecipes().length));
    }
  }

  updateSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
    this.resetPagination();
  }

  selectMealFilter(meal: MealType): void {
    this.mealFilter.update((current) => (current === meal ? 'all' : meal));
    this.resetPagination();
  }

  selectTimeFilter(minutes: number): void {
    this.maxTime.update((current) => (current === minutes ? 0 : minutes));
    this.resetPagination();
  }

  selectTagFilter(tag: RecipeTagFilter): void {
    this.tagFilter.update((current) => (current === tag ? 'all' : tag));
    this.resetPagination();
  }

  chooseNeed(need: GuideNeed): void {
    this.clearFilters(false);
    this.guideNeed.set(need);
    this.guideTime.set(0);

    if (need === 'rapida' || need === 'barata') {
      this.tagFilter.set(need);
    } else {
      this.mealFilter.set(need);
    }

    this.guideStep.set('time');
    this.resetPagination();
  }

  chooseTime(minutes: number): void {
    this.guideTime.set(minutes);
    this.maxTime.set(minutes);
    this.guideStep.set('results');
    this.resetPagination();
  }

  showAllRecipes(): void {
    this.clearFilters(true);
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

  private clearFilters(resetGuide: boolean): void {
    this.search.set('');
    this.mealFilter.set('all');
    this.maxTime.set(0);
    this.tagFilter.set('all');

    if (resetGuide) {
      this.guideNeed.set(null);
      this.guideTime.set(0);
      this.guideStep.set('need');
    }

    this.resetPagination();
  }

  private resetPagination(): void {
    this.visibleCount.set(10);
  }

  private normalize(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}
