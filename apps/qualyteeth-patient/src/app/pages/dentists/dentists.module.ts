import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentistsPageRoutingModule } from './dentists-routing.module';

import { DentistBottomSheet, DentistsPage } from './dentists.page';
// import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { QrScannerPageModule } from '../qr-scanner/qr-scanner.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from '../../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentistsPageRoutingModule,
    QrScannerPageModule,
    ToolbarTitleModule,
    MaterialModule
  ],
  declarations: [DentistsPage, DentistBottomSheet],
  // providers: [BarcodeScanner]
  providers: []
})
export class DentistsPageModule { }
