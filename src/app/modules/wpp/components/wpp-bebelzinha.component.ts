import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { AnalyticsService } from '../../../core/analytics.service';
import { SeoService } from '../../../core/seo.service';

const WHATSAPP_CHANNEL_URL = 'https://whatsapp.com/channel/0029Vb8yJBL2f3EG0dfQEz34';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-wpp-bebelzinha',
  styleUrl: './wpp-bebelzinha.component.scss',
  templateUrl: './wpp-bebelzinha.component.html',
})
export class WppBebelzinhaComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  readonly channelUrl = WHATSAPP_CHANNEL_URL;

  constructor() {
    this.seo.update({
      title: 'Cantinho da Bebel — convite especial no WhatsApp',
      description:
        'Receitinhas fáceis, dicas para casa e achadinhos úteis da Bebel, tudo no canal gratuito do WhatsApp.',
      path: 'wpp-bebelzinha',
    });

    this.analytics.track('ChannelLandingView', { source: 'wpp-bebelzinha' });
  }

  onJoin(): void {
    this.analytics.track('WhatsAppChannelClick', { source: 'wpp-bebelzinha' });
  }
}
