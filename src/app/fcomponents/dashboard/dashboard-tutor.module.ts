import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardTutorRoutingModule } from './dashboard-tutor-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardModule } from './dashboard.module';

import { MatStepperModule } from '@angular/material/stepper';

import { TutorSchedulesEditComponent } from './schedules-lessons/tutor-schedules-edit/tutor-schedules-edit.component';//tutor
import { TutProfileEditPanelComponent } from './profiles/tutor-profile-edit/tut-profile-edit-panel/tut-profile-edit-panel.component';//tutor
import { TutProfileEditKeyComponent } from './profiles/tutor-profile-edit/tut-profile-edit-key/tut-profile-edit-key.component';//tutor
import { TutProfileEditCvComponent } from './profiles/tutor-profile-edit/tut-profile-edit-cv/tut-profile-edit-cv.component';//tutor
import { TutProfileEditSpecialComponent } from './profiles/tutor-profile-edit/tut-profile-edit-special/tut-profile-edit-special.component';//tutor
import { MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

import {TagInputModule} from 'ngx-chips';

@NgModule({
  imports: [
    SharedModule,
    DashboardModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardTutorRoutingModule,
    TagInputModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,MatRadioModule,MatStepperModule,
    MatAutocompleteModule, MatBadgeModule, MatCheckboxModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatPaginatorModule,
    MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule

  ],
  declarations: [
    TutorSchedulesEditComponent,
    TutProfileEditPanelComponent,
    TutProfileEditKeyComponent,
    TutProfileEditCvComponent,
    TutProfileEditSpecialComponent,
    //FillBlankComponent
    
  ],
  entryComponents: [

  ],   
})
export class DashboardTutorModule { }
