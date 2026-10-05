import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

type GtagCommand = 'config' | 'event' | 'js';

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly measurementId = this.readMeasurementId();
  private lastTrackedPath = '';

  constructor() {
    if (!this.measurementId) {
      return;
    }

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        queueMicrotask(() => this.trackPageView(event.urlAfterRedirects));
      });

    queueMicrotask(() => this.trackPageView(this.router.url));
  }

  private readMeasurementId(): string | null {
    const value = this.document
      .querySelector<HTMLMetaElement>('meta[name="google-analytics-id"]')
      ?.content.trim();

    return value && /^G-[A-Z0-9]+$/i.test(value) ? value : null;
  }

  private trackPageView(path: string): void {
    if (!this.measurementId || !window.gtag || !path || path === this.lastTrackedPath) {
      return;
    }

    this.lastTrackedPath = path;

    window.gtag('event', 'page_view', {
      send_to: this.measurementId,
      page_location: window.location.href,
      page_path: path,
      page_title: this.document.title,
    });
  }
}
