import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { AnalyticsService } from './core/analytics.service';
import { ContinuityService } from './core/continuity.service';
import { OnboardingComponent } from './modules/onboarding/onboarding.component';

@Component({
  imports: [OnboardingComponent, RouterLink, RouterLinkActive, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  constructor() {
    inject(AnalyticsService);
    inject(ContinuityService);
  }
}
