import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditTreatmentDefinitionPage } from './edit-treatment-definition.page';

const routes: Routes = [
  {
    path: '',
    component: EditTreatmentDefinitionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditTreatmentDefinitionPageRoutingModule {}
