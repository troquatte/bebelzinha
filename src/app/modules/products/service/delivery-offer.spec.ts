import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, provideRouter, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AnalyticsService } from '../../../core/analytics.service';
import { SeoService } from '../../../core/seo.service';
import { ProductsComponent } from '../components/products.component';
import { ProductAccessService } from './product-access.service';
import { productEntryGuard } from './product-access.guard';
import { SALES_VARIANT_STORAGE_KEY } from './sales-experiment';

describe('Promessa independente de delivery', () => {
  function setup() {
    const query = new BehaviorSubject(convertToParamMap({ab:'b',venda:'instagram',utm_content:'delivery-01',codigo:'nao-enviar'}));
    const track=vi.fn(),update=vi.fn();
    TestBed.configureTestingModule({providers:[
      {provide:ActivatedRoute,useValue:{queryParamMap:query,snapshot:{data:{salesPromise:'delivery'}}}},
      {provide:AnalyticsService,useValue:{track}},
      {provide:SeoService,useValue:{update}},
      {provide:ProductAccessService,useValue:{hasAccess:()=>false}},
    ]});
    return {component:TestBed.runInInjectionContext(()=>new ProductsComponent()),track,query,update};
  }
  it('ignora ab=b e não lê, grava ou sorteia variante do experimento',()=>{
    const read=vi.spyOn(Storage.prototype,'getItem'),write=vi.spyOn(Storage.prototype,'setItem'),random=vi.spyOn(Math,'random');
    const {component}=setup();
    expect(component.isDeliveryOffer).toBe(true);
    expect(component.variant()).toBe('a');
    expect(read.mock.calls.some(args=>args[0]===SALES_VARIANT_STORAGE_KEY)).toBe(false);
    expect(write.mock.calls.some(args=>args[0]===SALES_VARIANT_STORAGE_KEY)).toBe(false);
    expect(random).not.toHaveBeenCalled();
    const checkout=new URL(component.checkoutUrl());
    expect(checkout.searchParams.get('sck')).toBe('bebel-sem-delivery');
    vi.restoreAllMocks();
  });
  it('identifica a promessa nos eventos, preserva UTMs e não atribui a A/B',()=>{
    const {component,track,query,update}=setup();
    const visit=track.mock.calls.find(c=>c[0]==='ProductSalesView')![1];
    expect(visit).toMatchObject({sales_promise:'sem-delivery',sales_campaign:'instagram',utm_content:'delivery-01'});
    for(const key of ['sales_variant','sales_experiment','codigo'])expect(visit).not.toHaveProperty(key);
    query.next(convertToParamMap({ab:'a'}));
    component.trackCheckout('hero-delivery');
    expect(track).toHaveBeenLastCalledWith('ProductCheckoutClick',{
      product_id:'refeicao-resolvida',sales_campaign:'sem-delivery',sales_promise:'sem-delivery',cta_position:'hero-delivery',
    });
    expect(update).toHaveBeenCalledWith(expect.objectContaining({path:'produtos/refeicao-resolvida/sem-delivery',indexable:false}));
    expect(component.faqs.some(faq=>faq.answer.includes('PDF completo'))).toBe(true);
  });
  it('mantém a nova oferta acessível ao comprador sem depender de query',()=>{
    TestBed.configureTestingModule({providers:[provideRouter([]),{provide:ProductAccessService,useValue:{hasAccess:()=>true}}]});
    const route={routeConfig:{path:'produtos/refeicao-resolvida/sem-delivery',data:{salesPromise:'delivery'}},queryParamMap:convertToParamMap({})} as unknown as ActivatedRouteSnapshot;
    expect(TestBed.runInInjectionContext(()=>productEntryGuard(route,{} as RouterStateSnapshot))).toBe(true);
  });
});

