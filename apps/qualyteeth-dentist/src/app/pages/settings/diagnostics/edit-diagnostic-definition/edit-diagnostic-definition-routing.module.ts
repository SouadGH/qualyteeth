import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDiagnosticDefinitionPage } from './edit-diagnostic-definition.page';

const routes: Routes = [
  {
    path: '',
    component: EditDiagnosticDefinitionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditDiagnosticDefinitionPageRoutingModule {}
