import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AnalyticsService } from '../../../core/analytics.service';
import { SeoService } from '../../../core/seo.service';
import { CUTTER_PRODUCTS, SHOPEE_STORE_URL } from '../data/cutter-products';
import { CutterProduct } from '../interface/cutter-product.interface';

@Component({
  selector: 'app-cutters',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cutters.component.html',
  styleUrl: './cutters.component.scss',
})
export class CuttersComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly products = CUTTER_PRODUCTS;
  readonly storeUrl = SHOPEE_STORE_URL;

  constructor() {
    this.seo.update({
      title: 'Cortadores e marcadores de biscoitos | Bebelzinha',
      description:
        'Conheça os modelos de cortadores e marcadores feitos em impressão 3D para presentes, encomendas e lembrancinhas. Confira as opções na Shopee.',
      path: 'cortadores',
    });
  }

  productUrl(product: CutterProduct): string {
    return product.shopeeUrl?.trim() || this.storeUrl;
  }

  onShopeeClick(product: CutterProduct | null, placement: 'product' | 'footer'): void {
    const context: Record<string, string | number | boolean> = {
      source: 'cortadores',
      content_id: product?.id ?? 'catalogo',
      content_name: product?.name ?? 'Catálogo de cortadores',
      content_category: 'cortadores-e-marcadores',
      placement,
      destination_type: product?.shopeeUrl?.trim() ? 'product' : 'store',
      destination_url: product ? this.productUrl(product) : this.storeUrl,
      conversion_step: 'shopee_outbound_click',
    };

    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
      const value = this.route.snapshot.queryParamMap.get(key);
      if (value) context[key] = value;
    }

    // Sinal de intenção: saída para a loja, sem afirmar compra ou contato captado.
    this.analytics.track('clickShopee', context);
  }
}
