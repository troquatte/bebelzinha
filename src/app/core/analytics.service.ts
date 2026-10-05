import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export type BusinessEvent =
  | 'AppOpen'
  | 'CreateList'
  | 'AddItem'
  | 'CompleteItem'
  | 'SaveRecipe'
  | 'AddRecipeToList'
  | 'ClickAchadinho'
  | 'OpenShoppingList'
  | 'ReturnVisit'
  | 'HomeAction';

type AnalyticsParams = Record<string, string | number | boolean>;
type GtagCommand = 'config' | 'event' | 'js';

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void;
    fbq?: (command: 'init' | 'track' | 'trackCustom', eventOrId: string, params?: AnalyticsParams) => void;
  }
}

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);
  private readonly measurementId = this.readMeasurementId();
  private readonly sessionStorageKey = 'bebel.analytics.session-start.v1';
  private readonly returnVisitThresholdMs = 30 * 60 * 1000;
  private lastTrackedPath = '';

  constructor() {
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => {
        queueMicrotask(() => this.trackPageView(event.urlAfterRedirects));
      });

    queueMicrotask(() => {
      this.trackPageView(this.router.url);
      this.track('AppOpen', { path: this.router.url });
      this.trackReturnVisit();
    });
  }

  track(event: BusinessEvent, params: AnalyticsParams = {}): void {
    if (this.measurementId && window.gtag) {
      window.gtag('event', event, {
        ...params,
        send_to: this.measurementId,
      });
    }

    window.fbq?.('trackCustom', event, params);
  }

  private readMeasurementId(): string | null {
    const value = this.document
      .querySelector<HTMLMetaElement>('meta[name="google-analytics-id"]')
      ?.content.trim();

    return value && /^G-[A-Z0-9]+$/i.test(value) ? value : null;
  }

  private trackPageView(path: string): void {
    if (!path || path === this.lastTrackedPath) {
      return;
    }

    this.lastTrackedPath = path;

    if (this.measurementId && window.gtag) {
      window.gtag('event', 'page_view', {
        send_to: this.measurementId,
        page_location: window.location.href,
        page_path: path,
        page_title: this.document.title,
      });
    }

    window.fbq?.('track', 'PageView', {
      page_path: path,
    });
  }

  private trackReturnVisit(): void {
    try {
      const now = Date.now();
      const previousSession = Number(localStorage.getItem(this.sessionStorageKey));

      if (!Number.isFinite(previousSession) || previousSession <= 0) {
        localStorage.setItem(this.sessionStorageKey, String(now));
        return;
      }

      const elapsed = now - previousSession;

      if (elapsed >= this.returnVisitThresholdMs) {
        this.track('ReturnVisit', {
          minutes_since_last_session: Math.floor(elapsed / 60000),
        });
        localStorage.setItem(this.sessionStorageKey, String(now));
      }
    } catch {
      // Tracking não deve quebrar o app quando storage estiver indisponível.
    }
  }
}
