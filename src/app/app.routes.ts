import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/home.component').then(({ HomeComponent }) => HomeComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
