import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetailsPageRoutingModule } from './details-routing.module';

import { DetailsPage, RequestPageActionsComponent } from './details.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetailsPageRoutingModule,
    MaterialModule
  ],
  declarations: [DetailsPage, RequestPageActionsComponent]
})
export class DetailsPageModule {}
