import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentsPageRoutingModule } from './documents-routing.module';

import { DocumentsPage } from './documents.page';
import { ToolbarTitleModule } from 'apps/qualyteeth-patient/src/app/components/toolbar-title/toolbar-title.module';
import { MaterialModule } from 'apps/qualyteeth-patient/src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocumentsPageRoutingModule,
    ToolbarTitleModule,
    MaterialModule
  ],
  declarations: [DocumentsPage]
})
export class DocumentsPageModule {}
