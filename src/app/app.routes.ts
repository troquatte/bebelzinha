import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
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
    path: '**',
    redirectTo: '',
  },
];
