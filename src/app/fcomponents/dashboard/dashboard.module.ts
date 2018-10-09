import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { MatStepperModule } from '@angular/material/stepper';

import { ResourcesCollectionComponent } from './resources-homework/resources-collection/resources-collection.component';
import { ApplicantTutorComponent } from '../../fcomponents/jobs/applicant-tutor-manager/applicant-tutor.component';

import { DashboardHomeSessionsComponent } from './dashboard-home/dashboard-home-sessions/dashboard-home-sessions.component'; //all
import { TutorReportDialogComponent } from './dashboard-dialogs/tutor-report-dialog/tutor-report-dialog.component'; //all
import { SessionEditDialogComponent } from './dashboard-dialogs/session-edit-dialog/session-edit-dialog.component'; //all
import { SchedulesListComponent } from './schedules-lessons/schedules-list/schedules-list.component'; //all
import { LearnerSessionRatingDialogComponent } from './dashboard-dialogs/learner-session-rating-dialog/learner-session-rating-dialog.component';//all
import { ResourceEditComponent } from './resources-homework/resource-edit/resource-edit.component';
import { DashboardPanelComponent } from './dashboard-panel/dashboard-panel.component';	//all

import { ArticleParentComponent } from './resources-homework/resources-collection/article-parent/article-parent.component';
import { SearchResourcesPanelComponent } from './resources-homework/search-resources/search-resources-panel/search-resources-panel.component'; //all
import { QuestionParentComponent } from './resources-homework/resources-collection/question-parent/question-parent.component'
import { ResourcesArticleShowComponent } from './resources-homework/show-resource/article/resources-article-show/resources-article-show.component';
import { ArticleModifyComponent } from './resources-homework/resources-collection/article-parent/article-modify/article-modify.component';
import { FillBlankComponent } from './resources-homework/resources-collection/question-parent/resources-question/fill-blank/fill-blank.component';
import { ShortAnswersComponent } from './resources-homework/resources-collection/question-parent/resources-question/short-answers/short-answers.component';
import { MultipleChoiceComponent } from './resources-homework/resources-collection/question-parent/resources-question/multiple-choice/multiple-choice.component'


import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component'; //all
import { CancelSessionDialogComponent } from './dashboard-dialogs/cancel-session-dialog/cancel-session-dialog.component'; //all
import { SchedulesHomeComponent } from './schedules-lessons/schedules-home/schedules-home.component';//all
import { ReportSessionIssueDialogComponent } from './dashboard-dialogs/report-session-issue-dialog/report-session-issue-dialog.component';//all
import { DashboardHomePanelComponent } from './dashboard-home/dashboard-home-panel/dashboard-home-panel.component'; //all
import { TutorScheduleShowComponent } from './schedules-lessons/tutor-schedules-show/tutor-schedules-show.component';//all
import { MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { ResourceSummaryComponent} from '../dashboard/resources-homework/resource-edit/resource-summary/resource-summary.component' //all

import {TagInputModule} from 'ngx-chips';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
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
    DashboardNavbarComponent,
    DashboardHomeSessionsComponent,
    TutorReportDialogComponent,
    SessionEditDialogComponent,
    SchedulesListComponent,
    ResourceEditComponent,
    ResourcesCollectionComponent,
    ArticleParentComponent,
    SearchResourcesPanelComponent,
    
    CancelSessionDialogComponent,
    SchedulesHomeComponent,
    ReportSessionIssueDialogComponent,
    DashboardPanelComponent,
    DashboardHomePanelComponent,
    TutorScheduleShowComponent,
    ResourceSummaryComponent,
    QuestionParentComponent,
    ResourcesArticleShowComponent,
    ArticleModifyComponent,
    FillBlankComponent,
    ShortAnswersComponent,
    MultipleChoiceComponent
  ]
})
export class DashboardModule { }
