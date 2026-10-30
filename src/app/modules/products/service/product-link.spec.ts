import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap, provideRouter, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { SeoService } from '../../../core/seo.service';
import { ProductAccessComponent } from '../components/product-access.component';
import { ProductAccessService } from './product-access.service';
import { productLinkGuard } from './product-access.guard';

describe('Links do material de acesso', () => {
  function guard(params: Record<string, string>) {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const route = { queryParamMap: convertToParamMap(params) } as ActivatedRouteSnapshot;
    return TestBed.runInInjectionContext(() => productLinkGuard(route, {} as RouterStateSnapshot));
  }

  it('mantém a home normal quando não há código', () => {
    expect(guard({})).toBe(true);
  });

  it('encaminha o código da home para o formulário, começando no dia 1', () => {
    const result = guard({ codigo: '482719' }) as UrlTree;
    expect(TestBed.inject(Router).serializeUrl(result)).toBe('/produtos/refeicao-resolvida/acessar?codigo=482719&dia=1');
  });

  it('preserva um dia válido e normaliza um dia inválido', () => {
    const valid = guard({ codigo: '482719', dia: '22' }) as UrlTree;
    expect(valid.queryParams['dia']).toBe('22');
    TestBed.resetTestingModule();
    const invalid = guard({ codigo: '482719', dia: '99' }) as UrlTree;
    expect(invalid.queryParams['dia']).toBe('1');
  });

  it('preenche o formulário antes de validar e mantém o código incorreto para correção', async () => {
    const navigate = vi.fn().mockResolvedValue(true);
    const unlock = vi.fn().mockResolvedValue(false);
    TestBed.configureTestingModule({ providers: [
      { provide: Router, useValue: { navigate } },
      { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap({ codigo: '000000', dia: '1' }), queryParams: { codigo: '000000', dia: '1' } } } },
      { provide: ProductAccessService, useValue: { hasAccess: () => false, unlock } },
      { provide: SeoService, useValue: { update: () => {} } },
    ] });
    const component = TestBed.runInInjectionContext(() => new ProductAccessComponent());
    expect(component.code()).toBe('000000');
    expect(component.busy()).toBe(true);
    await vi.waitFor(() => expect(component.busy()).toBe(false));
    expect(unlock).toHaveBeenCalledWith('000000');
    expect(component.error()).toContain('Esse link não liberou');
    expect(navigate.mock.calls[0][1].queryParams).toEqual({ dia: '1' });
    expect(navigate).toHaveBeenCalledTimes(1);
  });

  it('abre o produto no dia indicado quando o código é válido', async () => {
    const navigate = vi.fn().mockResolvedValue(true);
    TestBed.configureTestingModule({ providers: [
      { provide: Router, useValue: { navigate } },
      { provide: ActivatedRoute, useValue: { snapshot: { queryParamMap: convertToParamMap({ codigo: '482719', dia: '3' }), queryParams: { codigo: '482719', dia: '3' } } } },
      { provide: ProductAccessService, useValue: { hasAccess: () => false, unlock: vi.fn().mockResolvedValue(true) } },
      { provide: SeoService, useValue: { update: () => {} } },
    ] });
    const component = TestBed.runInInjectionContext(() => new ProductAccessComponent());
    await vi.waitFor(() => expect(component.busy()).toBe(false));
    expect(navigate).toHaveBeenLastCalledWith(['/jantar-resolvido'], { queryParams: { dia: '3' }, replaceUrl: true });
    expect(component.error()).toBe('');
  });
});
