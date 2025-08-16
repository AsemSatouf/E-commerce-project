import { RouterModule, Routes } from '@angular/router';
import { routes } from '../app.routes';

export const MAIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home').then(m => m.Home)
  }
];

