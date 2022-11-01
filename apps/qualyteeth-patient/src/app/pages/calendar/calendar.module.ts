import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarPageRoutingModule } from './calendar-routing.module';

import { CalendarPage } from './calendar.page';
import { AddCalendarPageModule } from './add-calendar/add-calendar.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-patient/src/app/material.module';
import { CalendarEventPageModule } from './calendar-event/calendar-event.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarPageRoutingModule,
    AddCalendarPageModule,
    CalendarEventPageModule,
    ToolbarTitleModule,
    MaterialModule
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}
