import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { CalendarEventInfoComponent } from './calendar-event-info.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [CalendarEventInfoComponent],
  declarations: [CalendarEventInfoComponent]
})
export class CalendarEventInfoModule { }
