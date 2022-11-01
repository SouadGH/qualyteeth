import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurgeriesPageRoutingModule } from './surgeries-routing.module';

import { SurgeriesBottomSheet, SurgeriesPage } from './surgeries.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';
import { QrScannerPageModule } from '../qr-scanner/qr-scanner.module';
import { AddDentistPageModule } from '../dentist/add-dentist/add-dentist.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SurgeriesPageRoutingModule,
    QrScannerPageModule,
    ToolbarTitleModule,
    AddDentistPageModule
  ],
  declarations: [SurgeriesPage, SurgeriesBottomSheet]
})
export class SurgeriesPageModule {}
