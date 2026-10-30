import { Location } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, provideRouter, RouterStateSnapshot, UrlTree } from '@angular/router';
import { App } from '../../../app';
import { AnalyticsService } from '../../../core/analytics.service';
import { ContinuityService } from '../../../core/continuity.service';
import { ProductAccessService } from './product-access.service';
import { productEntryGuard } from './product-access.guard';

describe('Página de vendas sem menus', () => {
  function appAt(path: string) {
    TestBed.configureTestingModule({ providers: [
      provideRouter([]),
      { provide: Location, useValue: { path: () => path } },
      { provide: AnalyticsService, useValue: {} },
      { provide: ContinuityService, useValue: {} },
    ] });
    return TestBed.runInInjectionContext(() => new App());
  }
  it('abre a oferta sem o shell quando venda=1', () => {
    expect(appAt('/produtos/refeicao-resolvida?venda=1').isLanding()).toBe(true);
  });
  it('aceita um nome rastreável de campanha', () => {
    expect(appAt('/produtos/refeicao-resolvida?venda=instagram-bio').isLanding()).toBe(true);
  });
  it('não ativa o modo para um valor vazio', () => {
    expect(appAt('/produtos/refeicao-resolvida?venda=').isLanding()).toBe(false);
  });
  it('aceita o atalho produtos', () => {
    expect(appAt('/produtos?venda=1').isLanding()).toBe(true);
  });
  it('mantém os menus na página de produtos normal', () => {
    expect(appAt('/produtos/refeicao-resolvida').isLanding()).toBe(false);
  });
  it('não remove menus de outra tela com o mesmo parâmetro', () => {
    expect(appAt('/compras?venda=1').isLanding()).toBe(false);
  });
  it('permite ver a oferta mesmo com acesso já salvo', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([]),
      { provide: ProductAccessService, useValue: { hasAccess: () => true } },
    ] });
    const route = { routeConfig: { path: 'produtos/refeicao-resolvida' }, queryParamMap: convertToParamMap({ venda: 'instagram-bio' }) } as ActivatedRouteSnapshot;
    expect(TestBed.runInInjectionContext(() => productEntryGuard(route, {} as RouterStateSnapshot))).toBe(true);
  });
  it('mantém o redirecionamento normal do comprador sem venda=1', () => {
    TestBed.configureTestingModule({ providers: [provideRouter([]),
      { provide: ProductAccessService, useValue: { hasAccess: () => true } },
    ] });
    const route = { routeConfig: { path: 'produtos/refeicao-resolvida' }, queryParamMap: convertToParamMap({}) } as ActivatedRouteSnapshot;
    expect(TestBed.runInInjectionContext(() => productEntryGuard(route, {} as RouterStateSnapshot))).toBeInstanceOf(UrlTree);
  });
});
