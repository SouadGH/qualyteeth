import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';


import { OdontogramModule } from 'apps/qualyteeth-dentist/src/app/components/odontogram/odontogram.component.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';
import { DentistPipeModule } from 'apps/qualyteeth-dentist/src/app/pipes/dentistPipe.module';
import { PatientPipeModule } from '../../pipes/patientPipe.module';
import { ActivityPage } from './activity';
import { ActivityPageRoutingModule } from './activity-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IonicModule,
    ActivityPageRoutingModule,
    ToolbarTitleModule,
    OdontogramModule,
    DentistPipeModule,
    PatientPipeModule,
  ],
  declarations: [ActivityPage]
})
export class ActivityPageModule { }
