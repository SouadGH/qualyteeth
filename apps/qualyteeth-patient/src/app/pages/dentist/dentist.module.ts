import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentistPageRoutingModule } from './dentist-routing.module';

import { DentistPage } from './dentist.page';
import { MaterialModule } from 'apps/qualyteeth-patient/src/app/material.module';
import { TreatmentComponentModule } from 'apps/qualyteeth-patient/src/app/components/treatment/treatment-component.module';
import { AddDentistPageModule } from './add-dentist/add-dentist.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentistPageRoutingModule,
    TreatmentComponentModule,
    AddDentistPageModule,
    MaterialModule,
    ToolbarTitleModule
  ],
  declarations: [DentistPage]
})
export class DentistPageModule {}
