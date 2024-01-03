import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SurgeryPage } from './surgery.page';

const routes: Routes = [
  {
    path: '',
    component: SurgeryPage
  },
  {
    path: 'edit-surgery/:surgery_id',
    loadChildren: () => import('./edit-surgery/edit-surgery.module').then( m => m.EditSurgeryPageModule)
  },
  {
    path: 'join-surgery/',
    loadChildren: () => import('./join-surgery/join-surgery.module').then( m => m.JoinSurgeryPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SurgeryPageRoutingModule {}
