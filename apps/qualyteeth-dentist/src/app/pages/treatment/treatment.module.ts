import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatmentPageRoutingModule } from './treatment-routing.module';

import { TreatmentPage } from './treatment.page';

import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';
import { OdontogramModule } from 'apps/qualyteeth-dentist/src/app/components/odontogram/odontogram.component.module';
import { DentistPipeModule } from '../../pipes/dentistPipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    IonicModule,
    TreatmentPageRoutingModule,
    ToolbarTitleModule,
    OdontogramModule,
    DentistPipeModule
  ],
  declarations: [TreatmentPage]
})
export class TreatmentPageModule {}
