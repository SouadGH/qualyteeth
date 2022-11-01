import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { DentistPipe } from 'apps/qualyteeth-dentist/src/app/pipes/dentistPipe';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  declarations: [
    DentistPipe
  ],
  exports: [
    DentistPipe
  ]
})
export class DentistPipeModule { }
