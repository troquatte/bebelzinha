import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { AnalyticsService } from './core/analytics.service';
import { ContinuityService } from './core/continuity.service';
import { OnboardingComponent } from './modules/onboarding/components/onboarding.component';

import { salesCampaign } from './modules/products/data/sales-campaign';

const LANDING_ROUTES = ['/wpp-bebelzinha', '/cortadores', '/jantar-resolvido'];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OnboardingComponent, RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url === '/' ? this.location.path() || '/' : this.router.url },
  );

  readonly showOnboarding = computed(() => !this.url().startsWith('/produtos'));

  readonly isLanding = computed(() => {
    const url = this.url();
    const tree = this.router.parseUrl(url);
    const path = tree.root.children['primary']?.segments.map(segment => segment.path).join('/') ?? '';
    const salesPage = ['produtos', 'produtos/refeicao-resolvida'].includes(path)
      && salesCampaign(tree.queryParams['venda']) !== null;
    return salesPage || LANDING_ROUTES.some(route => url.startsWith(route));
  });

  constructor() {
    inject(AnalyticsService);
    inject(ContinuityService);
  }
}
