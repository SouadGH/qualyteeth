import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { ToolbarTitleComponent } from './toolbar-title.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
  ],
  exports: [ToolbarTitleComponent],
  declarations: [ToolbarTitleComponent]
})
export class ToolbarTitleModule { }
