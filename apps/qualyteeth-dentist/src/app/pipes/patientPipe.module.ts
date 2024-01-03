import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { PatientPipe } from './patientPipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    PatientPipe
  ],
  exports: [
    PatientPipe
  ]
})
export class PatientPipeModule { }
