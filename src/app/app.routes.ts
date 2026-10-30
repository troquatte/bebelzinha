import { Routes } from '@angular/router';
import { productAccessGuard, productEntryGuard, productLinkGuard } from './modules/products/service/product-access.guard';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [productLinkGuard],
    loadComponent: () =>
      import('./modules/home/components/home.component').then(({ HomeComponent }) => HomeComponent),
  },
  {
    path: 'comidinhas',
    loadComponent: () =>
      import('./modules/meals/components/meals.component').then(
        ({ MealsComponent }) => MealsComponent,
      ),
  },

  {
    path: 'compras',
    loadComponent: () =>
      import('./modules/shopping/components/shopping-lists.component').then(
        ({ ShoppingListsComponent }) => ShoppingListsComponent,
      ),
  },
  {
    path: 'compras/:listId',
    loadComponent: () =>
      import('./modules/shopping/components/shopping-list.component').then(
        ({ ShoppingListComponent }) => ShoppingListComponent,
      ),
  },
  {
    path: 'wpp-bebelzinha',
    loadComponent: () =>
      import('./modules/wpp/components/wpp-bebelzinha.component').then(
        ({ WppBebelzinhaComponent }) => WppBebelzinhaComponent,
      ),
  },
  {
    path: 'cortadores',
    loadComponent: () =>
      import('./modules/cutters/components/cutters.component').then(
        ({ CuttersComponent }) => CuttersComponent,
      ),
  },
  {
    path: 'jantar-resolvido',
    canActivate: [productAccessGuard],
    loadComponent: () => import('./modules/dinner-plan/components/dinner-plan.component').then(({ DinnerPlanComponent }) => DinnerPlanComponent),
  },
  {
    path: 'produtos', pathMatch: 'full', redirectTo: 'produtos/refeicao-resolvida',
  },
  {
    path: 'produtos/refeicao-resolvida',
    canActivate: [productEntryGuard],
    loadComponent: () => import('./modules/products/components/products.component').then(({ ProductsComponent }) => ProductsComponent),
  },
  {
    path: 'produtos/refeicao-resolvida/acessar',
    canActivate: [productEntryGuard],
    loadComponent: () => import('./modules/products/components/product-access.component').then(({ ProductAccessComponent }) => ProductAccessComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
