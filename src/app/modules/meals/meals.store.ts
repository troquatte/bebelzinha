import { Injectable, signal } from '@angular/core';

import { WEEK_DAYS, WeekDay } from './meals.models';

const STORAGE_KEY = 'bebel.meals.v1';

type WeekPlan = Record<WeekDay, string | null>;

interface MealsState {
  savedRecipeIds: string[];
  weekPlan: WeekPlan;
}

const emptyWeekPlan = (): WeekPlan => ({
  segunda: null,
  terca: null,
  quarta: null,
  quinta: null,
  sexta: null,
  sabado: null,
  domingo: null,
});

const EMPTY_STATE: MealsState = {
  savedRecipeIds: [],
  weekPlan: emptyWeekPlan(),
};

@Injectable({ providedIn: 'root' })
export class MealsStore {
  private readonly state = signal<MealsState>(this.load());

  readonly savedRecipeIds = () => this.state().savedRecipeIds;
  readonly weekPlan = () => this.state().weekPlan;
  readonly weeklyRecipeIds = () =>
    Array.from(
      new Set(
        Object.values(this.state().weekPlan).filter((id): id is string => Boolean(id)),
      ),
    );

  isSaved(recipeId: string): boolean {
    return this.state().savedRecipeIds.includes(recipeId);
  }

  isInWeek(recipeId: string): boolean {
    return this.weeklyRecipeIds().includes(recipeId);
  }

  dayForRecipe(recipeId: string): WeekDay | null {
    return WEEK_DAYS.find(({ id }) => this.state().weekPlan[id] === recipeId)?.id ?? null;
  }

  toggleSaved(recipeId: string): boolean {
    const savedRecipeIds = this.toggleId(this.state().savedRecipeIds, recipeId);
    this.commit({ ...this.state(), savedRecipeIds });
    return savedRecipeIds.includes(recipeId);
  }

  setWeekRecipe(day: WeekDay, recipeId: string): void {
    const weekPlan = { ...this.state().weekPlan };

    for (const currentDay of WEEK_DAYS) {
      if (weekPlan[currentDay.id] === recipeId) {
        weekPlan[currentDay.id] = null;
      }
    }

    weekPlan[day] = recipeId;
    this.commit({ ...this.state(), weekPlan });
  }

  removeWeekRecipe(day: WeekDay): void {
    this.commit({
      ...this.state(),
      weekPlan: {
        ...this.state().weekPlan,
        [day]: null,
      },
    });
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
      const parsed = JSON.parse(stored) as {
        savedRecipeIds?: unknown;
        weeklyRecipeIds?: unknown;
        weekPlan?: unknown;
      };
      const savedRecipeIds = Array.isArray(parsed.savedRecipeIds)
        ? parsed.savedRecipeIds.filter((id): id is string => typeof id === 'string')
        : [];
      const weekPlan = this.parseWeekPlan(parsed.weekPlan);

      if (weekPlan) {
        return { savedRecipeIds, weekPlan };
      }

      return {
        savedRecipeIds,
        weekPlan: this.migrateLegacyWeek(parsed.weeklyRecipeIds),
      };
    } catch {
      return EMPTY_STATE;
    }
  }

  private parseWeekPlan(value: unknown): WeekPlan | null {
    if (!value || typeof value !== 'object') {
      return null;
    }

    const source = value as Record<string, unknown>;
    const plan = emptyWeekPlan();

    for (const day of WEEK_DAYS) {
      const recipeId = source[day.id];
      plan[day.id] = typeof recipeId === 'string' ? recipeId : null;
    }

    return plan;
  }

  private migrateLegacyWeek(value: unknown): WeekPlan {
    const plan = emptyWeekPlan();

    if (!Array.isArray(value)) {
      return plan;
    }

    const ids = Array.from(new Set(value.filter((id): id is string => typeof id === 'string')));

    ids.slice(0, WEEK_DAYS.length).forEach((recipeId, index) => {
      plan[WEEK_DAYS[index].id] = recipeId;
    });

    return plan;
  }
}
