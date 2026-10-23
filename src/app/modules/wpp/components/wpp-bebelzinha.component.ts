import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnalyticsService } from '../../../core/analytics.service';
import { SeoService } from '../../../core/seo.service';

const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb8yJBL2f3EG0dfQEz34';

type JoinPlacement = 'hero' | 'bottom';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-wpp-bebelzinha',
  styleUrl: './wpp-bebelzinha.component.scss',
  templateUrl: './wpp-bebelzinha.component.html',
})
export class WppBebelzinhaComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);
  private readonly route = inject(ActivatedRoute);

  readonly channelUrl = WHATSAPP_CHANNEL_URL;

  constructor() {
    this.seo.update({
      title: 'Achadinhos da Bebel no WhatsApp | Casa e cozinha',
      description:
        'Entre grátis no canal de achadinhos da Bebel: produtos úteis para casa e cozinha, dicas práticas e receitinhas fáceis.',
      path: 'wpp-bebelzinha',
    });

    this.analytics.track('ChannelLandingView', this.trackingContext());
  }

  onJoin(placement: JoinPlacement): void {
    // Preserva o evento Lead que sua campanha já utiliza.
    // IMPORTANTE: representa um clique para abrir o canal, NÃO uma adesão confirmada.
    this.analytics.track('WhatsAppChannelClick', {
      ...this.trackingContext(),
      placement,
      conversion_step: 'channel_outbound_click',
    });
  }

  private trackingContext(): Record<string, string | number | boolean> {
    const params = this.route.snapshot.queryParamMap;

    const context: Record<string, string | number | boolean> = {
      source: 'wpp-bebelzinha',
      content_name: 'Achadinhos da Bebel',
    };

    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'] as const) {
      const value = params.get(key);

      if (value !== null) {
        context[key] = value;
      }
    }

    return context;
  }
}
