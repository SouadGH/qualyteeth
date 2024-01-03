import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarEventPageRoutingModule } from './calendar-event-routing.module';

import { CalendarEventPage } from './calendar-event.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-patient/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarEventPageRoutingModule,
    MaterialModule,
    ToolbarTitleModule
  ],
  declarations: [CalendarEventPage]
})
export class CalendarEventPageModule {}
