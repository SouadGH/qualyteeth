import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarketplacePage } from './marketplace.page';

const routes: Routes = [
  {
    path: '',
    component: MarketplacePage
  },
  {
    path: 'categories',
    loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MarketplacePageRoutingModule {}
