import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnalyticsService } from '../../../../core/analytics.service';
import { MEAL_PRODUCT } from '../../data/meal-product.config';
import { publicRecipeSource } from '../../data/recipe-attribution';

@Component({
  selector: 'app-recipe-product-cta',
  imports: [RouterLink],
  template: `
    <aside class="recipe-offer" aria-label="Conheça o Refeição Resolvida">
      <div class="recipe-offer__content">
        <span class="recipe-offer__label"><span class="material-symbols-outlined" aria-hidden="true">favorite</span>Uma ajudinha da Bebel para sua rotina</span>
        <h2>Sem ideia do que fazer de almoço ou jantar?</h2>
        <p>A Bebel separou 22 refeições caseiras para facilitar sua rotina! Escolha o prato, ajuste para 2 ou 4 pessoas e tenha o preparo e a lista de compras no celular.</p>
        <div class="recipe-offer__chips"><span>Comida de casa</span><span>2 ou 4 pessoas</span><span>No celular</span></div>
        <div class="recipe-offer__footer">
          <span class="recipe-offer__price"><strong>{{ product.price }}</strong><span>Pagamento único</span></span>
          <a [routerLink]="product.salesPath" [queryParams]="queryParams()" (click)="trackInterest()">Conhecer o {{ product.name }}<span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span></a>
        </div>
      </div>
      <div class="recipe-offer__visual">
        <div class="recipe-offer__photo"><img src="images/recipes/frango-arroz-cenoura-v1.webp" alt="Imagem ilustrativa de frango dourado com arroz e cenoura" width="720" height="450" loading="lazy" /></div>
        <img class="recipe-offer__portrait" src="images/bebel/bebel-roxa.jpg" alt="Bebel, personagem da marca" width="160" height="160" loading="lazy" />
        <span class="recipe-offer__stamp"><strong>22</strong><span>refeições<br />para escolher</span></span>
        <span class="recipe-offer__note">Imagem ilustrativa da receita</span>
      </div>
    </aside>
  `,
  styleUrl: './recipe-product-cta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecipeProductCtaComponent {
  readonly recipeSlug = input.required<string>();
  readonly product = MEAL_PRODUCT;
  private readonly analytics = inject(AnalyticsService);
  private readonly source = computed(() => publicRecipeSource(this.recipeSlug()));
  readonly queryParams = computed(() => ({ venda: 'blog-receita', ...(this.source() ? { receita: this.source()! } : {}) }));

  trackInterest(): void {
    this.analytics.track('RecipeProductClick', {
      product_id: this.product.id,
      sales_campaign: 'blog-receita',
      cta_position: 'after-preparation',
      ...(this.source() ? { source_recipe: this.source()! } : {}),
    });
  }
}
