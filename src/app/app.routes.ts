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
      import('./modules/meals/components/meals.component').then(({ MealsComponent }) => MealsComponent),
  },
  {
    path: 'comidinhas/:slug',
    loadComponent: () =>
      import('./modules/meals/components/recipe.component').then(({ RecipeComponent }) => RecipeComponent),
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
    path: '**',
    redirectTo: '',
  },
];
