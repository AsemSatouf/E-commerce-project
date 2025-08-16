import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: ':category',
    loadComponent: () => import('./products-component/products-component').then(m => m.ProductsComponentm)
  },
  {
    path: '',
    redirectTo: 'all',
    pathMatch: 'full'
  }
];

