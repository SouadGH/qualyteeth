import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ToothPage } from './tooth.page';

const routes: Routes = [
  {
    path: '',
    component: ToothPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ToothPageRoutingModule {}
