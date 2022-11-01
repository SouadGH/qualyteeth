import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { OdontogramToothComponent } from './tooth.component';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MaterialModule
  ],
  exports: [OdontogramToothComponent],
  declarations: [OdontogramToothComponent]
})
export class OdontogramToothComponentModule {}
