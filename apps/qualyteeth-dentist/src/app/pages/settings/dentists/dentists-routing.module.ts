import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DentistsPage } from './dentists.page';

const routes: Routes = [
  {
    path: '',
    component: DentistsPage
  },
  {
    path: 'link-service',
    loadChildren: () => import('./link-service/link-service.module').then( m => m.LinkServicePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentistsPageRoutingModule {}
