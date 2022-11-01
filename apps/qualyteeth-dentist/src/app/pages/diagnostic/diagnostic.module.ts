import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosticPageRoutingModule } from './diagnostic-routing.module';

import { DiagnosticPage } from './diagnostic.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';
import { OdontogramModule } from 'apps/qualyteeth-dentist/src/app/components/odontogram/odontogram.component.module';
import { DentistPipeModule } from 'apps/qualyteeth-dentist/src/app/pipes/dentistPipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IonicModule,
    DiagnosticPageRoutingModule,
    ToolbarTitleModule,
    OdontogramModule,
    DentistPipeModule,
  ],
  declarations: [DiagnosticPage]
})
export class DiagnosticPageModule { }
