import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ToothPageRoutingModule } from './tooth-routing.module';

import { ToothPage } from './tooth.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ToothPageRoutingModule,
    ToolbarTitleModule,
  ],
  declarations: [ToothPage]
})
export class ToothPageModule {}
