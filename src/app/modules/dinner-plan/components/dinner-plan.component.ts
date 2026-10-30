import { ProductReturnComponent } from '../../products/components/product-return.component';
import { ChangeDetectionStrategy, Component, ElementRef, afterNextRender, inject, signal, viewChild } from '@angular/core';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { DinnerActionsComponent } from './dinner-actions.component';
import { DinnerRoutineComponent } from './dinner-routine.component';
import { SeoService } from '../../../core/seo.service';
import { ShoppingChecklistComponent } from '../../shopping/components/shopping-checklist.component';
import { DinnerPlanStore } from '../service/dinner-plan.store';

@Component({
  selector: 'app-dinner-plan',
  host: { '(window:scroll)': 'updateShortcut()', '(window:resize)': 'updateShortcut()', '(window:beforeprint)': 'preparePrint()', '(window:afterprint)': 'restoreAfterPrint()' },
  imports: [ProductReturnComponent, ShoppingChecklistComponent, DinnerRoutineComponent, DinnerActionsComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dinner-plan.component.html',
  styleUrl: './dinner-plan.component.scss',
})
export class DinnerPlanComponent {
  readonly plan = inject(DinnerPlanStore);
  private readonly element = inject<ElementRef<HTMLElement>>(ElementRef);
  private closedPrintPanels: HTMLDetailsElement[] = [];
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly showingShopping = signal(false);
  readonly videoOpen = signal<string | null>(null);
  private readonly pageTop = viewChild.required<ElementRef<HTMLElement>>('pageTop');
  private readonly shoppingHeading = viewChild.required<ElementRef<HTMLElement>>('shoppingHeading');

  printRecipe(): void {
    window.print();
  }

  preparePrint(): void {
    if (this.closedPrintPanels.length) return;
    this.closedPrintPanels = Array.from(this.element.nativeElement.querySelectorAll<HTMLDetailsElement>('.dinner__routine-item:not([open])'));
    this.closedPrintPanels.forEach(panel => panel.open = true);
  }

  restoreAfterPrint(): void {
    this.closedPrintPanels.forEach(panel => panel.open = false);
    this.closedPrintPanels = [];
  }

  moveDay(direction: number): void {
    const index = this.plan.days.findIndex(day => day.id === this.plan.selectedDay().id);
    const next = this.plan.days[index + direction];
    if (next) this.selectDay(next.id);
  }

  selectDay(id: string): void {
    if (!this.plan.days.some(day => day.id === id)) return;
    this.plan.selectDay(id);
    this.updateDayUrl();
  }

  private updateDayUrl(): void {
    const day = String(this.plan.selectedDay().day);
    if (this.route.snapshot.queryParamMap.get('dia') === day) return;
    void this.router.navigate([], { relativeTo: this.route, queryParams: { dia: day },
      queryParamsHandling: 'merge', replaceUrl: true, preserveFragment: true });
  }

  updateShortcut(): void {
    const heading = this.shoppingHeading().nativeElement;
    this.showingShopping.set(window.scrollY > 100 && heading.getBoundingClientRect().top < window.innerHeight * .55);
  }

  useShortcut(): void {
    if (!this.showingShopping()) { this.goToShopping(); return; }
    const top = this.pageTop().nativeElement;
    top.focus({ preventScroll: true });
    top.scrollIntoView({ behavior: 'instant', block: 'start' });
    this.updateShortcut();
  }

  goToShopping(): void {
    const heading = this.shoppingHeading().nativeElement;
    heading.focus({ preventScroll: true });
    heading.scrollIntoView({ behavior: 'instant', block: 'start' });
    this.updateShortcut();
  }

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const requested = params.get('dia');
      const day = this.plan.days.find(item => String(item.day) === requested);
      if (day && day.id !== this.plan.selectedDay().id) this.plan.selectDay(day.id);
      this.updateDayUrl();
    });
    afterNextRender(() => this.updateShortcut());
    this.seo.update({ title: 'Refeição Resolvida | Bebelzinha',
      description: '22 refeições com preparo, quantidades para 2 ou 4 porções e lista de compras.', path: 'jantar-resolvido' });
  }
}
