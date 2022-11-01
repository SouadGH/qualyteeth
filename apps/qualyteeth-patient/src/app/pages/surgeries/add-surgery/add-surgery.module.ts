import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSurgeryPageRoutingModule } from './add-surgery-routing.module';

import { AddSurgeryPage } from './add-surgery.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddSurgeryPageRoutingModule,
    ToolbarTitleModule
  ],
  declarations: [AddSurgeryPage]
})
export class AddSurgeryPageModule {}
