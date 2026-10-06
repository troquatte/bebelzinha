import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { AnalyticsService } from '../../../core/analytics.service';
import { ShoppingStore } from '../../shopping/service/shopping.store';
import { RecipeIngredient, WEEK_DAYS, WeekDay } from '../interface/meals.models';
import { MealsStore } from '../service/meals.store';
import { RecipeCatalog } from '../service/recipe-catalog.service';
import { WeekPlanningService } from '../service/week-planning.service';

interface WeekIngredient {
  key: string;
  baseName: string;
  displayName: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-week-planner',
  styleUrl: './week-planner.component.scss',
  templateUrl: './week-planner.component.html',
})
export class WeekPlannerComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly catalog = inject(RecipeCatalog);
  private readonly shoppingStore = inject(ShoppingStore);
  readonly planner = inject(WeekPlanningService);
  readonly store = inject(MealsStore);

  readonly preparingList = signal(false);
  readonly selectedIngredientKeys = signal<string[]>([]);

  readonly slots = computed(() =>
    WEEK_DAYS.map((day) => ({
      ...day,
      recipe: this.catalog.recipes().find((recipe) => recipe.id === this.store.weekPlan()[day.id]) ?? null,
    })),
  );

  readonly plannedRecipes = computed(() =>
    this.slots()
      .map((slot) => slot.recipe)
      .filter((recipe): recipe is NonNullable<typeof recipe> => Boolean(recipe)),
  );

  readonly plannedCount = computed(() => this.plannedRecipes().length);

  readonly weekIngredients = computed<WeekIngredient[]>(() => {
    const ingredients = new Map<string, WeekIngredient>();

    for (const recipe of this.plannedRecipes()) {
      for (const ingredient of recipe.ingredients) {
        const key = this.normalizeIngredient(ingredient.name);

        if (!ingredients.has(key)) {
          ingredients.set(key, {
            key,
            baseName: ingredient.name,
            displayName: this.formatIngredient(ingredient),
          });
        }
      }
    }

    return [...ingredients.values()];
  });

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

  startShoppingList(): void {
    const ingredients = this.weekIngredients();

    if (ingredients.length === 0) {
      return;
    }

    this.selectedIngredientKeys.set(ingredients.map((ingredient) => ingredient.key));
    this.preparingList.set(true);
  }

  cancelShoppingList(): void {
    this.preparingList.set(false);
    this.selectedIngredientKeys.set([]);
  }

  toggleIngredient(key: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    this.selectedIngredientKeys.update((keys) =>
      checked ? [...keys, key] : keys.filter((item) => item !== key),
    );
  }

  async sendWeekToShopping(): Promise<void> {
    const selectedKeys = new Set(this.selectedIngredientKeys());
    const selected = this.weekIngredients().filter((ingredient) => selectedKeys.has(ingredient.key));

    if (selected.length === 0) {
      await Swal.fire({
        title: 'Escolhe pelo menos uma coisinha',
        text: 'Desmarca o que já tem em casa e deixa marcado só o que precisa comprar.',
        confirmButtonText: 'Tá bom',
        confirmButtonColor: '#6f1fb4',
      });
      return;
    }

    const listId = await this.chooseList();

    if (!listId) {
      return;
    }

    const result = this.shoppingStore.addItemsIfMissing(
      listId,
      selected.map((ingredient) => ({
        baseName: ingredient.baseName,
        displayName: ingredient.displayName,
      })),
    );
    const added = result.added;
    const duplicated = result.duplicated;

    this.analytics.track('AddWeekToList', {
      planned_recipe_count: this.plannedCount(),
      selected_count: selected.length,
      added_count: added,
      duplicate_count: duplicated,
    });

    this.cancelShoppingList();

    await Swal.fire({
      icon: 'success',
      title: 'Prontinho 💜',
      text: `${added} ${added === 1 ? 'item foi' : 'itens foram'} pra lista.${
        duplicated
          ? ` ${duplicated} ${duplicated === 1 ? 'já estava' : 'já estavam'} por lá.`
          : ''
      }`,
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#6f1fb4',
    });
  }

  private async chooseList(): Promise<string | null> {
    const lists = this.shoppingStore.lists();

    if (lists.length === 0) {
      return this.createShoppingList();
    }

    const options = Object.fromEntries([
      ...lists.map((list) => [list.id, list.name]),
      ['__new__', '+ Criar uma nova lista'],
    ]);

    const result = await Swal.fire<string>({
      title: 'Pra qual lista eu mando?',
      input: 'select',
      inputOptions: options,
      inputPlaceholder: 'Escolha uma lista',
      showCancelButton: true,
      confirmButtonText: 'Continuar',
      cancelButtonText: 'Agora não',
      confirmButtonColor: '#6f1fb4',
      inputValidator: (value) => (value ? null : 'Escolha uma lista.'),
    });

    if (!result.isConfirmed || !result.value) {
      return null;
    }

    return result.value === '__new__' ? this.createShoppingList() : result.value;
  }

  private async createShoppingList(): Promise<string | null> {
    const result = await Swal.fire<string>({
      title: 'Nova lista de compras',
      text: 'Como você quer chamar essa lista?',
      input: 'text',
      inputPlaceholder: 'Ex.: Compras da semana',
      showCancelButton: true,
      confirmButtonText: 'Criar lista',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#6f1fb4',
      inputValidator: (value) => (value.trim() ? null : 'Dê um nome para a lista.'),
    });

    if (!result.isConfirmed || !result.value?.trim()) {
      return null;
    }

    const list = this.shoppingStore.createList(result.value);
    this.analytics.track('CreateList', { source: 'week' });
    return list.id;
  }

  private formatIngredient(ingredient: RecipeIngredient): string {
    const amount = `${ingredient.quantity} ${ingredient.unit}`.trim();
    const note = ingredient.note ? ` (${ingredient.note})` : '';
    return `${ingredient.name} — ${amount}${note}`;
  }

  private normalizeIngredient(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
}
