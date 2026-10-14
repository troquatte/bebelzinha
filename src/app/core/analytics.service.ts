import { DOCUMENT } from '@angular/common';
import { Injectable, inject, isDevMode } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export type BusinessEvent =
  | 'AppOpen'
  | 'CreateList'
  | 'AddItem'
  | 'CompleteItem'
  | 'SaveRecipe'
  | 'AddRecipeToList'
  | 'OpenShoppingList'
  | 'ReturnVisit'
  | 'HomeAction'
  | 'RepeatList'
  | 'PlanMeal'
  | 'AddWeekToList';

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
    this.initializeGoogleAnalytics();

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
    if (isDevMode() || this.isLocalHost()) {
      return null;
    }

    const value = this.document
      .querySelector<HTMLMetaElement>('meta[name="google-analytics-id"]')
      ?.content.trim();

    return value && /^G-[A-Z0-9]+$/i.test(value) ? value : null;
  }

  private isLocalHost(): boolean {
    const hostname = this.document.location.hostname.toLowerCase();
    const ipv4 = hostname.split('.').map(Number);

    return (
      hostname === 'localhost' ||
      hostname.endsWith('.localhost') ||
      hostname.endsWith('.local') ||
      hostname === '[::1]' ||
      hostname === '::1' ||
      (ipv4.length === 4 && ipv4.every((part) => Number.isInteger(part) && part >= 0 && part <= 255) &&
        (ipv4[0] === 0 || ipv4[0] === 127 || ipv4[0] === 10 ||
          (ipv4[0] === 192 && ipv4[1] === 168) ||
          (ipv4[0] === 172 && ipv4[1] >= 16 && ipv4[1] <= 31) ||
          (ipv4[0] === 169 && ipv4[1] === 254)))
    );
  }

  private initializeGoogleAnalytics(): void {
    if (!this.measurementId) {
      return;
    }

    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      window.dataLayer!.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, { send_page_view: false });

    if (!this.document.querySelector('script[data-bebel-ga4]')) {
      const script = this.document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
      script.setAttribute('data-bebel-ga4', '');
      this.document.head.appendChild(script);
    }
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
      }

      localStorage.setItem(this.sessionStorageKey, String(now));
    } catch {
      // Tracking não deve quebrar o app quando storage estiver indisponível.
    }
  }
}
