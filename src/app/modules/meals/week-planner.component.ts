import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { WEEK_DAYS, WeekDay } from './meals.models';
import { MealsStore } from './meals.store';
import { RecipeCatalog } from './recipe-catalog.service';
import { WeekPlanningService } from './week-planning.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-week-planner',
  styleUrl: './week-planner.component.scss',
  templateUrl: './week-planner.component.html',
})
export class WeekPlannerComponent {
  private readonly catalog = inject(RecipeCatalog);
  readonly planner = inject(WeekPlanningService);
  readonly store = inject(MealsStore);

  readonly slots = computed(() =>
    WEEK_DAYS.map((day) => ({
      ...day,
      recipe: this.catalog.recipes().find((recipe) => recipe.id === this.store.weekPlan()[day.id]) ?? null,
    })),
  );

  readonly plannedCount = computed(() => this.slots().filter((slot) => slot.recipe).length);

  chooseRecipe(day: WeekDay): void {
    void this.planner.chooseRecipeForDay(day);
  }

  moveRecipe(recipeId: string): void {
    const recipe = this.catalog.recipes().find((item) => item.id === recipeId);

    if (recipe) {
      void this.planner.chooseDay(recipe);
    }
  }

  removeRecipe(day: WeekDay): void {
    this.planner.removeDay(day);
  }
}
