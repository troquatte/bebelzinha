import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../core/analytics.service';
import { SeoService } from '../../../core/seo.service';
import { MEAL_PRODUCT } from '../data/meal-product.config';
import { publicRecipeSource } from '../data/recipe-attribution';
import { salesCampaign } from '../data/sales-campaign';
import { ProductAccessService } from '../service/product-access.service';
import { SALES_EXPERIMENT_ID, SALES_VARIANT_STORAGE_KEY, checkoutUrlForVariant, resolveSalesVariant, SalesVariant } from '../service/sales-experiment';

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
  readonly access = inject(ProductAccessService);
  readonly product = MEAL_PRODUCT;
  readonly videoStarted = signal(false);
  readonly variant = signal<SalesVariant>('a');
  readonly checkoutUrl = computed(() => checkoutUrlForVariant(this.product.checkoutUrl, this.variant()));
  private campaignParams: Record<string, string> = {};

  readonly samples = [
    { name: 'Frango, arroz e cenoura', image: 'images/recipes/frango-arroz-cenoura-v1.webp' },
    { name: 'Carne moída, batata e arroz', image: 'images/recipes/carne-moida-batata-arroz-v1.webp' },
    { name: 'Macarrão à bolonhesa', image: 'images/recipes/macarrao-bolonhesa-v1.webp' },
    { name: 'Omelete com arroz', image: 'images/recipes/omelete-tomate-queijo-arroz-v1.webp' },
  ];

  readonly benefits = [
    { icon: 'restaurant_menu', title: 'Escolha sem começar do zero', text: 'São 22 ideias de comida de casa para usar no almoço ou no jantar.' },
    { icon: 'groups', title: 'Prepare 2 ou 4 porções', text: 'Os ingredientes acompanham a quantidade que você escolher.' },
    { icon: 'shopping_cart', title: 'Leve a lista para o mercado', text: 'Confira os ingredientes e marque os itens pelo celular.' },
    { icon: 'checklist', title: 'Siga no seu ritmo', text: 'Passo a passo, marcações de preparo e orientações de conservação.' },
  ];

  readonly faqs = [
    { question: 'Preciso instalar algum aplicativo?', answer: 'Não. O Refeição Resolvida funciona no navegador do celular ou computador.' },
    { question: 'Como recebo e uso meu acesso?', answer: 'Depois da compra, siga as instruções para receber seu código. Toque em “Já comprei” nesta página e informe o código para acessar as refeições. Se trocar de navegador ou aparelho, poderá informar o código novamente.' },
    { question: 'A compra é uma assinatura?', answer: 'Não. O valor anunciado é um pagamento único de R$ 27,00, não uma mensalidade.' },
    { question: 'As receitas são todas rápidas ou têm vídeo?', answer: 'Cada receita traz seus passos e uma estimativa de tempo. Os tempos variam. Os vídeos de preparo individuais ainda não estão disponíveis.' },
    { question: 'Posso preparar para mais pessoas?', answer: 'O produto oferece seleção de 2 ou 4 porções. Você pode adaptar outras quantidades por conta própria.' },
    { question: 'Preciso seguir as refeições em ordem?', answer: 'Não. Você escolhe entre as 22 ideias para o almoço ou jantar conforme sua rotina.' },
  ];

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => {
      let saved: string | null = null;
      try { saved = localStorage.getItem(SALES_VARIANT_STORAGE_KEY); } catch { /* navegador sem armazenamento */ }
      const selected = resolveSalesVariant(params.get('ab'), this.route.snapshot.data['variant'], saved, Math.random());
      this.variant.set(selected);
      if (params.get('ab') !== 'a' && params.get('ab') !== 'b' && !this.route.snapshot.data['variant']) {
        try { localStorage.setItem(SALES_VARIANT_STORAGE_KEY, selected); } catch { /* sem persistência */ }
      }
      this.campaignParams = {
        product_id: this.product.id,
        sales_campaign: salesCampaign(params.get('venda')) ?? 'app',
        sales_variant: selected.toUpperCase(),
        sales_experiment: SALES_EXPERIMENT_ID,
      };
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
        const value = params.get(key)?.trim();
        if (value) this.campaignParams[key] = value.slice(0, 100);
      }
      const sourceRecipe = publicRecipeSource(params.get('receita'));
      if (sourceRecipe) this.campaignParams['source_recipe'] = sourceRecipe;
      this.analytics.track('ProductSalesView', this.campaignParams);
    });
    inject(SeoService).update({
      title: 'Refeição Resolvida | 22 refeições caseiras com a Bebel',
      description: 'Escolha entre 22 refeições caseiras. Ingredientes, porções e lista de compras organizados no celular, por R$ 27,00 em pagamento único.',
      path: 'produtos/refeicao-resolvida',
    });
  }

  trackCheckout(position: string): void {
    this.analytics.track('ProductCheckoutClick', { ...this.campaignParams, cta_position: position });
  }

  async playPresentation(video: HTMLVideoElement): Promise<void> {
    this.videoStarted.set(true);
    try {
      await video.play();
      this.analytics.track('ProductVideoPlay', this.campaignParams);
    } catch { this.videoStarted.set(false); }
  }
}
