import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'apps/qualyteeth-dentist/src/app/guards/auth.guard';

import { PatientPage } from './patient.page';

const routes: Routes = [
  {
    path: '',
    component: PatientPage
  },
  {
    path: ':patient_id/visit',
    loadChildren: () => import('./visit/visit.module').then( m => m.VisitPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientPageRoutingModule {}
