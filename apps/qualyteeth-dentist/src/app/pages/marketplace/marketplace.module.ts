import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MarketplacePageRoutingModule } from './marketplace-routing.module';

import { MarketplacePage } from './marketplace.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MarketplacePageRoutingModule,
    ToolbarTitleModule
  ],
  declarations: [MarketplacePage]
})
export class MarketplacePageModule {}
