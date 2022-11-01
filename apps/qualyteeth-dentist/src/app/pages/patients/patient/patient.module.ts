import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientPageRoutingModule } from './patient-routing.module';

import { EditDiagnosticPopover, PatientPage } from './patient.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';
import { OdontogramModule } from 'apps/qualyteeth-dentist/src/app/components/odontogram/odontogram.component.module';
import { DentistPipeModule } from 'apps/qualyteeth-dentist/src/app/pipes/dentistPipe.module';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';
import { DiagnosticPageModule } from '../../diagnostic/diagnostic.module';
import { TreatmentPageModule } from '../../treatment/treatment.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    PatientPageRoutingModule,
    ToolbarTitleModule,
    MaterialModule,
    OdontogramModule,
    DentistPipeModule,
    MatFabMenuModule,
    DiagnosticPageModule,
    TreatmentPageModule
  ],
  declarations: [PatientPage, EditDiagnosticPopover]
})
export class PatientPageModule { }
