import { Injectable, inject } from '@angular/core';
import Swal from 'sweetalert2';

import { AnalyticsService } from '../../../core/analytics.service';
import { Recipe, WEEK_DAYS, WeekDay } from '../interface/meals.models';
import { MealsStore } from './meals.store';
import { RecipeCatalog } from './recipe-catalog.service';

@Injectable({ providedIn: 'root' })
export class WeekPlanningService {
  private readonly analytics = inject(AnalyticsService);
  private readonly catalog = inject(RecipeCatalog);
  private readonly store = inject(MealsStore);

  async chooseDay(recipe: Recipe): Promise<boolean> {
    const currentDay = this.store.dayForRecipe(recipe.id);
    const inputOptions = Object.fromEntries([
      ...WEEK_DAYS.map((day) => [day.id, day.label]),
      ...(currentDay ? [['__remove__', 'Tirar da minha semana']] : []),
    ]);

    const result = await Swal.fire<string>({
      title: currentDay ? 'Quer mudar o dia?' : 'Pra qual dia vai essa receita?',
      input: 'select',
      inputOptions,
      inputValue: currentDay ?? '',
      inputPlaceholder: 'Escolha um dia',
      showCancelButton: true,
      confirmButtonText: currentDay ? 'Salvar' : 'Colocar na semana',
      cancelButtonText: 'Agora não',
      confirmButtonColor: '#6f1fb4',
      inputValidator: (value) => (value ? null : 'Escolha um dia.'),
    });

    if (!result.isConfirmed || !result.value) {
      return false;
    }

    if (result.value === '__remove__' && currentDay) {
      this.removeDay(currentDay);
      return true;
    }

    return this.placeRecipe(recipe, result.value as WeekDay);
  }

  async chooseRecipeForDay(day: WeekDay): Promise<boolean> {
    const recipes = this.catalog.recipes();

    if (recipes.length === 0) {
      return false;
    }

    const currentRecipeId = this.store.weekPlan()[day];
    const inputOptions = Object.fromEntries([
      ...recipes.map((recipe) => [recipe.id, recipe.title]),
      ...(currentRecipeId ? [['__remove__', 'Deixar esse dia vazio']] : []),
    ]);

    const result = await Swal.fire<string>({
      title: `O que vai na ${this.dayLabel(day).toLowerCase()}?`,
      input: 'select',
      inputOptions,
      inputValue: currentRecipeId ?? '',
      inputPlaceholder: 'Escolha uma receita',
      showCancelButton: true,
      confirmButtonText: 'Salvar',
      cancelButtonText: 'Agora não',
      confirmButtonColor: '#6f1fb4',
      inputValidator: (value) => (value ? null : 'Escolha uma receita.'),
    });

    if (!result.isConfirmed || !result.value) {
      return false;
    }

    if (result.value === '__remove__') {
      this.removeDay(day);
      return true;
    }

    const recipe = recipes.find((item) => item.id === result.value);
    return recipe ? this.placeRecipe(recipe, day) : false;
  }

  removeDay(day: WeekDay): void {
    const recipeId = this.store.weekPlan()[day];

    if (!recipeId) {
      return;
    }

    this.store.removeWeekRecipe(day);
    this.analytics.track('PlanMeal', {
      action: 'remove',
      day,
      recipe_id: recipeId,
    });
  }

  dayLabelForRecipe(recipeId: string): string | null {
    const day = this.store.dayForRecipe(recipeId);
    return day ? this.dayLabel(day) : null;
  }

  private async placeRecipe(recipe: Recipe, day: WeekDay): Promise<boolean> {
    const currentDay = this.store.dayForRecipe(recipe.id);
    const targetRecipeId = this.store.weekPlan()[day];

    if (targetRecipeId && targetRecipeId !== recipe.id) {
      const targetRecipe = this.catalog.recipes().find((item) => item.id === targetRecipeId);
      const confirmation = await Swal.fire({
        icon: 'question',
        title: `Já tem comida na ${this.dayLabel(day).toLowerCase()}`,
        text: targetRecipe
          ? `“${targetRecipe.title}” está nesse dia. Quer trocar por “${recipe.title}”?`
          : 'Quer trocar a receita que já está nesse dia?',
        showCancelButton: true,
        confirmButtonText: 'Sim, trocar',
        cancelButtonText: 'Deixa como está',
        confirmButtonColor: '#6f1fb4',
      });

      if (!confirmation.isConfirmed) {
        return false;
      }
    }

    this.store.setWeekRecipe(day, recipe.id);
    this.analytics.track('PlanMeal', {
      action: currentDay && currentDay !== day ? 'move' : targetRecipeId ? 'replace' : 'add',
      day,
      recipe_id: recipe.id,
    });
    return true;
  }

  private dayLabel(day: WeekDay): string {
    return WEEK_DAYS.find((item) => item.id === day)?.label ?? day;
  }
}
