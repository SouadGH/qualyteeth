import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrCodePageRoutingModule } from './qr-code-routing.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrCodePageRoutingModule,
    ToolbarTitleModule
  ],
  declarations: []
})
export class QrCodePageModule {}
