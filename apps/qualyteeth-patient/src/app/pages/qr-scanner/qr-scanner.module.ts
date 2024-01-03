import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrScannerPageRoutingModule } from './qr-scanner-routing.module';

import { QrScannerPage } from './qr-scanner.page';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QrScannerPageRoutingModule,
    ZXingScannerModule,
    ToolbarTitleModule
  ],
  declarations: [QrScannerPage]
})
export class QrScannerPageModule {}
