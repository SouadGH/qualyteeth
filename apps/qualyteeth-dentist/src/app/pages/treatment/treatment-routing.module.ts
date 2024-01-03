import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredicamentPage } from './treatment.page';

const routes: Routes = [
  {
    path: '',
    component: PredicamentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatmentPageRoutingModule {}
