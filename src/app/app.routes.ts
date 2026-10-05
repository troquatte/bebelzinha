import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/home.component').then(({ HomeComponent }) => HomeComponent),
  },
  {
    path: 'comidinhas',
    loadComponent: () =>
      import('./modules/meals/meals.component').then(({ MealsComponent }) => MealsComponent),
  },
  {
    path: 'comidinhas/:slug',
    loadComponent: () =>
      import('./modules/meals/recipe.component').then(({ RecipeComponent }) => RecipeComponent),
  },
  {
    path: 'achadinhos',
    loadComponent: () =>
      import('./modules/findings/findings.component').then(({ FindingsComponent }) => FindingsComponent),
  },
  {
    path: 'achadinhos/:slug',
    loadComponent: () =>
      import('./modules/findings/finding.component').then(({ FindingComponent }) => FindingComponent),
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
