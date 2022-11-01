import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { MouthComponent } from './mouth.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [MouthComponent],
  declarations: [MouthComponent]
})
export class MouthComponentModule { }
