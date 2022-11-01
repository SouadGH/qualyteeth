import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SurgeryPageRoutingModule } from './surgery-routing.module';

import { EditSurgeryPopover, SurgeryPage } from './surgery.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';
import { EditServicePageModule } from '../services/edit-service/edit-service.module';
import { MatFabMenuModule } from '@angular-material-extensions/fab-menu';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SurgeryPageRoutingModule,
    ToolbarTitleModule,
    MaterialModule,
    EditServicePageModule,
    MatFabMenuModule
  ],
  declarations: [SurgeryPage, EditSurgeryPopover]
})
export class SurgeryPageModule {}
