import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatmentPageRoutingModule } from './treatment-routing.module';

import { TreatmentPage } from './treatment.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-patient/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TreatmentPageRoutingModule,
    ToolbarTitleModule,
    MaterialModule
  ],
  declarations: [TreatmentPage]
})
export class TreatmentPageModule {}
