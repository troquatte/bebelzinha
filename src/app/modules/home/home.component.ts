import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';

import { AnalyticsService } from '../../core/analytics.service';
import { ContinuityArea, ContinuityService } from '../../core/continuity.service';
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
  private readonly continuity = inject(ContinuityService);
  private readonly mealsStore = inject(MealsStore);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly shoppingStore = inject(ShoppingStore);

  private readonly activeShoppingList = computed(() =>
    [...this.shoppingStore.lists()]
      .filter((list) => list.items.some((item) => !item.checked))
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0] ?? null,
  );

  readonly returnContext = computed(() => {
    const activeList = this.activeShoppingList();

    if (activeList) {
      const pending = activeList.items.filter((item) => !item.checked).length;
      return {
        icon: 'shopping_cart',
        title: 'Sua lista ainda está por aqui 💜',
        copy: `Ainda tem ${pending} ${pending === 1 ? 'item' : 'itens'} pra pegar.`,
        cta: 'Continuar lista',
        action: () => this.router.navigate(['/compras', activeList.id]),
        tracking: 'resume-shopping',
      };
    }

    if (this.mealsStore.weeklyRecipeIds().length > 0) {
      return {
        icon: 'calendar_month',
        title: 'Sua semana já está tomando forma.',
        copy: 'Quer ver o que você separou para os próximos dias?',
        cta: 'Ver minha semana',
        action: () => this.router.navigate(['/comidinhas'], { fragment: 'minha-semana' }),
        tracking: 'resume-week',
      };
    }

    if (this.mealsStore.savedRecipeIds().length > 0) {
      return {
        icon: 'favorite',
        title: 'Você guardou umas receitinhas.',
        copy: 'Vai que uma delas resolve a comida de hoje.',
        cta: 'Ver receitas salvas',
        action: () => this.router.navigate(['/comidinhas'], { fragment: 'receitas-salvas' }),
        tracking: 'resume-saved-recipes',
      };
    }

    const lastArea = this.continuity.getLastArea();
    return lastArea ? this.contextForLastArea(lastArea) : null;
  });

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

  async resumeContext(): Promise<void> {
    const context = this.returnContext();

    if (!context) {
      return;
    }

    this.analytics.track('HomeAction', { action: context.tracking });
    await context.action();
  }

  private contextForLastArea(area: ContinuityArea) {
    if (area === 'compras') {
      return {
        icon: 'shopping_cart',
        title: 'Quer voltar pras compras?',
        copy: 'A Bebel te leva de volta pra onde você estava.',
        cta: 'Ver minhas listas',
        action: () => this.router.navigate(['/compras']),
        tracking: 'resume-last-shopping',
      };
    }

    if (area === 'comidinhas') {
      return {
        icon: 'restaurant',
        title: 'Ainda pensando no que fazer de comida?',
        copy: 'As Comidinhas continuam te esperando.',
        cta: 'Voltar pras Comidinhas',
        action: () => this.router.navigate(['/comidinhas']),
        tracking: 'resume-last-meals',
      };
    }

    return {
      icon: 'sell',
      title: 'Os achadinhos continuam por aqui.',
      copy: 'Se quiser, a Bebel te mostra de novo o que separou.',
      cta: 'Voltar pros Achadinhos',
      action: () => this.router.navigate(['/achadinhos']),
      tracking: 'resume-last-findings',
    };
  }

  private trackHomeAction(action: HomeAction): void {
    this.analytics.track('HomeAction', { action });
  }
}
