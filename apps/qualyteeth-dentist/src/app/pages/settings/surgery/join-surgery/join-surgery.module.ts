import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JoinSurgeryPageRoutingModule } from './join-surgery-routing.module';

<<<<<<< HEAD
import { JoinSurgeryPage, JoinSurgeryPopover } from './join-surgery.page';
=======
import { JoinSurgeryPage } from './join-surgery.page';
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
import { MaterialModule } from 'apps/qualyteeth-dentist/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JoinSurgeryPageRoutingModule,
    MaterialModule
  ],
<<<<<<< HEAD
  declarations: [JoinSurgeryPage,JoinSurgeryPopover]
=======
  declarations: [JoinSurgeryPage]
>>>>>>> c6740c8dc4e6e69e5f3be7ef55127ed511d52617
})
export class JoinSurgeryPageModule {}
