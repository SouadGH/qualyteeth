import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SettingsPageRoutingModule,
    ToolbarTitleModule
  ],
  declarations: [SettingsPage]
})
export class SettingsPageModule {}
