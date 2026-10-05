import { ChangeDetectionStrategy, Component, computed, effect, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { AnalyticsService } from '../../core/analytics.service';
import { SeoService } from '../../core/seo.service';
import { FindingsCatalog } from './findings-catalog.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-finding',
  styleUrl: './finding.component.scss',
  templateUrl: './finding.component.html',
})
export class FindingComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly catalog = inject(FindingsCatalog);
  readonly slug = this.route.snapshot.paramMap.get('slug') ?? '';
  readonly finding = computed(() => this.catalog.findings().find((finding) => finding.slug === this.slug));

  constructor() {
    effect(() => {
      const finding = this.finding();

      this.seo.update({
        title: finding ? `${finding.title} - Achadinho da Bebel` : 'Achadinho - Bebel',
        description:
          finding?.description ??
          'Achadinhos úteis da Bebel para cozinha, limpeza, organização e rotina da casa.',
        path: this.slug ? `/achadinhos/${this.slug}` : '/achadinhos',
      });
    });
  }

  trackAchadinho(): void {
    const finding = this.finding();

    if (!finding) {
      return;
    }

    this.analytics.track('ClickAchadinho', {
      finding_id: finding.id,
      finding_slug: finding.slug,
      store: finding.store,
      source: 'detail',
      affiliate: finding.isAffiliate,
    });
  }

  relFor(isAffiliate: boolean): string {
    return isAffiliate ? 'noopener noreferrer sponsored' : 'noopener noreferrer';
  }

  storeLabel(store: string): string {
    if (store === 'mercado-livre') {
      return 'Mercado Livre';
    }

    return store === 'amazon' ? 'Amazon' : 'Shopee';
  }
}
