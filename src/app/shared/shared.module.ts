import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { PaginationComponent } from '../fcomponents/basic/pagination/pagination.component';
import { ToastrComponent } from '../fcomponents/basic/toastr/toastr.component';
import { SideHelperComponent } from '../fcomponents/basic/side-helper/side-helper.component';
import { ApplicantTutorComponent } from '../fcomponents/jobs/applicant-tutor-manager/applicant-tutor.component';


//MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE
@NgModule({
    imports:      [  
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,MatCheckboxModule,MatPaginatorModule,
        MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, 
        MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, 
        MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, 
        //MatIconModule, MatListModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, 
        //MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, 
        //MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, 
        //MatTooltipModule, MatTreeModule, MatNativeDateModule        
    ],
    declarations: [ 
        PaginationComponent,
        SideHelperComponent,
        ApplicantTutorComponent,
        ToastrComponent
     ],
    exports: [
        PaginationComponent,
        SideHelperComponent,
        ApplicantTutorComponent,
        ToastrComponent
      ],
    entryComponents: [ToastrComponent]
 })
 export class SharedModule { }