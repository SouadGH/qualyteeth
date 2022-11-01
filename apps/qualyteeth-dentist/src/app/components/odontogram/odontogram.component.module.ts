import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { OdontogramComponent } from './odontogram.component';
import { OdontogramToothAreaModule } from './tooth-area/tooth-area.component.module';
import { OdontogramToothComponentModule } from './tooth/tooth.component.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    OdontogramToothAreaModule,
    OdontogramToothComponentModule,
    // MatFabMenuModule,
    // DiagnosticPageModule,
    // OndontogramHistoryPageModule
  ],
  exports: [OdontogramComponent],
  declarations: [OdontogramComponent]
})
export class OdontogramModule {}
