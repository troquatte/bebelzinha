import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { BebelHeroComponent } from '../../../shared/components/bebel-hero/bebel-hero.component';
import { Router } from '@angular/router';

import { AnalyticsService } from '../../../core/analytics.service';
import { ContinuityArea, ContinuityService } from '../../../core/continuity.service';
import { SeoService } from '../../../core/seo.service';
import { ShoppingStore } from '../../shopping/service/shopping.store';

type HomeAction = 'shopping' | 'meals-guide' | 'saved-recipes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  styleUrl: './home.component.scss',
  templateUrl: './home.component.html',
  imports: [BebelHeroComponent],
})
export class HomeComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly continuity = inject(ContinuityService);
  private readonly router = inject(Router);
  private readonly seo = inject(SeoService);
  private readonly shoppingStore = inject(ShoppingStore);

  private readonly activeShoppingList = computed(
    () =>
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
        title: 'Sua lista ainda está por aqui',
        copy: `Ainda tem ${pending} ${pending === 1 ? 'item' : 'itens'} pra pegar.`,
        cta: 'Continuar lista',
        action: () => this.router.navigate(['/compras', activeList.id]),
        tracking: 'resume-shopping',
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

    return {
      icon: 'restaurant',
      title: 'Ainda pensando no que fazer de comida?',
      copy: 'As Comidinhas continuam te esperando.',
      cta: 'Voltar pras Comidinhas',
      action: () => this.router.navigate(['/comidinhas']),
      tracking: 'resume-last-meals',
    };
  }

  private trackHomeAction(action: HomeAction): void {
    this.analytics.track('HomeAction', { action });
  }
}
