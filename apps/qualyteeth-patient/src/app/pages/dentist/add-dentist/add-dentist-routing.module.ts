import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddDentistPage } from './add-dentist.page';

const routes: Routes = [
  {
    path: '',
    component: AddDentistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddDentistPageRoutingModule {}
