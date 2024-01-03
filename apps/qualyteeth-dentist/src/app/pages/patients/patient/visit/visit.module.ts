import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitPageRoutingModule } from './visit-routing.module';

import { VisitPage } from './visit.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';
import { OdontogramModule } from 'apps/qualyteeth-dentist/src/app/components/odontogram/odontogram.component.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    VisitPageRoutingModule,
    MaterialModule,
    OdontogramModule
  ],
  declarations: [VisitPage]
})
export class VisitPageModule {}
