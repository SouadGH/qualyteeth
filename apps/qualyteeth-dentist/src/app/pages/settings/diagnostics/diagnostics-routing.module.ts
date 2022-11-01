import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagnosticsPage } from './diagnostics.page';

const routes: Routes = [
  {
    path: '',
    component: DiagnosticsPage
  },
  {
    path: 'edit-diagnostic-definition/:def_id',
    loadChildren: () => import('./edit-diagnostic-definition/edit-diagnostic-definition.module').then( m => m.EditDiagnosticDefinitionPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosticsPageRoutingModule {}
