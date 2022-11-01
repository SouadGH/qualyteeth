import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditTreatmentDefinitionPageRoutingModule } from './edit-treatment-definition-routing.module';

import { EditActComponent, EditTreatmentDefinitionPage } from './edit-treatment-definition.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditTreatmentDefinitionPageRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [
    EditTreatmentDefinitionPage,
    EditActComponent
  ]
})
export class EditTreatmentDefinitionPageModule {}
