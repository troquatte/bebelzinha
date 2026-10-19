import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { AnalyticsService } from './core/analytics.service';
import { ContinuityService } from './core/continuity.service';
import { OnboardingComponent } from './modules/onboarding/components/onboarding.component';

const LANDING_ROUTES = ['/wpp-bebelzinha'];

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [OnboardingComponent, RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly router = inject(Router);

  private readonly url = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  readonly isLanding = computed(() =>
    LANDING_ROUTES.some((route) => this.url().startsWith(route)),
  );

  constructor() {
    inject(AnalyticsService);
    inject(ContinuityService);
  }
}
