import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditDiagnosticDefinitionPageRoutingModule } from './edit-diagnostic-definition-routing.module';

import { EditDiagnosticDefinitionPage } from './edit-diagnostic-definition.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditDiagnosticDefinitionPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [EditDiagnosticDefinitionPage]
})
export class EditDiagnosticDefinitionPageModule {}
