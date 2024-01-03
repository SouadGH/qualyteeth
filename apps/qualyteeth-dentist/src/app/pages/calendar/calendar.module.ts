import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarEventInfoModule } from 'apps/qualyteeth-dentist/src/app/components/calendar-event-info/calendar-event-info.module';
import { AddCalendarPageModule } from './add-calendar/add-calendar.module';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    ToolbarTitleModule,
    FullCalendarModule,
    CalendarEventInfoModule,
    AddCalendarPageModule,
    MaterialModule
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule { }
