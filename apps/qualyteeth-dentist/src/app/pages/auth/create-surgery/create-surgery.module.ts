import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateSurgeryPageRoutingModule } from './create-surgery-routing.module';

import { CreateSurgeryPage } from './create-surgery.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CreateSurgeryPageRoutingModule,
    MaterialModule
  ],
  declarations: [CreateSurgeryPage]
})
export class CreateSurgeryPageModule {}
