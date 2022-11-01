import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditSurgeryPage } from './edit-surgery.page';

const routes: Routes = [
  {
    path: '',
    component: EditSurgeryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditSurgeryPageRoutingModule {}
