import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddDentistPageRoutingModule } from './add-dentist-routing.module';

import { AddDentistPage } from './add-dentist.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    AddDentistPageRoutingModule,
    ToolbarTitleModule
  ],
  declarations: [AddDentistPage]
})
export class AddDentistPageModule {}
