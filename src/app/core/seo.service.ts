import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoConfig {
  title: string;
  description: string;
  path: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  update(config: SeoConfig): void {
    const baseUrl = new URL('.', this.document.baseURI);
    const pageUrl = new URL(config.path.replace(/^\//, ''), baseUrl).toString();
    const imageUrl = new URL('images/bebel/bebel-roxa.jpg', baseUrl).toString();

    this.title.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });

    this.meta.updateTag({ property: 'og:site_name', content: 'Bebel' });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:url', content: pageUrl });
    this.meta.updateTag({ property: 'og:image', content: imageUrl });
    this.meta.updateTag({
      property: 'og:image:alt',
      content: 'Bebel, personagem que ajuda a organizar a vida de casa',
    });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: imageUrl });

    this.updateCanonical(pageUrl);
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
