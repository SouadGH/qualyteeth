import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToothPageRoutingModule } from './tooth-routing.module';

import { ToothPage } from './tooth.page';
import { TreatmentComponentModule } from 'apps/qualyteeth-patient/src/app/components/treatment/treatment-component.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToothPageRoutingModule,
    TreatmentComponentModule,
    MaterialModule,
  ],
  declarations: [ToothPage]
})
export class ToothPageModule {}
