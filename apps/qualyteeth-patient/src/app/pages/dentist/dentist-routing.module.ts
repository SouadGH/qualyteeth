import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DentistPage } from './dentist.page';

const routes: Routes = [
  {
    path: '',
    component: DentistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentistPageRoutingModule {}
