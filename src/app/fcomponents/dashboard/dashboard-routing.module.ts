import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// All Guards follow
import { RestrictGuard } from '../../services/security/guards/restrict.guard';

import { SharedModule } from '../../shared/sharedModule';

import { AccessTutorGuard } from '../../services/security/guards/access-tutor.guard';
import { AccessApplyGuard } from '../../services/security/guards/access-apply.guard';
import { AccessApplicantGuard } from '../../services/security/guards/access-applicant.guard';

import { TutProfileEditCvComponent } from './profiles/tutor-profile-edit/tut-profile-edit-cv/tut-profile-edit-cv.component';
import { TutProfileEditKeyComponent } from './profiles/tutor-profile-edit/tut-profile-edit-key/tut-profile-edit-key.component';
import { TutProfileEditSpecialComponent } from './profiles/tutor-profile-edit/tut-profile-edit-special/tut-profile-edit-special.component';

import { TutProfileEditPanelComponent } from './profiles/tutor-profile-edit/tut-profile-edit-panel/tut-profile-edit-panel.component';
import { TutorScheduleShowComponent } from './schedules-lessons/tutor-schedules-show/tutor-schedules-show.component';
import { DashboardHomePanelComponent } from './dashboard-home/dashboard-home-panel/dashboard-home-panel.component';
import { DashboardPanelComponent } from './dashboard-panel/dashboard-panel.component';
import { LearnerProfileEditComponent } from './profiles/learner-profile-edit/learner-profile-edit.component';
import { TutorSchedulesEditComponent } from './schedules-lessons/tutor-schedules-edit/tutor-schedules-edit.component';
//import { DashboardHomeSessionsComponent } from './dashboard-home/dashboard-home-sessions/dashboard-home-sessions.component';
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

import { SearchResourcesPanelComponent } from './resources-homework/search-resources/search-resources-panel/search-resources-panel.component';
//--import { SearchResourcesBarComponent } from './resources-homework/search-resources/search-resources-bar/search-resources-bar.component';
//import { ShowResourceComponent } from './resources-homework/show-resource/show-resource.component';
//--import { EditResourcePanelComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/edit-resource-panel.component';

//--import { ResourcesControllerComponent } from './resources-homework/resources-controller/resources-controller.component';
//--import { ResourcesCreateDisplayCardComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/resources-create-display-card/resources-create-display-card.component';
//--import { TutorHomeworkComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/tutor-homework.component';
//--import { QuestionControllerComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/question-controller/question-controller.component';
//import { MatPaginatorIntlCro } from './resources-homework/search-resources/search-resources-bar/paginator/custom-paginator.component';
//--import { ShortAnswersParentComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/short-answers-parent/short-answers-parent.component';
//--import { ShortAnswersComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/short-answers-parent/short-answers/short-answers.component';
//--import { MultipleChoiceParentComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/multiple-choice-parent/multiple-choice-parent.component';

 './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/multiple-choice-parent/multiple-choice/multiple-choice.component';
//--import { FinishQuizComponent } from './resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/multiple-choice-parent/multiple-choice/finish-quiz/finish-quiz.component';
import { CancelSessionDialogComponent } from './dashboard-dialogs/cancel-session-dialog/cancel-session-dialog.component';
import { SchedulesHomeComponent } from './schedules-lessons/schedules-home/schedules-home.component';
import { ReportSessionIssueDialogComponent } from './dashboard-dialogs/report-session-issue-dialog/report-session-issue-dialog.component';

import { ApplicantTutorComponent } from '../../fcomponents/jobs/applicant-tutor-manager/applicant-tutor.component';


const routes: Routes = [
  /*{ path: 'discussions/:id', component: DiscussionComponent },
  { path: 'discussions', component: DiscussionsSearchComponent },
  { path: 'newdiscussions', component: NewDiscussionComponent }*/
  {path: '', component: DashboardPanelComponent, canActivate: [RestrictGuard],
  children: [
    { path: 'home', component: DashboardHomePanelComponent, canActivate: [RestrictGuard] },
    { path: 'mytutors', component: LearnerTutorsPanelComponent },
    { path: 'mylearners', component: LearnerTutorsPanelComponent },
    { path: 'learner/lessons', component: SchedulesListComponent },
    // Learner specific
    { path: 'learner/profile', component: LearnerProfileEditComponent },
    { path: 'learner/homework/view', component: SearchResourcesPanelComponent },
    //{ path: 'learner/homework/view/hw', component: ShowResourceComponent },
    { path: 'learner/homework/view/hw', redirectTo: 'app/community/showresource', pathMatch: 'full' },

    { path: 'tutor/schedules/calendar', component: TutorScheduleShowComponent },    
    { path: 'tutor/schedules/edit', component: TutorSchedulesEditComponent },   
    { path: 'tutor/resources/view', component: SearchResourcesPanelComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
    { path: 'tutor/resources/view:id', redirectTo: 'community/posts/:id', canActivate: [RestrictGuard, AccessTutorGuard] },   
    //{ path: 'tutor/resources/add/article', component: TutorSchedulesEditComponent },     
    { path: 'tutor/editprofile/key', component: TutProfileEditKeyComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
    { path: 'tutor/editprofile/cv', component: TutProfileEditCvComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
    { path: 'tutor/editprofile/speciality', component: TutProfileEditSpecialComponent },

    { path: 'tutor/resources/add/:type', component: ResourceEditComponent },
    { path: 'tutor/resources/edit/:type', component: ResourceEditComponent },
    { path: 'tutor/schedules', component: SchedulesHomeComponent},

    //{ path: 'apply/manager', redirectTo: 'app/apply/manager' },
    { path: 'apply/manager', component: ApplicantTutorComponent},
    ]
  },
    // Tutor specific
    { path: 'tutor/schedules', component: SchedulesHomeComponent,
        children: [
          { path: '', redirectTo: 'calendar', pathMatch: 'full'},
          //{ path: 'calendar', component: TutorScheduleShowComponent},
          { path: 'list', component: SchedulesListComponent},
        ] },
        //{ path: 'tutor/schedules/edit', component: TutorSchedulesEditComponent },
        {
          path: 'tutor/editprofile', component: TutProfileEditPanelComponent, canActivate: [RestrictGuard, AccessTutorGuard],
          children: [
            { path: '', component: TutProfileEditKeyComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
            { path: 'key', component: TutProfileEditKeyComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
            { path: 'cv', component: TutProfileEditCvComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
            { path: 'speciality', component: TutProfileEditSpecialComponent }
          ]
        },
        //loadChildren: './fcomponents/community/discussions/discussion.module#DiscussionModule'        
        //loadChildren: './fcomponents/community/discussions/discussion.module#ResourceEditComponent'                
        { path: 'tutor/resources/add/:type', component: ResourceEditComponent },
        { path: 'tutor/resources/edit/:type', component: ResourceEditComponent },

        // { path: 'tutor/resources/view', component: ResourceEditComponent },
        // {
        //   path: 'tutor/resources', component: ResourcesControllerComponent, canActivate: [RestrictGuard, AccessTutorGuard],
        //   children: [
        //     {
        //       path: 'add', component: ResourceEditComponent, canActivate: [RestrictGuard, AccessTutorGuard],
        //       children: [
        //         { path: 'article', component: ResourcesCollectionComponent },
        //         { path: 'resource', component: ResourcesCollectionComponent },
        //         { path: 'question', component: ResourcesCollectionComponent }
        //       ],
        //     },
        //     {
        //       path: 'edit', component: EditResourcePanelComponent,
        //       children: [
        //         { path: 'article', component: ResourcesCollectionComponent },
        //         { path: 'resource', component: ResourcesCollectionComponent },
        //         { path: 'question', component: ResourcesCollectionComponent }
        //       ]
        //     }
        //   ]
        // },
        { path: 'tutor/resources/view', component: SearchResourcesPanelComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
       // { path: 'tutor/resources/view/:id', component: ShowResourceComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
       { path: 'tutor/resources/view/:id', redirectTo: 'community/posts/:id', canActivate: [RestrictGuard, AccessTutorGuard] },

        
        
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    SharedModule ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }