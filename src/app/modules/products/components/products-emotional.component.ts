import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../core/analytics.service';
import { SeoService } from '../../../core/seo.service';
import { MEAL_PRODUCT } from '../data/meal-product.config';
import { publicRecipeSource } from '../data/recipe-attribution';
import { salesCampaign } from '../data/sales-campaign';
import { ProductAccessService } from '../service/product-access.service';

/**
 * Nova página principal, centrada no alívio da rotina. As versões A/B originais
 * continuam isoladas em /teste-a e /teste-b para comparação e reversão.
 */
@Component({
  selector: 'app-products-emotional',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './products-emotional.component.html',
  styleUrl: './products-emotional.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsEmotionalComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);
  readonly access = inject(ProductAccessService);
  readonly product = MEAL_PRODUCT;
  readonly videoStarted = signal(false);
  private campaignParams: Record<string, string> = {};

  // SCK fixo e exclusivo da nova proposta para não contaminar as variantes antigas.
  readonly checkoutUrl = `${MEAL_PRODUCT.checkoutUrl}${MEAL_PRODUCT.checkoutUrl.includes('?') ? '&' : '?'}sck=bebel-alivio-v3`;

  readonly screenshots = [
    {
      title: 'Escolha o que preparar',
      summary: 'Uma refeição de cada vez, sem ficar pulando entre várias receitas.',
      image: 'escolha',
      alt: 'Tela real do produto mostrando a escolha de uma refeição e sua receita.',
    },
    {
      title: 'Ajuste as porções',
      summary: 'Ingredientes adaptados para 2 ou 4 porções.',
      image: 'porcoes',
      alt: 'Tela real com as opções de 2 ou 4 porções e os ingredientes.',
    },
    {
      title: 'Siga o preparo',
      summary: 'Passos para acompanhar e marcar enquanto cozinha.',
      image: 'preparo',
      alt: 'Tela real de modo de preparo com etapas marcadas.',
    },
    {
      title: 'Confira a lista',
      summary: 'Veja o que falta e marque o que já tem em casa.',
      image: 'compras',
      alt: 'Tela real da lista interativa de compras com ingredientes marcados.',
    },
  ];

  readonly recipes = [
    { name: 'Frango, arroz e cenoura', image: 'images/recipes/frango-arroz-cenoura-v1.webp' },
    { name: 'Carne moída, batata e arroz', image: 'images/recipes/carne-moida-batata-arroz-v1.webp' },
    { name: 'Macarrão à bolonhesa', image: 'images/recipes/macarrao-bolonhesa-v1.webp' },
    { name: 'Omelete com arroz', image: 'images/recipes/omelete-tomate-queijo-arroz-v1.webp' },
  ];

  readonly questions = [
    {
      question: 'O que recebo quando compro?',
      answer: 'Acesso pelo navegador às 22 refeições caseiras, com ingredientes para 2 ou 4 porções, passo a passo de preparo e checklist interativo de compras.',
    },
    {
      question: 'Como vou receber meu acesso?',
      answer: 'A compra é feita pela Hotmart. Depois de comprar, siga as instruções de entrega do seu código de acesso. Com ele, entre em “Já comprei” nesta página para abrir as refeições.',
    },
    {
      question: 'Preciso instalar um aplicativo?',
      answer: 'Não. Você usa no navegador do celular ou computador.',
    },
    {
      question: 'Pago todo mês?',
      answer: 'Não. O Refeição Resolvida custa R$ 27,00 em pagamento único, sem assinatura.',
    },
    {
      question: 'As refeições vêm com vídeo de preparo?',
      answer: 'Não há vídeos individuais de preparo para cada refeição. Você recebe as instruções passo a passo. O vídeo desta página mostra como utilizar a ferramenta.',
    },
    {
      question: 'Posso preparar para mais de quatro pessoas?',
      answer: 'A ferramenta oferece ajuste de ingredientes para 2 ou 4 porções. Outras quantidades precisam ser adaptadas por você.',
    },
    {
      question: 'Preciso cozinhar as receitas em uma ordem específica?',
      answer: 'Não. Você escolhe as refeições que fizerem sentido para sua rotina.',
    },
  ];

  constructor() {
    this.route.queryParamMap.pipe(takeUntilDestroyed()).subscribe(params => {
      const campaign: Record<string, string> = {
        product_id: this.product.id,
        sales_campaign: salesCampaign(params.get('venda')) ?? 'app',
        sales_variant: 'ALIVIO_V3',
        sales_experiment: 'refeicao-resolvida-alivio-v3',
      };
      for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term']) {
        const value = params.get(key)?.trim();
        if (value) campaign[key] = value.slice(0, 100);
      }
      const sourceRecipe = publicRecipeSource(params.get('receita'));
      if (sourceRecipe) campaign['source_recipe'] = sourceRecipe;
      this.campaignParams = campaign;
      this.analytics.track('ProductSalesView', campaign);
    });

    this.seo.update({
      title: 'Refeição Resolvida da Bebel | Uma preocupação a menos no jantar',
      description: 'Depois de um dia cheio, facilite a escolha do almoço ou jantar. 22 refeições caseiras, porções ajustáveis e lista de compras no celular. R$ 27, pagamento único.',
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
    } catch {
      this.videoStarted.set(false);
    }
  }
}
