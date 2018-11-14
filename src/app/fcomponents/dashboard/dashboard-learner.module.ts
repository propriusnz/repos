import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardLearnerRoutingModule } from './dashboard-learner-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { DashboardModule } from './dashboard.module';
import { MatStepperModule } from '@angular/material/stepper';
import { StarRatingModule } from 'angular-star-rating';

import { LearnerProfileEditComponent } from './profiles/learner-profile-edit/learner-profile-edit.component'; //learner
import { LearnerTutorsPanelComponent } from './learner-tutors/learner-tutors-panel/learner-tutors-panel.component'; //learner
import { ViewAllSessionDialogComponent } from './dashboard-dialogs/view-all-session-dialog/view-all-session-dialog.component'; //learner

import { OrderConfirmComponentComponent } from './order/order-confirm-component/order-confirm-component.component';//all
import { LessonOrderComponent } from './order/lesson-order/lesson-order.component'

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
    DashboardLearnerRoutingModule,
    TagInputModule,
    StarRatingModule,
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
    LearnerProfileEditComponent,
    LearnerTutorsPanelComponent,
    ViewAllSessionDialogComponent,
    OrderConfirmComponentComponent,
    LessonOrderComponent,
  ],
  entryComponents: [
    ViewAllSessionDialogComponent,

  ],   
})
export class DashboardLearnerModule { }
