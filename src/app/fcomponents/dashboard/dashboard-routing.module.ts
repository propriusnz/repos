import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// All Guards follow
import { RestrictGuard } from '../../services/security/guards/restrict.guard';
import { AccessTutorGuard } from '../../services/security/guards/access-tutor.guard';
import { AccessApplyGuard } from '../../services/security/guards/access-apply.guard';
import { AccessApplicantGuard } from '../../services/security/guards/access-applicant.guard';

import { ApplicantTutorComponent } from '../../fcomponents/jobs/applicant-tutor-manager/applicant-tutor.component';

import { DashboardHomeSessionsComponent } from './dashboard-home/dashboard-home-sessions/dashboard-home-sessions.component'; //all
import { TutorReportDialogComponent } from './dashboard-dialogs/tutor-report-dialog/tutor-report-dialog.component'; //all
import { SessionEditDialogComponent } from './dashboard-dialogs/session-edit-dialog/session-edit-dialog.component'; //all
import { SchedulesListComponent } from './schedules-lessons/schedules-list/schedules-list.component'; //all
import { LearnerSessionRatingDialogComponent } from './dashboard-dialogs/learner-session-rating-dialog/learner-session-rating-dialog.component';//all
import { ResourceEditComponent } from './resources-homework/resource-edit/resource-edit.component';
import { DashboardPanelComponent } from './dashboard-panel/dashboard-panel.component';	//all

import { SearchResourcesPanelComponent } from './resources-homework/search-resources/search-resources-panel/search-resources-panel.component'; //all

import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component'; //all
import { CancelSessionDialogComponent } from './dashboard-dialogs/cancel-session-dialog/cancel-session-dialog.component'; //all
import { SchedulesHomeComponent } from './schedules-lessons/schedules-home/schedules-home.component';//all
import { ReportSessionIssueDialogComponent } from './dashboard-dialogs/report-session-issue-dialog/report-session-issue-dialog.component';//all
import { DashboardHomePanelComponent } from './dashboard-home/dashboard-home-panel/dashboard-home-panel.component'; //all
import { TutorScheduleShowComponent } from './schedules-lessons/tutor-schedules-show/tutor-schedules-show.component';//all
import { MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import {ResourceSummaryComponent} from '../dashboard/resources-homework/resource-edit/resource-summary/resource-summary.component' //all


const routes: Routes = [

  {path: '', component: DashboardPanelComponent, canActivate: [RestrictGuard],
  children: [
    { path: 'home', component: DashboardHomePanelComponent, canActivate: [RestrictGuard] },
  
    { path: 'learner/lessons', component: SchedulesListComponent },
    { path: 'learner/homework/view', component: SearchResourcesPanelComponent },
    { path: 'learner/homework/view/hw', redirectTo: 'app/community/showresource', pathMatch: 'full' },

    { path: 'tutor/schedules', component: SchedulesHomeComponent,
      children: [
        { path: '', redirectTo: 'calendar', pathMatch: 'full'},
        { path: 'calendar', component: TutorScheduleShowComponent},
        { path: 'list', component: SchedulesListComponent}
      ] },

    { path: 'tutor/resources/view', component: SearchResourcesPanelComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
    { path: 'tutor/resources/view:id', redirectTo: 'community/posts/:id', canActivate: [RestrictGuard, AccessTutorGuard] },   
    //{ path: 'tutor/schedules/edit', component: TutorSchedulesEditComponent }, //tutor  
    { path: 'tutor/resources/add/:type', component: ResourceEditComponent },
    { path: 'tutor/resources/edit/:type', component: ResourceEditComponent },
    { path: 'tutor/schedules', component: SchedulesHomeComponent},

    { path: 'apply/manager', component: ApplicantTutorComponent},
    //{ path: '', redirectTo: 'calendar', pathMatch: 'full'},
        // Dashboard routes learner
        {
          path: 'learner',
          loadChildren: './dashboard-learner.module#DashboardLearnerModule'
        },
        //Dashboard routes tutor   
        {
          path: 'tutor',
          loadChildren: './dashboard-tutor.module#DashboardTutorModule'
        },
        
  
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)
    ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }