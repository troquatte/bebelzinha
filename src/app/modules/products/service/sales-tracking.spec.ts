import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AnalyticsService } from '../../../core/analytics.service';
import { SeoService } from '../../../core/seo.service';
import { ProductsComponent } from '../components/products.component';
import { ProductAccessService } from './product-access.service';

describe('Origem da página de vendas', () => {
  const params = { venda: 'instagram-bio', utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'refeicao-resolvida', codigo: 'nao-enviar' };
  function setup() {
    const query = new BehaviorSubject(convertToParamMap(params));
    const track = vi.fn();
    TestBed.configureTestingModule({ providers: [
      { provide: ActivatedRoute, useValue: { queryParamMap: query } },
      { provide: AnalyticsService, useValue: { track } },
      { provide: SeoService, useValue: { update: () => {} } },
      { provide: ProductAccessService, useValue: { hasAccess: () => false } },
    ] });
    return { component: TestBed.runInInjectionContext(() => new ProductsComponent()), track, query };
  }
  it('registra a visita com campanha e UTMs sem transmitir o código', () => {
    const { track } = setup();
    expect(track).toHaveBeenCalledWith('ProductSalesView', {
      product_id: 'refeicao-resolvida', sales_campaign: 'instagram-bio',
      utm_source: 'instagram', utm_medium: 'social', utm_campaign: 'refeicao-resolvida',
    });
    expect(track.mock.calls[0][1]).not.toHaveProperty('codigo');
  });
  it('registra play somente quando o vídeo consegue iniciar', async () => {
    const { component, track } = setup();
    await component.playPresentation({ play: () => Promise.reject(new Error('bloqueado')) } as HTMLVideoElement);
    expect(component.videoStarted()).toBe(false);
    expect(track.mock.calls.filter(c => c[0] === 'ProductVideoPlay')).toHaveLength(0);
    await component.playPresentation({ play: () => Promise.resolve() } as HTMLVideoElement);
    expect(track).toHaveBeenLastCalledWith('ProductVideoPlay', expect.objectContaining({ sales_campaign: 'instagram-bio' }));
  });
  it('atualiza a origem ao mudar a campanha e acompanha o clique de compra', () => {
    const { component, query, track } = setup();
    query.next(convertToParamMap({ venda: 'whatsapp' }));
    component.trackCheckout();
    expect(track).toHaveBeenLastCalledWith('ProductCheckoutClick', {
      product_id: 'refeicao-resolvida', sales_campaign: 'whatsapp',
    });
  });
});
