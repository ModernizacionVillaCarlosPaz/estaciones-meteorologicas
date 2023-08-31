import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import {Component} from '@angular/core';

import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatCardModule,
        MatExpansionModule,
        MatButtonModule,
        MatNativeDateModule,
        MatMenuModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatPaginatorModule,
        MatDialogModule,
        MatFormFieldModule,
        MatDividerModule,
        MatTableModule,
        MatInputModule,
        MatChipsModule,
        MatSortModule,
        MatSelectModule,
        MatStepperModule,
        MatSnackBarModule,
        MatOptionModule,
        MatGridListModule,
        MatBadgeModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatSlideToggleModule,
    ],
    exports: [
        CommonModule,
        MatCheckboxModule,
        MatRadioModule,
        MatExpansionModule,
        MatButtonModule,
        MatMenuModule,
        MatDatepickerModule,
        MatToolbarModule,
        MatTableModule,
        MatIconModule,
        MatCardModule,
        MatDialogModule,
        MatPaginatorModule,
        MatSidenavModule,
        MatListModule,
        MatNativeDateModule,
        MatFormFieldModule,
        MatDividerModule,
        MatStepperModule,
        MatChipsModule,
        MatSortModule,
        MatInputModule,
        MatSelectModule,
        MatSnackBarModule,
        MatOptionModule,
        MatGridListModule,
        MatBadgeModule,
        MatAutocompleteModule,
        MatTooltipModule,
        MatProgressBarModule,
        MatSlideToggleModule
    ]
})
export class MaterialModule { }