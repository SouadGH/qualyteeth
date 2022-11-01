import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OdontogramPageRoutingModule } from './odontogram-routing.module';

import { OdontogramPage } from './odontogram.page';
import { TreatmentComponentModule } from 'apps/qualyteeth-patient/src/app/components/treatment/treatment-component.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';
import { TreatmentPageModule } from '../treatment/treatment.module';
import { MaterialModule } from 'apps/qualyteeth-patient/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OdontogramPageRoutingModule,
    TreatmentComponentModule,
    TreatmentPageModule,
    ToolbarTitleModule,
    MaterialModule
  ],
  declarations: [OdontogramPage]
})
export class OdontogramPageModule {}
