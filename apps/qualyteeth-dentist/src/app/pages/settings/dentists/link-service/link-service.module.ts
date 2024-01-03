import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LinkServicePageRoutingModule } from './link-service-routing.module';

import { LinkServicePage } from './link-service.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LinkServicePageRoutingModule,
    ToolbarTitleModule,
    MaterialModule
  ],
  declarations: [LinkServicePage]
})
export class LinkServicePageModule {}
