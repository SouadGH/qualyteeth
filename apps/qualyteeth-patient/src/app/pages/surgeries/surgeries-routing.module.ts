import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurgeriesPage } from './surgeries.page';

const routes: Routes = [
  {
    path: '',
    component: SurgeriesPage
  },
  {
    path: 'add-surgery',
    loadChildren: () => import('./add-surgery/add-surgery.module').then( m => m.AddSurgeryPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurgeriesPageRoutingModule {}
