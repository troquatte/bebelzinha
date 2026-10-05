import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AnalyticsService } from '../../core/analytics.service';
import { SeoService } from '../../core/seo.service';
import { FindingSpotlightComponent } from '../findings/finding-spotlight.component';
import { MealsStore } from '../meals/meals.store';
import { ShoppingStore } from '../shopping/shopping.store';

type HomeAction = 'shopping' | 'meals-guide' | 'saved-recipes' | 'findings';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FindingSpotlightComponent],
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly mealsStore = inject(MealsStore);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly shoppingStore = inject(ShoppingStore);

  private readonly activeShoppingList = computed(() =>
    [...this.shoppingStore.lists()]
      .filter((list) => list.items.some((item) => !item.checked))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0] ?? null,
  );

  constructor() {
    this.seo.update({
      title: 'Bebel - Sua casa mais leve',
      description:
        'A Bebel ajuda você a organizar a vida de casa com receitas, listas de compras e ideias práticas sem complicação.',
      path: '/',
    });
  }

  async goShopping(): Promise<void> {
    this.trackHomeAction('shopping');
    const activeList = this.activeShoppingList();

    if (activeList) {
      await this.router.navigate(['/compras', activeList.id]);
      return;
    }

    await this.router.navigate(['/compras'], { queryParams: { new: '1' } });
  }

  async chooseMeal(): Promise<void> {
    this.trackHomeAction('meals-guide');
    await this.router.navigate(['/comidinhas'], { fragment: 'bebel-escolhe' });
  }

  async viewSavedRecipes(): Promise<void> {
    this.trackHomeAction('saved-recipes');
    const fragment = this.mealsStore.savedRecipeIds().length > 0 ? 'receitas-salvas' : 'receitas';
    await this.router.navigate(['/comidinhas'], { fragment });
  }

  async viewFindings(): Promise<void> {
    this.trackHomeAction('findings');
    await this.router.navigate(['/achadinhos']);
  }

  private trackHomeAction(action: HomeAction): void {
    this.analytics.track('HomeAction', { action });
  }
}
