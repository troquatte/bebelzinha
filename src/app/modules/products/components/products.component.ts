import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../core/analytics.service';
import { salesCampaign } from '../data/sales-campaign';
import { SeoService } from '../../../core/seo.service';
import { MEAL_PRODUCT } from '../data/meal-product.config';
import { ProductAccessService } from '../service/product-access.service';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly route = inject(ActivatedRoute);
  private campaignParams: Record<string, string> = {};
  readonly product = MEAL_PRODUCT;
  readonly videoStarted = signal(false);

  async playPresentation(video: HTMLVideoElement): Promise<void> {
    this.videoStarted.set(true);
    try {
      await video.play();
      this.analytics.track('ProductVideoPlay', this.campaignParams);
    }
    catch { this.videoStarted.set(false); }
  }

  trackCheckout(): void {
    this.analytics.track('ProductCheckoutClick', this.campaignParams);
  }

  readonly access = inject(ProductAccessService);
  readonly features = [
    { icon: 'restaurant', title: '22 refeições para escolher', text: 'Frango, carne, massas, ovos e sopas para variar o almoço e o jantar.' },
    { icon: 'shopping_cart', title: 'A lista vai com você', text: 'Veja os ingredientes da refeição e marque o que já tem ou colocou no carrinho.' },
    { icon: 'group', title: 'Hoje ou mais uma refeição', text: 'Escolha 2 ou 4 porções. As quantidades dos ingredientes acompanham sua escolha.' },
    { icon: 'checklist', title: 'Um passo de cada vez', text: 'Marque o que terminou e volte ao mesmo dia quando abrir o app de novo.' },
    { icon: 'kitchen', title: 'Saiba como guardar', text: 'Consulte os cuidados de conservação e reaquecimento de cada prato.' },
    { icon: 'print', title: 'Prefere no papel?', text: 'Imprima a receita ou use a opção de salvar em PDF do seu aparelho.' },
  ];

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => {
      this.campaignParams = {
        product_id: this.product.id,
        sales_campaign: salesCampaign(params.get('venda')) ?? 'app',
      };
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
        const value = params.get(key)?.trim();
        if (value) this.campaignParams[key] = value.slice(0, 100);
      }
      this.analytics.track('ProductSalesView', this.campaignParams);
    });
    inject(SeoService).update({ title: 'Refeição Resolvida | Produtos da Bebel',
      description: '22 ideias para o almoço e o jantar, com receitas, quantidades ajustáveis e lista de compras no app da Bebel.',
      path: 'produtos/refeicao-resolvida' });
  }
}
