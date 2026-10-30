import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { salesCampaign } from '../data/sales-campaign';
import { ProductAccessService } from './product-access.service';

export const productAccessGuard: CanActivateFn = route => {
  if (inject(ProductAccessService).hasAccess()) return true;
  const day = route.queryParamMap.get('dia');
  return inject(Router).createUrlTree(['/produtos/refeicao-resolvida/acessar'], {
    queryParams: day && /^(?:[1-9]|1\d|2[0-2])$/.test(day) ? { dia: day } : {},
  });
};

// A apresentação continua acessível por escolha explícita, inclusive para compradores.
export const productEntryGuard: CanActivateFn = route => {
  const preview = route.routeConfig?.path === 'produtos/refeicao-resolvida' && (route.queryParamMap.get('apresentacao') === '1' || salesCampaign(route.queryParamMap.get('venda')) !== null);
  if (!inject(ProductAccessService).hasAccess() || preview) return true;
  const day = route.queryParamMap.get('dia');
  return inject(Router).createUrlTree(['/jantar-resolvido'], {
    queryParams: day && /^(?:[1-9]|1\d|2[0-2])$/.test(day) ? { dia: day } : {},
  });
};

// Links do material de acesso também podem apontar para a raiz do site.
export const productLinkGuard: CanActivateFn = route => {
  const code = route.queryParamMap.get('codigo');
  if (code === null) return true;
  const day = route.queryParamMap.get('dia');
  return inject(Router).createUrlTree(['/produtos/refeicao-resolvida/acessar'], {
    queryParams: {
      codigo: code,
      dia: day && /^(?:[1-9]|1\d|2[0-2])$/.test(day) ? day : '1',
    },
  });
};
