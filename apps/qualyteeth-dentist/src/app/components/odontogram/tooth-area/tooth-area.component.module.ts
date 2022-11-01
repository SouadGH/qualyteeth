import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { OdontogramToothAreaComponent } from './tooth-area.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [OdontogramToothAreaComponent],
  declarations: [OdontogramToothAreaComponent]
})
export class OdontogramToothAreaModule {}
