import { NgModule } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { MatStepperModule } from "@angular/material/stepper";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatSelectModule } from "@angular/material/select";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSortModule } from "@angular/material/sort";
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  exports: [
    MatTableModule,
    MatStepperModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatTabsModule,
    MatProgressBarModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatRadioModule,
    MatButtonToggleModule,
    MatRippleModule,
    MatSlideToggleModule,
  ]
})
export class MaterialModule { }