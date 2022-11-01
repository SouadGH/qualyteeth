import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LinkServicePage } from './link-service.page';

const routes: Routes = [
  {
    path: '',
    component: LinkServicePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LinkServicePageRoutingModule {}
