import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateSurgeryPage } from './create-surgery.page';

const routes: Routes = [
  {
    path: '',
    component: CreateSurgeryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateSurgeryPageRoutingModule {}
