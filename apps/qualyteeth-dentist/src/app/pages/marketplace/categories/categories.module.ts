import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriesPageRoutingModule } from './categories-routing.module';

import { CategoriesPage } from './categories.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-dentist/src/app/components/toolbar-title/toolbar-title.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriesPageRoutingModule,
    ToolbarTitleModule
  ],
  declarations: [CategoriesPage]
})
export class CategoriesPageModule {}
