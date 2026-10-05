import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export type ContinuityArea = 'comidinhas' | 'compras' | 'achadinhos';

const STORAGE_KEY = 'bebel.continuity.last-area.v1';
const VALID_AREAS = new Set<ContinuityArea>(['comidinhas', 'compras', 'achadinhos']);

@Injectable({ providedIn: 'root' })
export class ContinuityService {
  constructor(router: Router) {
    router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe((event) => this.remember(event.urlAfterRedirects));
  }

  getLastArea(): ContinuityArea | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored && VALID_AREAS.has(stored as ContinuityArea)
        ? (stored as ContinuityArea)
        : null;
    } catch {
      return null;
    }
  }

  private remember(url: string): void {
    const path = url.split(/[?#]/)[0];
    const area = path.split('/').filter(Boolean)[0] as ContinuityArea | undefined;

    if (!area || !VALID_AREAS.has(area)) {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEY, area);
    } catch {
      // Continuidade é opcional e não pode impedir a navegação.
    }
  }
}
