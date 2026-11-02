import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import seo from './seo.config.json';

interface SeoConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  indexable?: boolean;
  type?: 'website' | 'article';
  structuredData?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);
  private readonly router = inject(Router);
  private indexable = true;

  constructor() {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntilDestroyed(),
    ).subscribe(event => this.updateRobots(event.urlAfterRedirects));
  }

  update(config: SeoConfig): void {
    const path = this.normalizePath(config.path);
    const fixed = seo.shells.find(page => page.indexable && page.path === path);
    const title = fixed?.title ?? config.title;
    const description = fixed?.description ?? config.description;
    const pageUrl = new URL(path === '/' ? path : path + '/', seo.origin).href;
    const imageUrl = new URL(config.image ?? seo.image, seo.origin).href;
    this.indexable = config.indexable !== false;

    this.title.setTitle(title);
    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:site_name', content: 'Bebel' });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });
    this.meta.updateTag({ property: 'og:type', content: config.type ?? 'website' });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: config.imageAlt ?? 'Bebel, personagem que ajuda a organizar a vida de casa',
    });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });
    const currentUrl = this.router.currentNavigation()?.finalUrl?.toString() ?? config.path;
    this.updateRobots(currentUrl);
    this.updateCanonical(pageUrl);
    this.setStructuredData(config.structuredData ?? null);
  }

  setStructuredData(value: Record<string, unknown> | null): void {
    this.document.getElementById('bebel-structured-data')?.remove();
    if (!value) return;
    const script = this.document.createElement('script');
    script.id = 'bebel-structured-data';
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(value).replaceAll('<', '\\u003c');
    this.document.head.appendChild(script);
  }

  private normalizePath(value: string): string {
    return '/' + value.split(/[?#]/, 1)[0].replace(/^\/+|\/+$/g, '');
  }

  private updateRobots(value: string): void {
    const path = this.normalizePath(value);
    const personal = seo.privatePaths.some(prefix => path === prefix || path.startsWith(prefix + '/'));
    const directive = this.indexable && !personal ? 'index' : 'noindex';
    this.meta.updateTag({ name: 'robots', content: `${directive},follow,max-image-preview:large` });
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }
}
