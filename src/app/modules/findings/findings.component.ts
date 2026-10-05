import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AnalyticsService } from '../../core/analytics.service';
import { SeoService } from '../../core/seo.service';
import { Finding, FindingCategory } from './findings.models';
import { FindingsCatalog } from './findings-catalog.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-findings',
  styleUrl: './findings.component.scss',
  templateUrl: './findings.component.html',
})
export class FindingsComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  readonly catalog = inject(FindingsCatalog);
  readonly category = signal<'all' | FindingCategory>('all');

  readonly filteredFindings = computed(() => {
    const category = this.category();
    return category === 'all'
      ? this.catalog.findings()
      : this.catalog.findings().filter((finding) => finding.category === category);
  });

  constructor() {
    this.seo.update({
      title: 'Achadinhos da Bebel - Coisas úteis para facilitar a casa',
      description:
        'Achadinhos úteis para cozinha, limpeza, organização e lavanderia escolhidos pela Bebel para facilitar a vida de casa.',
      path: '/achadinhos',
    });
  }

  selectCategory(category: 'all' | FindingCategory): void {
    this.category.set(category);
  }

  trackAchadinho(finding: Finding): void {
    this.analytics.track('ClickAchadinho', {
      finding_id: finding.id,
      finding_slug: finding.slug,
      store: finding.store,
      source: 'catalog',
      affiliate: finding.isAffiliate,
    });
  }

  relFor(isAffiliate: boolean): string {
    return isAffiliate ? 'noopener noreferrer sponsored' : 'noopener noreferrer';
  }
}
