import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AnalyticsService } from '../../../core/analytics.service';
import { SeoService } from '../../../core/seo.service';
import { ProductsComponent } from '../components/products.component';
import { RecipeProductCtaComponent } from '../components/recipe-product-cta/recipe-product-cta.component';
import { MEAL_PRODUCT } from '../data/meal-product.config';
import { publicRecipeSource } from '../data/recipe-attribution';
import { ProductAccessService } from './product-access.service';

const slug = 'macarrao-ao-limao-sem-creme-de-leite';

describe('Interesse no produto a partir da receita', () => {
  it('oferece link interno com origem pública e registra só a ativação do CTA', async () => {
    const track = vi.fn();
    TestBed.configureTestingModule({ providers: [provideRouter([]), { provide: AnalyticsService, useValue: { track } }] });
    const fixture = TestBed.createComponent(RecipeProductCtaComponent);
    fixture.componentRef.setInput('recipeSlug', slug);
    fixture.detectChanges();
    const anchor: HTMLAnchorElement = fixture.nativeElement.querySelector('a');
    const url = new URL(anchor.href);
    expect(url.pathname).toBe(MEAL_PRODUCT.salesPath);
    expect(url.searchParams.get('venda')).toBe('blog-receita');
    expect(url.searchParams.get('receita')).toBe(slug);
    expect(url.searchParams.has('utm_source')).toBe(false);
    expect(track).not.toHaveBeenCalled();
    anchor.addEventListener('click', event => event.preventDefault());
    anchor.dispatchEvent(new MouseEvent('click', { button: 0, ctrlKey: true, bubbles: true }));
    expect(track).toHaveBeenCalledExactlyOnceWith('RecipeProductClick', {
      product_id: MEAL_PRODUCT.id, sales_campaign: 'blog-receita', source_recipe: slug, cta_position: 'after-preparation',
    });
  });

  it('mantém origem na visita e clique de checkout, e limpa ao trocar campanha', () => {
    const query = new BehaviorSubject(convertToParamMap({ venda: 'blog-receita', receita: slug, codigo: 'nao-enviar', ab: 'b' }));
    const track = vi.fn();
    TestBed.configureTestingModule({ providers: [
      { provide: ActivatedRoute, useValue: { queryParamMap: query, snapshot: { data: {} } } },
      { provide: AnalyticsService, useValue: { track } },
      { provide: SeoService, useValue: { update: () => {} } },
      { provide: ProductAccessService, useValue: { hasAccess: () => false } },
    ] });
    const component = TestBed.runInInjectionContext(() => new ProductsComponent());
    expect(track).toHaveBeenLastCalledWith('ProductSalesView', expect.objectContaining({ source_recipe: slug, sales_variant: 'B' }));
    component.trackCheckout('hero-b');
    expect(track).toHaveBeenLastCalledWith('ProductCheckoutClick', expect.objectContaining({ source_recipe: slug, sales_campaign: 'blog-receita', cta_position: 'hero-b', sales_variant: 'B' }));
    expect(track.mock.calls.at(-1)![1]).not.toHaveProperty('codigo');
    query.next(convertToParamMap({ venda: 'whatsapp', receita: 'receita-inexistente', ab: 'a' }));
    component.trackCheckout('final');
    expect(track).toHaveBeenLastCalledWith('ProductCheckoutClick', expect.objectContaining({ sales_campaign: 'whatsapp', sales_variant: 'A' }));
    expect(track.mock.calls.at(-1)![1]).not.toHaveProperty('source_recipe');
  });

  it('ignora texto livre, rascunho, slug desconhecido e parâmetro ausente', () => {
    for (const invalid of [null, '', 'nome@email.com', '../codigo', 'receita-inexistente', 'arroz-de-forno-com-legumes', 'a'.repeat(121)]) expect(publicRecipeSource(invalid)).toBeNull();
    expect(publicRecipeSource(slug)).toBe(slug);
  });
});
