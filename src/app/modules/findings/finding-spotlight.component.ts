import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AnalyticsService } from '../../core/analytics.service';
import { FindingContext } from './findings.models';
import { FindingsCatalog } from './findings-catalog.service';

interface SpotlightCopy {
  eyebrow: string;
  contextText: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  selector: 'app-finding-spotlight',
  styleUrl: './finding-spotlight.component.scss',
  templateUrl: './finding-spotlight.component.html',
})
export class FindingSpotlightComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly catalog = inject(FindingsCatalog);

  readonly context = input.required<FindingContext>();
  readonly finding = computed(() => this.catalog.byContext(this.context())[0] ?? null);
  readonly copy = computed<SpotlightCopy>(() => {
    if (this.context() === 'meals') {
      return {
        eyebrow: 'Pra facilitar na cozinha',
        contextText: 'Já que você está pensando em comida, a Bebel separou uma coisinha útil pra cozinha.',
      };
    }

    if (this.context() === 'shopping') {
      return {
        eyebrow: 'Enquanto organiza as compras',
        contextText: 'Uma ajuda que pode fazer sentido junto com o que você já está colocando na lista.',
      };
    }

    return {
      eyebrow: 'Achadinho pra facilitar',
      contextText: 'Uma coisinha útil que combina com a ideia de deixar a rotina mais leve.',
    };
  });

  trackClick(): void {
    const item = this.finding();

    if (!item) {
      return;
    }

    this.analytics.track('ClickAchadinho', {
      finding_id: item.id,
      finding_slug: item.slug,
      store: item.store,
      source: 'spotlight',
      context: this.context(),
      affiliate: item.isAffiliate,
    });
  }
}
