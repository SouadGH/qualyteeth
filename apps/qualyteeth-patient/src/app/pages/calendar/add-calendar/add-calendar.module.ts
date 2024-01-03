import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCalendarPageRoutingModule } from './add-calendar-routing.module';

import { AddCalendarPage } from './add-calendar.page';
import { MaterialModule } from 'apps/qualyteeth-patient/src/app/material.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddCalendarPageRoutingModule,
    MaterialModule,
    ToolbarTitleModule
  ],
  declarations: [AddCalendarPage]
})
export class AddCalendarPageModule {}
