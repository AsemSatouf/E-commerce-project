// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/main.routes').then(m => m.MAIN_ROUTES)
  },
   {
    path: 'products',
    loadChildren: () => import('./products/products-routing.module').then(m => m.routes)
  },
    {
    path: 'checkout', 
    loadComponent: () => import('./check-out/check-out').then(c => c.CheckOut)
  }
];
export const appConfig = {
  anchorScrolling: 'enabled'
};
