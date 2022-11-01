import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddActPageRoutingModule } from './add-act-routing.module';

import { AddActPage } from './add-act.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddActPageRoutingModule,
    MaterialModule
  ],
  declarations: [AddActPage]
})
export class AddActPageModule {}
