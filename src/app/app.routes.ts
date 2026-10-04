import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/home.component').then(({ HomeComponent }) => HomeComponent),
  },
  {
    path: 'compras',
    loadComponent: () =>
      import('./modules/shopping/shopping-lists.component').then(
        ({ ShoppingListsComponent }) => ShoppingListsComponent,
      ),
  },
  {
    path: 'compras/:listId',
    loadComponent: () =>
      import('./modules/shopping/shopping-list.component').then(
        ({ ShoppingListComponent }) => ShoppingListComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
