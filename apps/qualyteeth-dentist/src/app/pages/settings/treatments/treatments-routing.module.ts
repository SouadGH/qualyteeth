import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreatmentsPage } from './treatments.page';

const routes: Routes = [
  {
    path: '',
    component: TreatmentsPage
  },
  {
    path: 'edit-treatment-definition/:def_id',
    loadChildren: () => import('./edit-treatment-definition/edit-treatment-definition.module').then( m => m.EditTreatmentDefinitionPageModule)
  },
  {
    path: 'add-act',
    loadChildren: () => import('./add-act/add-act.module').then( m => m.AddActPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatmentsPageRoutingModule {}
