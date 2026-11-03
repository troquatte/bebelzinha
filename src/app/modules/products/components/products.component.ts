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
  readonly isDeliveryOffer = this.route.snapshot?.data?.['salesPromise'] === 'delivery';
  readonly videoStarted = signal(false);
  readonly variant = signal<SalesVariant>('a');
  readonly checkoutUrl = computed(() => this.isDeliveryOffer
    ? this.product.checkoutUrl + '&sck=bebel-sem-delivery'
    : checkoutUrlForVariant(this.product.checkoutUrl, this.variant()));
  private campaignParams: Record<string, string> = {};

  readonly samples = [
    { name: 'Frango, arroz e cenoura', image: 'images/recipes/frango-arroz-cenoura-v1.webp' },
    { name: 'Carne moída, batata e arroz', image: 'images/recipes/carne-moida-batata-arroz-v1.webp' },
    { name: 'Macarrão à bolonhesa', image: 'images/recipes/macarrao-bolonhesa-v1.webp' },
    { name: 'Omelete com arroz', image: 'images/recipes/omelete-tomate-queijo-arroz-v1.webp' },
  ];

  readonly deliverySteps = [
    { title: 'Escolha a refeição', text: 'Abra o cardápio e escolha uma das 22 opções para o almoço ou jantar. Você pode começar pelo prato que preferir.', image: 'escolha', alt: 'Tela real do produto com o seletor de refeições e a receita de frango com arroz e cenoura.' },
    { title: 'Ajuste as porções', text: 'Escolha Só hoje, com 2 porções, ou Hoje + outra refeição, com 4 no total. Os ingredientes e a lista acompanham sua escolha.', image: 'porcoes', alt: 'Tela real do produto com as opções Só hoje e Hoje mais outra refeição e a lista de ingredientes.' },
    { title: 'Acompanhe o preparo', text: 'Consulte os utensílios, os ingredientes e o modo de preparo. Marque cada etapa conforme terminar para seguir no seu ritmo.', image: 'preparo', alt: 'Tela real do produto com o modo de preparo e uma etapa marcada como concluída.' },
    { title: 'Marque o que já tem', text: 'Confira a lista no celular e marque o que já está em casa ou foi para o carrinho. Assim, fica fácil ver o que ainda falta pegar.', image: 'compras', alt: 'Tela real da lista de compras com Falta pegar e um ingrediente marcado em Já no carrinho.' },
  ];

  readonly benefits = [
    { icon: 'restaurant_menu', title: 'Escolha sem começar do zero', text: 'São 22 ideias de comida de casa para usar no almoço ou no jantar.' },
    { icon: 'groups', title: 'Prepare 2 ou 4 porções', text: 'Os ingredientes acompanham a quantidade que você escolher.' },
    { icon: 'shopping_cart', title: 'Leve a lista para o mercado', text: 'Confira os ingredientes e marque os itens pelo celular.' },
    { icon: 'checklist', title: 'Siga no seu ritmo', text: 'Passo a passo, marcações de preparo e orientações de conservação.' },
  ];

  readonly faqs = [
    ...(this.isDeliveryOffer ? [{ question: 'Eu recebo acesso no celular ou um PDF?', answer: 'Você recebe os dois na mesma compra: acesso às 22 refeições pelo navegador do celular, com porções, preparo e lista de compras interativos, e o PDF completo para baixar ou imprimir. O PDF é uma forma adicional de consultar as receitas; o acesso online também está incluído.' }] : []),
    { question: 'Preciso instalar algum aplicativo?', answer: 'Não. O Refeição Resolvida funciona no navegador do celular ou computador.' },
    { question: 'Como recebo e uso meu acesso?', answer: 'Depois da compra, siga as instruções para receber seu código. Toque em “Já comprei” nesta página e informe o código para acessar as refeições. Se trocar de navegador ou aparelho, poderá informar o código novamente.' },
    { question: 'A compra é uma assinatura?', answer: 'Não. O valor anunciado é um pagamento único de R$ 27,00, não uma mensalidade.' },
    { question: 'As receitas são todas rápidas ou têm vídeo?', answer: 'Cada receita traz seus passos e uma estimativa de tempo. Os tempos variam. Os vídeos de preparo individuais ainda não estão disponíveis.' },
    { question: 'Posso preparar para mais pessoas?', answer: 'O produto oferece seleção de 2 ou 4 porções. Você pode adaptar outras quantidades por conta própria.' },
    { question: 'Preciso seguir as refeições em ordem?', answer: 'Não. Você escolhe entre as 22 ideias para o almoço ou jantar conforme sua rotina.' },
  ];

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => {
      // A promessa independente não lê, sorteia ou grava uma variante do A/B.
      let experimentParams: Record<string, string>;
      if (this.isDeliveryOffer) {
        experimentParams = { sales_promise: 'sem-delivery' };
      } else {
        let saved: string | null = null;
        try { saved = localStorage.getItem(SALES_VARIANT_STORAGE_KEY); } catch { /* navegador sem armazenamento */ }
        const selected = resolveSalesVariant(params.get('ab'), this.route.snapshot?.data?.['variant'], saved, Math.random());
        this.variant.set(selected);
        if (params.get('ab') !== 'a' && params.get('ab') !== 'b' && !this.route.snapshot?.data?.['variant']) {
          try { localStorage.setItem(SALES_VARIANT_STORAGE_KEY, selected); } catch { /* sem persistência */ }
        }
        experimentParams = { sales_variant: selected.toUpperCase(), sales_experiment: SALES_EXPERIMENT_ID };
      }
      this.campaignParams = {
        product_id: this.product.id,
        sales_campaign: salesCampaign(params.get('venda')) ?? (this.isDeliveryOffer ? 'sem-delivery' : 'app'),
        ...experimentParams,
      };
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
        const value = params.get(key)?.trim();
        if (value) this.campaignParams[key] = value.slice(0, 100);
      }
      const sourceRecipe = publicRecipeSource(params.get('receita'));
      if (sourceRecipe) this.campaignParams['source_recipe'] = sourceRecipe;
      this.analytics.track('ProductSalesView', this.campaignParams);
    });
    inject(SeoService).update(this.isDeliveryOffer ? {
      title: 'Almoço e jantar sem depender do delivery | Refeição Resolvida',
      description: '22 soluções completas de refeição e o PDF completo para baixar ou imprimir. Refeição Resolvida da Bebel por R$ 27,00, pagamento único.',
      path: 'produtos/refeicao-resolvida/sem-delivery',
      indexable: false,
    } : {
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
