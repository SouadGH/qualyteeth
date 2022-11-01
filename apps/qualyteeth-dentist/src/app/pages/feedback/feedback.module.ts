import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FeedbackPageRoutingModule } from './feedback-routing.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    FeedbackPageRoutingModule,
    ToolbarTitleModule
  ],
  declarations: []
})
export class FeedbackPageModule { }
