import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ProfilePageRoutingModule,
    ToolbarTitleModule
  ],
  declarations: []
})
export class ProfilePageModule { }
