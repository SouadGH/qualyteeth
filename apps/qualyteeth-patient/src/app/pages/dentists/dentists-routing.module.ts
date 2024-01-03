import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DentistsPage } from './dentists.page';

const routes: Routes = [
  {
    path: '',
    component: DentistsPage
  },

  {
    path: ':dentist_id',
    loadChildren: () => import('../../pages/dentist/dentist.module').then(m => m.DentistPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DentistsPageRoutingModule { }
