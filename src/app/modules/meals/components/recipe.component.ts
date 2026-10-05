import { ChangeDetectionStrategy, Component, computed, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

import { AnalyticsService } from '../../../core/analytics.service';
import { SeoService } from '../../../core/seo.service';
import { ShoppingStore } from '../../shopping/service/shopping.store';
import { RecipeIngredient } from '../interface/meals.models';
import { MealsStore } from '../service/meals.store';
import { RecipeCatalog } from '../service/recipe-catalog.service';
import { WeekPlanningService } from '../service/week-planning.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-recipe',
  styleUrl: './recipe.component.scss',
  templateUrl: './recipe.component.html',
})
export class RecipeComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly catalog = inject(RecipeCatalog);
  readonly mealsStore = inject(MealsStore);
  readonly planner = inject(WeekPlanningService);
  readonly shoppingStore = inject(ShoppingStore);

  readonly slug = this.route.snapshot.paramMap.get('slug') ?? '';
  readonly recipe = computed(() => this.catalog.recipes().find((recipe) => recipe.slug === this.slug));
  readonly selectedIngredientIds = signal<string[]>([]);

  constructor() {
    effect(() => {
      const recipe = this.recipe();

      this.seo.update({
        title: recipe ? `${recipe.title} - Receita da Bebel` : 'Receita - Comidinhas da Bebel',
        description:
          recipe?.description ??
          'Receitas simples da Bebel para facilitar almoço, jantar, lanche e a rotina da casa.',
        path: this.slug ? `/comidinhas/${this.slug}` : '/comidinhas',
      });
    });
  }

  toggleSaved(): void {
    const recipe = this.recipe();
    if (recipe) {
      const saved = this.mealsStore.toggleSaved(recipe.id);

      if (saved) {
        this.analytics.track('SaveRecipe', {
          recipe_id: recipe.id,
          recipe_slug: recipe.slug,
        });
      }
    }
  }

  planWeek(): void {
    const recipe = this.recipe();

    if (recipe) {
      void this.planner.chooseDay(recipe);
    }
  }

  toggleIngredient(ingredientId: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedIngredientIds.update((ids) =>
      checked ? [...ids, ingredientId] : ids.filter((id) => id !== ingredientId),
    );
  }

  selectAll(): void {
    const recipe = this.recipe();
    if (recipe) {
      this.selectedIngredientIds.set(recipe.ingredients.map((ingredient) => ingredient.id));
    }
  }

  async sendSingle(ingredient: RecipeIngredient): Promise<void> {
    await this.sendIngredients([ingredient]);
  }

  async sendSelected(): Promise<void> {
    const recipe = this.recipe();
    if (!recipe) {
      return;
    }

    const selected = recipe.ingredients.filter((ingredient) =>
      this.selectedIngredientIds().includes(ingredient.id),
    );

    if (selected.length === 0) {
      await Swal.fire({
        title: 'Escolha pelo menos um ingrediente',
        text: 'Marque o que está faltando e eu mando pra sua lista.',
        confirmButtonText: 'Tá bom',
        confirmButtonColor: '#6f1fb4',
      });
      return;
    }

    await this.sendIngredients(selected);
  }

  async sendAll(): Promise<void> {
    const recipe = this.recipe();
    if (recipe) {
      await this.sendIngredients(recipe.ingredients);
    }
  }

  private async sendIngredients(ingredients: RecipeIngredient[]): Promise<void> {
    const listId = await this.chooseList();

    if (!listId) {
      return;
    }

    const result = this.shoppingStore.addItemsIfMissing(
      listId,
      ingredients.map((ingredient) => ({
        baseName: ingredient.name,
        displayName: this.formatIngredient(ingredient),
      })),
    );
    const added = result.added;
    const duplicated = result.duplicated;

    const duplicateText = duplicated
      ? ` ${duplicated} ${duplicated === 1 ? 'já estava' : 'já estavam'} na lista.`
      : '';

    if (added > 0) {
      const recipe = this.recipe();
      this.analytics.track('AddRecipeToList', {
        recipe_id: recipe?.id ?? 'unknown',
        recipe_slug: recipe?.slug ?? this.slug,
        added_count: added,
        duplicate_count: duplicated,
      });
    }

    await Swal.fire({
      icon: 'success',
      title: 'Prontinho 💜',
      text: `${added} ${added === 1 ? 'ingrediente foi' : 'ingredientes foram'} pra lista.${duplicateText}`,
      confirmButtonText: 'Fechar',
      confirmButtonColor: '#6f1fb4',
    });
  }

  private async chooseList(): Promise<string | null> {
    const lists = this.shoppingStore.lists();

    if (lists.length === 0) {
      return this.createShoppingList();
    }

    const inputOptions = Object.fromEntries([
      ...lists.map((list) => [list.id, list.name]),
      ['__new__', '+ Criar uma nova lista'],
    ]);

    const result = await Swal.fire<string>({
      title: 'Pra qual lista eu mando?',
      input: 'select',
      inputOptions,
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
    this.analytics.track('CreateList', { source: 'recipe' });
    return list.id;
  }

  private formatIngredient(ingredient: RecipeIngredient): string {
    const amount = `${ingredient.quantity} ${ingredient.unit}`.trim();
    const note = ingredient.note ? ` (${ingredient.note})` : '';
    return `${ingredient.name} — ${amount}${note}`;
  }
}
