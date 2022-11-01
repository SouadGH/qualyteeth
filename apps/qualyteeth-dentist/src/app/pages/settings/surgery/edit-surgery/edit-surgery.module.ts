import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditSurgeryPageRoutingModule } from './edit-surgery-routing.module';

import { EditSurgeryPage } from './edit-surgery.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    EditSurgeryPageRoutingModule,
    MaterialModule
  ],
  declarations: [EditSurgeryPage]
})
export class EditSurgeryPageModule {}
