import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentistsPageRoutingModule } from './dentists-routing.module';

import { DentistsPage, EditDentistComponent, EditDentistPopover } from './dentists.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentistsPageRoutingModule,
    ToolbarTitleModule,
    MaterialModule
  ],
  declarations: [
    DentistsPage, 
    EditDentistComponent,
    EditDentistPopover
  ]
})
export class DentistsPageModule { }
