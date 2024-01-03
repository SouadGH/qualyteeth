import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientsPageRoutingModule } from './patients-routing.module';

import { PatientsPage, PatientsPageActionsComponent } from './patients.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    PatientsPageRoutingModule,
    ToolbarTitleModule,
    MaterialModule
  ],
  declarations: [PatientsPage, PatientsPageActionsComponent]
})
export class PatientsPageModule { }
