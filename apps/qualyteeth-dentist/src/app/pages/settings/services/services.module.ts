import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ServicesPageRoutingModule } from './services-routing.module';

import { EditServicePopover, ServicesPage } from './services.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';
import { DentistPipeModule } from 'apps/qualyteeth-dentist/src/app/pipes/dentistPipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesPageRoutingModule,
    ToolbarTitleModule,
    MaterialModule,
    DentistPipeModule
  ],
  declarations: [
    ServicesPage,
    EditServicePopover
  ]
})
export class ServicesPageModule {}
