import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ServicesPage } from './services.page';

const routes: Routes = [
  {
    path: '',
    component: ServicesPage
  },
  {
    path: 'edit-service/:service_id',
    loadChildren: () => import('./edit-service/edit-service.module').then( m => m.EditServicePageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicesPageRoutingModule {}
