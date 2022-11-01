import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCalendarPageRoutingModule } from './add-calendar-routing.module';

import { AddCalendarPage } from './add-calendar.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';

// https://github.com/jakubroztocil/rrule
// https://www.textmagic.com/free-tools/rrule-generator
// https://fullcalendar.io/docs

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddCalendarPageRoutingModule,
    ToolbarTitleModule,
    MaterialModule,
    NgxMatTimepickerModule
  ],
  declarations: [AddCalendarPage]
})
export class AddCalendarPageModule { }
