import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { TreatmentComponent } from './treatment.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [TreatmentComponent],
  declarations: [TreatmentComponent]
})
export class TreatmentComponentModule {}
