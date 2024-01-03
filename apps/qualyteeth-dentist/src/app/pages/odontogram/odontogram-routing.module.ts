import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OdontogramPage } from './odontogram.page';

const routes: Routes = [
  {
    path: '',
    component: OdontogramPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OdontogramPageRoutingModule {}
