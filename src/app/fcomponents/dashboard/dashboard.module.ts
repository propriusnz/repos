import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../../shared/sharedModule';
import { MatStepperModule } from '@angular/material/stepper';

import { LearnerProfileEditComponent } from './profiles/learner-profile-edit/learner-profile-edit.component';
import { DashboardHomeSessionsComponent } from './dashboard-home/dashboard-home-sessions/dashboard-home-sessions.component';
import { TutorReportDialogComponent } from './dashboard-dialogs/tutor-report-dialog/tutor-report-dialog.component';
import { SessionEditDialogComponent } from './dashboard-dialogs/session-edit-dialog/session-edit-dialog.component';
import { SchedulesListComponent } from './schedules-lessons/schedules-list/schedules-list.component';
import { LearnerTutorsPanelComponent } from './learner-tutors/learner-tutors-panel/learner-tutors-panel.component';
import { ViewAllSessionDialogComponent } from './dashboard-dialogs/view-all-session-dialog/view-all-session-dialog.component';
import { LearnerSessionRatingDialogComponent } from './dashboard-dialogs/learner-session-rating-dialog/learner-session-rating-dialog.component';
import { ResourceEditComponent } from './resources-homework/resource-edit/resource-edit.component';
//import { ResourcesCollectionComponent } from './resources-homework/resources-collection/resources-collection.component';
//import { ArticleParentComponent } from './resources-homework/resources-collection/article-parent/article-parent.component';
//import { ArticleModifyComponent } from './resources-homework/resources-collection/article-parent/article-modify/article-modify.component';
//import { ResourcesArticleShowComponent } from './resources-homework/show-resource/article/resources-article-show/resources-article-show.component';
import { DashboardPanelComponent } from './dashboard-panel/dashboard-panel.component';

import { SearchResourcesPanelComponent } from './resources-homework/search-resources/search-resources-panel/search-resources-panel.component';
//--import { SearchResourcesBarComponent } from './resources-homework/search-resources/search-resources-bar/search-resources-bar.component';
//import { ShowResourceComponent } from './resources-homework/show-resource/show-resource.component';
//--import { EditResourcePanelComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/edit-resource-panel.component';

import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
//--import { ResourcesControllerComponent } from './resources-homework/resources-controller/resources-controller.component';
//--import { ResourcesCreateDisplayCardComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/resources-create-display-card/resources-create-display-card.component';
//--import { TutorHomeworkComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/tutor-homework.component';
//--import { QuestionControllerComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/question-controller/question-controller.component';
//import { MatPaginatorIntlCro } from './resources-homework/search-resources/search-resources-bar/paginator/custom-paginator.component';
//--import { ShortAnswersParentComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/short-answers-parent/short-answers-parent.component';
//--import { ShortAnswersComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/short-answers-parent/short-answers/short-answers.component';
//--import { MultipleChoiceParentComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/multiple-choice-parent/multiple-choice-parent.component';
//--import { MultipleChoiceComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/multiple-choice-parent/multiple-choice/multiple-choice.component';
//import { MultipleChoiceComponent } from './resources-homework/resources-collection/question-parent/resources-question/multiple-choice/multiple-choice.component'
//--import { FinishQuizComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/multiple-choice-parent/multiple-choice/finish-quiz/finish-quiz.component';
import { CancelSessionDialogComponent } from './dashboard-dialogs/cancel-session-dialog/cancel-session-dialog.component';
import { SchedulesHomeComponent } from './schedules-lessons/schedules-home/schedules-home.component';
import { ReportSessionIssueDialogComponent } from './dashboard-dialogs/report-session-issue-dialog/report-session-issue-dialog.component';
import { DashboardHomePanelComponent } from './dashboard-home/dashboard-home-panel/dashboard-home-panel.component';
import { TutorScheduleShowComponent } from './schedules-lessons/tutor-schedules-show/tutor-schedules-show.component';
import { TutorSchedulesEditComponent } from './schedules-lessons/tutor-schedules-edit/tutor-schedules-edit.component';
import { TutProfileEditPanelComponent } from './profiles/tutor-profile-edit/tut-profile-edit-panel/tut-profile-edit-panel.component';
import { TutProfileEditKeyComponent } from './profiles/tutor-profile-edit/tut-profile-edit-key/tut-profile-edit-key.component';
import { TutProfileEditCvComponent } from './profiles/tutor-profile-edit/tut-profile-edit-cv/tut-profile-edit-cv.component';
import { TutProfileEditSpecialComponent } from './profiles/tutor-profile-edit/tut-profile-edit-special/tut-profile-edit-special.component';
import { MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
//import { FillBlankComponent } from './resources-homework/resources-collection/question-parent/resources-question/fill-blank/fill-blank.component';
import {ResourceSummaryComponent} from '../dashboard/resources-homework/resource-edit/resource-summary/resource-summary.component'

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
 
    LearnerProfileEditComponent,
    DashboardNavbarComponent,
    DashboardHomeSessionsComponent,
    TutorReportDialogComponent,
    SessionEditDialogComponent,
    SchedulesListComponent,
    LearnerTutorsPanelComponent,
    ViewAllSessionDialogComponent,
    ResourceEditComponent,
    //ResourcesCollectionComponent,
    //ArticleParentComponent,
    //ArticleModifyComponent,
    //ResourcesArticleShowComponent,
    SearchResourcesPanelComponent,
    //SearchResourcesBarComponent,
    //ShowResourceComponent,
    //EditResourcePanelComponent,
    //ResourcesControllerComponent,
    //ResourcesCreateDisplayCardComponent,
    //TutorHomeworkComponent,
    //QuestionControllerComponent,
    //ShortAnswersParentComponent,
    //ShortAnswersComponent,
    //MultipleChoiceParentComponent,
    //MultipleChoiceComponent,
    //FinishQuizComponent,
    CancelSessionDialogComponent,
    SchedulesHomeComponent,
    ReportSessionIssueDialogComponent,
    DashboardPanelComponent,
    DashboardHomePanelComponent,
    TutorScheduleShowComponent,
    TutorSchedulesEditComponent,
    TutProfileEditPanelComponent,
    TutProfileEditKeyComponent,
    TutProfileEditCvComponent,
    TutProfileEditSpecialComponent,
    ResourceSummaryComponent,
    //FillBlankComponent
    //ArticleModifyComponent 
  ]
})
export class DashboardModule { }
