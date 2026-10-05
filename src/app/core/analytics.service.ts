import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

type GtagCommand = 'config' | 'event' | 'js';

declare global {
  interface Window {
    dataLayer?: unknown[][];
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

    this.loadGoogleTag(this.measurementId);
    this.trackPageView(this.router.url);

    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.trackPageView(event.urlAfterRedirects));
  }

  private readMeasurementId(): string | null {
    const value = this.document
      .querySelector<HTMLMetaElement>('meta[name="google-analytics-id"]')
      ?.content.trim();

    return value && /^G-[A-Z0-9]+$/i.test(value) ? value : null;
  }

  private loadGoogleTag(measurementId: string): void {
    if (this.document.querySelector('script[data-bebel-ga4]')) {
      return;
    }

    const script = this.document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset['bebelGa4'] = 'true';
    this.document.head.appendChild(script);

    window.dataLayer = window.dataLayer ?? [];
    window.gtag = (command, target, params) => {
      window.dataLayer?.push(params ? [command, target, params] : [command, target]);
    };

    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: false,
    });
  }

  private trackPageView(path: string): void {
    if (!this.measurementId || !window.gtag || !path || path === this.lastTrackedPath) {
      return;
    }

    this.lastTrackedPath = path;
    window.gtag('event', 'page_view', {
      page_location: window.location.href,
      page_path: path,
      page_title: this.document.title,
    });
  }
}
