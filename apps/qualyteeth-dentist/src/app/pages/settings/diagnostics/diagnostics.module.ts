import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosticsPageRoutingModule } from './diagnostics-routing.module';

import { DiagnosticsPage, EditDiagnosticDefinitionPopover } from './diagnostics.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';
import { DentistPipeModule } from 'apps/qualyteeth-dentist/src/app/pipes/dentistPipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DiagnosticsPageRoutingModule,
    MaterialModule,
    DentistPipeModule
  ],
  declarations: [DiagnosticsPage, EditDiagnosticDefinitionPopover]
})
export class DiagnosticsPageModule {}
