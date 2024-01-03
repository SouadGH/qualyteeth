import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'apps/qualyteeth-dentist/src/app/guards/auth.guard';

import { PatientsPage } from './patients.page';

const routes: Routes = [
  {
    path: '',
    component: PatientsPage
  },
  {
    path: 'patient/:patient_id',
    loadChildren: () => import('./patient/patient.module').then(m => m.PatientPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add',
    loadChildren: () => import('./add-patient/add-patient.module').then(m => m.AddPatientPageModule),
    canActivate: [AuthGuard]
  },
   {
     path: 'patient/:patient_id/visit',
     loadChildren: () => import('./patient/visit/visit.module').then( m => m.VisitPageModule),
     canActivate: [AuthGuard]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsPageRoutingModule { }
