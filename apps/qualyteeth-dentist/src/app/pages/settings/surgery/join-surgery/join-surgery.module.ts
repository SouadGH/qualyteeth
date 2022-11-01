import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinSurgeryPageRoutingModule } from './join-surgery-routing.module';

import { JoinSurgeryPage } from './join-surgery.page';
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinSurgeryPageRoutingModule,
    MaterialModule
  ],
  declarations: [JoinSurgeryPage]
})
export class JoinSurgeryPageModule {}
