import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JoinSurgeryPage } from './join-surgery.page';

const routes: Routes = [
  {
    path: '',
    component: JoinSurgeryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinSurgeryPageRoutingModule {}
