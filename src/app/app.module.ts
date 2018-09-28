import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

//define Custom Preloader js
import { AppCustomPreloader } from './app-routing-loader';

import { SharedModule } from '../app/shared/sharedModule';

// All Imports follow
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DomSanitizer } from '@angular/platform-browser';
import { CKEditorModule } from 'ng2-ckeditor';
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule,
   MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, 
   MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule,
    MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
     MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, 
     MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
      MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter,
       MAT_DATE_FORMATS, MAT_DATE_LOCALE,MatMenuTrigger  } from '@angular/material';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { NgxJsonLdModule } from 'ngx-json-ld';
import { StarRatingModule } from 'angular-star-rating';



// All Services follow
import { GeneralService } from './services/servercalls/general.service';
import { NewTutorService } from './services/servercalls/new-tutor.service';
import { UserService } from './services/servercalls/user.service';
import { TutorService } from './services/servercalls/tutor.service';
import { LearnerService } from './services/servercalls/learner.service';
import { AuthService } from './services/security/auth.service';
import { FileValidationService } from './services/support/file-validation.service';
import { ProfileHelperService } from './services/helpers/profile-helper.service';
import { RepositoryService } from './services/repositories/repository.service';
import { SideHelperService } from './services/helpers/side-helper.service';
import { CalendarSupportService } from './services/support/calendar-support.service';
import { ResourceRepositoryService } from './services/repositories/resource-repository.service';
import { AlertNotificationService } from './services/support/alert-notification.service';

// All Guards follow
import { RestrictGuard } from './services/security/guards/restrict.guard';
import { AccessTutorGuard } from './services/security/guards/access-tutor.guard';
import { AccessApplyGuard } from './services/security/guards/access-apply.guard';
import { AccessApplicantGuard } from './services/security/guards/access-applicant.guard';

// All Components follow
import { AppComponent } from './app.component';
import { FooterComponent } from './fcomponents/basic/footer/footer.component';
import { NavbarComponent } from './fcomponents/basic/navbar/navbar.component';
import { PageNotFoundComponent } from './fcomponents/basic/page-not-found/page-not-found.component';
import { AboutComponent } from './fcomponents/pages/about/about.component';
import { ContactComponent } from './fcomponents/pages/contact/contact.component';
import { TutorprofileComponent } from './fcomponents/find/tutorprofile/tutorprofile.component';
import { FindMainComponent } from './fcomponents/find/find-main/find-main.component';
import { FindSideComponent } from './fcomponents/find/find-side/find-side.component';
import { FindPanelComponent } from './fcomponents/find/find-panel/find-panel.component';
//import { DashboardPanelComponent } from './fcomponents/dashboard/dashboard-panel/dashboard-panel.component';
import { ApplyTeachComponent } from './fcomponents/jobs/apply-teach/apply-teach.component';
import { NewUserComponent } from './fcomponents/basic/newuser/newuser.component';
//import { DashboardNavbarComponent } from './fcomponents/dashboard/dashboard-navbar/dashboard-navbar.component';
import { FaqComponent } from './fcomponents/pages/faq/faq.component';
import { BlogComponent } from './fcomponents/pages/blog/blog.component';
import { LoginComponent } from './fcomponents/basic/login/login.component';
import { NewUserWelcomeComponent } from './fcomponents/support/new-user-welcome/new-user-welcome.component';
import { fcomponentsComponent } from './fcomponents/fcomponents-control';
import { HomeComponent } from './landing/home/home.component';
import { WorkComponent } from './landing/work/work.component';
import { HowItWorksComponent } from './fcomponents/pages/how-it-works/how-it-works.component';
import { ContactDialogComponent } from './fcomponents/basic/contact-dialog/contact-dialog.component';
import { UserEditDetailsComponent } from './fcomponents/user-details/user-edit-details/user-edit-details.component';
import { ApplicantTutorComponent } from './fcomponents/jobs/applicant-tutor-manager/applicant-tutor.component';
import { TutorAgreementComponent } from './fcomponents/jobs/support/tutor-agreement/tutor-agreement.component';
import { PrivacyComponent } from './fcomponents/pages/privacy/privacy.component';
//import { DashboardHomePanelComponent } from './fcomponents/dashboard/dashboard-home/dashboard-home-panel/dashboard-home-panel.component';
//import { PostComponent } from './fcomponents/community/posts/post/post.component';
//import { PostsSearchComponent } from './fcomponents/community/posts/posts-search/posts-search.component';
import { PasswordResetComponent } from './fcomponents/basic/password-reset/password-reset.component';
//import { TutorScheduleShowComponent } from './fcomponents/dashboard/schedules-lessons/tutor-schedules-show/tutor-schedules-show.component';
//import { TutProfileEditPanelComponent } from './fcomponents/dashboard/profiles/tutor-profile-edit/tut-profile-edit-panel/tut-profile-edit-panel.component';
//import { TutProfileEditCvComponent } from './fcomponents/dashboard/profiles/tutor-profile-edit/tut-profile-edit-cv/tut-profile-edit-cv.component';
//import { TutProfileEditKeyComponent } from './fcomponents/dashboard/profiles/tutor-profile-edit/tut-profile-edit-key/tut-profile-edit-key.component';
//import { TutProfileEditSpecialComponent } from './fcomponents/dashboard/profiles/tutor-profile-edit/tut-profile-edit-special/tut-profile-edit-special.component';
import { UserPasswordComponent } from './fcomponents/user-details/user-password/user-password.component';
//import { TutorSchedulesEditComponent } from './fcomponents/dashboard/schedules-lessons/tutor-schedules-edit/tutor-schedules-edit.component';
import { UserDetailsPanelComponent } from './fcomponents/user-details/user-details-panel/user-details-panel.component';
import { FeaturesComponent } from './fcomponents/pages/features/features.component';
import { ExternalLoadComponent } from './fcomponents/support/external-load/external-load.component';
import { TutorBookingsComponent } from './fcomponents/find/tutor-bookings/tutor-bookings.component';
import { UserTransactionsComponent } from './fcomponents/user-details/user-transactions/user-transactions.component';
//import { PostEditComponent } from './fcomponents/community/posts/post-edit/post-edit.component';
import { InvestorRelationsComponent } from './fcomponents/pages/investor-relations/investor-relations.component';
import { ImageEditorDialogComponent } from './fcomponents/support/image-editor-dialog/image-editor-dialog.component';
import { TermsComponent } from './fcomponents/pages/terms/terms.component';
//import { ShowResourceComponent } from './fcomponents/dashboard/resources-homework/show-resource/show-resource.component';
import { UserPaymentInfoComponent } from './fcomponents/user-details/user-payment-info/user-payment-info.component';
import { StripePaymentComponent } from './fcomponents/support/stripe-payment/stripe-payment.component';
//import { ShortAnswersComponent } from './fcomponents/dashboard/resources-homework/resources-collection/question-parent/resources-question/short-answers/short-answers.component';

//import { ResourcesArticleShowComponent } from './fcomponents/dashboard/resources-homework/show-resource/article/resources-article-show/resources-article-show.component';

//import { TutorReportDialogComponent } from './fcomponents/dashboard/dashboard-dialogs/tutor-report-dialog/tutor-report-dialog.component';
//import { SessionEditDialogComponent } from './fcomponents/dashboard/dashboard-dialogs/session-edit-dialog/session-edit-dialog.component';
//import { FinishQuizComponent } from './fcomponents/dashboard/resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/multiple-choice-parent/multiple-choice/finish-quiz/finish-quiz.component';
//import { DiscussionComponent } from './fcomponents/community/discussions/discussion/discussion.component';
//import { DiscussionsSearchComponent } from './fcomponents/community/discussions/discussions-search/discussions-search.component';
//import { NewDiscussionComponent } from './fcomponents/community/discussions/new-discussion/new-discussion.component';
//import { SideHelperComponent } from './fcomponents/basic/side-helper/side-helper.component';
//import { DashboardHomeSessionsComponent } from './fcomponents/dashboard/dashboard-home/dashboard-home-sessions/dashboard-home-sessions.component';
//import { ArticleParentComponent } from './fcomponents/dashboard/resources-homework/resources-collection/article-parent/article-parent.component';
//import { ArticleModifyComponent } from './fcomponents/dashboard/resources-homework/resources-collection/article-parent/article-modify/article-modify.component';
//import { ResourceEditComponent } from './fcomponents/dashboard/resources-homework/resource-edit/resource-edit.component';

//import { ResourcesCollectionComponent } from './fcomponents/dashboard/resources-homework/resources-collection/resources-collection.component';

/*
import { LearnerProfileEditComponent } from './fcomponents/dashboard/profiles/learner-profile-edit/learner-profile-edit.component';





import { SchedulesListComponent } from './fcomponents/dashboard/schedules-lessons/schedules-list/schedules-list.component';
import { LearnerTutorsPanelComponent } from './fcomponents/dashboard/learner-tutors/learner-tutors-panel/learner-tutors-panel.component';
import { ViewAllSessionDialogComponent } from './fcomponents/dashboard/dashboard-dialogs/view-all-session-dialog/view-all-session-dialog.component';
import { LearnerSessionRatingDialogComponent } from './fcomponents/dashboard/dashboard-dialogs/learner-session-rating-dialog/learner-session-rating-dialog.component';
import { ResourceEditComponent } from './fcomponents/dashboard/resources-homework/resource-edit/resource-edit.component';
import { ResourcesCollectionComponent } from './fcomponents/dashboard/resources-homework/resources-collection/resources-collection.component';
import { ArticleParentComponent } from './fcomponents/dashboard/resources-homework/resources-collection/article-parent/article-parent.component';
import { ArticleModifyComponent } from './fcomponents/dashboard/resources-homework/resources-collection/article-parent/article-modify/article-modify.component';
import { ResourcesArticleShowComponent } from './fcomponents/dashboard/resources-homework/show-resource/article/resources-article-show/resources-article-show.component';

import { SearchResourcesPanelComponent } from './fcomponents/dashboard/resources-homework/search-resources/search-resources-panel/search-resources-panel.component';
import { SearchResourcesBarComponent } from './fcomponents/dashboard/resources-homework/search-resources/search-resources-bar/search-resources-bar.component';

import { EditResourcePanelComponent } from './fcomponents/dashboard/resources-homework/tutor-edit-resource/edit-resource-panel/edit-resource-panel.component';

import { ResourcesControllerComponent } from './fcomponents/dashboard/resources-homework/resources-controller/resources-controller.component';
import { ResourcesCreateDisplayCardComponent } from './fcomponents/dashboard/resources-homework/tutor-edit-resource/edit-resource-panel/resources-create-display-card/resources-create-display-card.component';
import { TutorHomeworkComponent } from './fcomponents/dashboard/resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/tutor-homework.component';
import { QuestionControllerComponent } from './fcomponents/dashboard/resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/question-controller/question-controller.component';
//import { MatPaginatorIntlCro } from './fcomponents/dashboard/resources-homework/search-resources/search-resources-bar/paginator/custom-paginator.component';
import { ShortAnswersParentComponent } from './fcomponents/dashboard/resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/short-answers-parent/short-answers-parent.component';
import { ShortAnswersComponent } from './fcomponents/dashboard/resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/short-answers-parent/short-answers/short-answers.component';
import { MultipleChoiceParentComponent } from './fcomponents/dashboard/resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/multiple-choice-parent/multiple-choice-parent.component';
import { MultipleChoiceComponent } from './fcomponents/dashboard/resources-homework/tutor-edit-resource/edit-resource-panel/tutor-homework/multiple-choice-parent/multiple-choice/multiple-choice.component';

import { CancelSessionDialogComponent } from './fcomponents/dashboard/dashboard-dialogs/cancel-session-dialog/cancel-session-dialog.component';
import { SchedulesHomeComponent } from './fcomponents/dashboard/schedules-lessons/schedules-home/schedules-home.component';
import { ReportSessionIssueDialogComponent } from './fcomponents/dashboard/dashboard-dialogs/report-session-issue-dialog/report-session-issue-dialog.component';
*/
import { HelpPanelComponent } from './fcomponents/help/help-panel/help-panel.component';
import { HelpTeachersMainComponent } from './fcomponents/help/teachers/help-teachers-main/help-teachers-main.component';
import { HelpStudentsMainComponent } from './fcomponents/help/students/help-students-main/help-students-main.component';
import { HelpApplicantsMainComponent } from './fcomponents/help/applicants/help-applicants-main/help-applicants-main.component';
import { HelpMainComponent } from './fcomponents/help/help-main/help-main.component';
import { MomentDateAdapter} from '@angular/material-moment-adapter';
import { UserTransactionsActionsDialogComponent} from './fcomponents/user-details/user-transactions-actions-dialog/user-transactions-actions-dialog.component';
//import { ToastrComponent } from './fcomponents/basic/toastr/toastr.component';
//import { QuestionParentComponent } from './fcomponents/dashboard/resources-homework/resources-collection/question-parent/question-parent.component'
//import { ResourceParentComponent } from './fcomponents/dashboard/resources-homework/resources-collection/resource-parent/resource-parent.component'
// import { TagInputModule } from 'ngx-chips';
import { HelpArticleComponent } from './fcomponents/help/help-article/help-article.component';

//import { ResourcesQuestionComponent } from './fcomponents/dashboard/resources-homework/resources-collection/question-parent/resources-question/resources-question.component';
//import { ResourcesQuestionShowComponent } from './fcomponents/dashboard/resources-homework/show-resource/question/resources-question-show/resources-question-show.component';
import { ResourcesReferenceShowComponent } from './fcomponents/dashboard/resources-homework/show-resource/reference/resources-reference-show/resources-reference-show.component';
import { FormlabelhighlightDirective } from './fcomponents/dashboard/resources-homework/support/formlabelhighlight.directive';
//import { FillBlankComponent } from './fcomponents/dashboard/resources-homework/resources-collection/question-parent/resources-question/fill-blank/fill-blank.component';


//import { DashboardModule } from './fcomponents/dashboard/dashboard.module'; 

// All Routes follow
const appRoutes: Routes = [
  {
    path: 'app', component: fcomponentsComponent,
    children: [
      // Static pages
      { path: 'about', component: AboutComponent },
      { path: 'faq', component: FaqComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'howitworks', component: HowItWorksComponent },
      { path: 'features', component: FeaturesComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'investor', component: InvestorRelationsComponent },
      // Load landing
      { path: 'external/:event', component: ExternalLoadComponent },
      { path: 'onboard/:first_name', component: NewUserWelcomeComponent },
      // Find tutors
      { path: 'find-tutor/:', component: FindPanelComponent },
      { path: 'find-tutor', component: FindPanelComponent },
      { path: 'find-tutor/profile/:id', component: TutorprofileComponent },
      { path: 'find-tutor/profile/:id/book', component: TutorBookingsComponent, canActivate: [RestrictGuard] },
      // Community routes
      /*{ path: 'community/posts', component: PostsSearchComponent },
      { path: 'community/posts/:id', component: ShowResourceComponent },
      { path: 'community/showresource', component: ShowResourceComponent },
      { path: 'community/newpost', component: PostEditComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
      { path: 'community/editpost/:id', component: PostEditComponent, canActivate: [RestrictGuard, AccessTutorGuard] },*/
      //{ path: 'community/discussions', component: DiscussionsSearchComponent },
      //{ path: 'community/discussions/:id', component: DiscussionComponent },
      //{ path: 'community/newdiscussions', component: NewDiscussionComponent },
      //{ path: 'communitys', component: NewDiscussionComponent }, 
      {
      path: 'community',
      loadChildren:'./fcomponents/community/community.module#CommunityModule',
      },
      // Dashboard routes
      {
        path: 'dashboard',
        loadChildren: './fcomponents/dashboard/dashboard.module#DashboardModule'
      },
      /*
      {
        path: 'dashboard', component: DashboardPanelComponent, canActivate: [RestrictGuard],
        children: [
          { path: 'home', component: DashboardHomePanelComponent, canActivate: [RestrictGuard] },
          { path: 'mytutors', component: LearnerTutorsPanelComponent },
          { path: 'mylearners', component: LearnerTutorsPanelComponent },
          // Tutor specific
          { path: 'tutor/schedules', component: SchedulesHomeComponent,
              children: [
                { path: '', redirectTo: 'calendar', pathMatch: 'full'},
                { path: 'calendar', component: TutorScheduleShowComponent},
                { path: 'list', component: SchedulesListComponent}
              ] },
          { path: 'tutor/schedules/edit', component: TutorSchedulesEditComponent },
          {
            path: 'tutor/editprofile', component: TutProfileEditPanelComponent, canActivate: [RestrictGuard, AccessTutorGuard],
            children: [
              { path: '', component: TutProfileEditKeyComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
              { path: 'key', component: TutProfileEditKeyComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
              { path: 'cv', component: TutProfileEditCvComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
              { path: 'speciality', component: TutProfileEditSpecialComponent }
            ]
          },
          
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
          { path: 'tutor/resources/view/:id', component: ShowResourceComponent, canActivate: [RestrictGuard, AccessTutorGuard] },

          // Learner specific
          { path: 'learner/profile', component: LearnerProfileEditComponent },
          { path: 'learner/homework/view', component: SearchResourcesPanelComponent },
          { path: 'learner/homework/view/hw', component: ShowResourceComponent },
          { path: 'learner/lessons', component: SchedulesListComponent }
        ]
      },
      */
      // Jobs specific routes
      { path: 'apply/teach', component: ApplyTeachComponent, canActivate: [RestrictGuard, AccessApplyGuard] },
      { path: 'apply/manager', component: ApplicantTutorComponent, canActivate: [RestrictGuard, AccessApplicantGuard] },
      // User specific routes
      {
        path: 'user', component: UserDetailsPanelComponent, canActivate: [RestrictGuard],
        children: [
          { path: 'details', component: UserEditDetailsComponent },
          { path: 'password', component: UserPasswordComponent },
          { path: 'transactions', component: UserTransactionsComponent },
          { path: 'payment-info', component: UserPaymentInfoComponent },
        ]
      },
      { path: 'transaction', component: UserTransactionsComponent},
      {path: 'help', component: HelpPanelComponent, children: [
        {path: 'home', component: HelpMainComponent },
        {path: 'teachers', component: HelpTeachersMainComponent },
        {path: 'students', component: HelpStudentsMainComponent },
        {path: 'applicants', component: HelpApplicantsMainComponent },
        {path: 'article/:articletype/:id', component: HelpArticleComponent}
      ]},

      { path: '**', component: PageNotFoundComponent },
    ]
  },
  // Landing pages
  { path: 'index', component: HomeComponent },
  { path: '', component: HomeComponent },
  { path: 'work', component: WorkComponent },
  { path: '**', component: PageNotFoundComponent },
];

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    PageNotFoundComponent,
    AboutComponent,
    ContactComponent,
    TutorprofileComponent,
    FindMainComponent,
    FindSideComponent,
    FindPanelComponent,
    //DashboardPanelComponent,
    ApplyTeachComponent,
    NewUserComponent,
    //DashboardNavbarComponent,
    FaqComponent,
    LoginComponent,
    NewUserWelcomeComponent,
    fcomponentsComponent,
    HomeComponent,
    WorkComponent,
    HowItWorksComponent,
    ContactDialogComponent,
    UserEditDetailsComponent,
    //ApplicantTutorComponent,
    TutorAgreementComponent,
    PrivacyComponent,
    //DashboardHomePanelComponent,
    //PostComponent,
    //PostsSearchComponent,
    PasswordResetComponent,
    //TutorScheduleShowComponent,
    //TutProfileEditPanelComponent,
    //TutProfileEditCvComponent,
    UserPasswordComponent,
    //TutProfileEditKeyComponent,
    //TutProfileEditSpecialComponent,
    //TutorSchedulesEditComponent,
    UserDetailsPanelComponent,
    FeaturesComponent,
    ExternalLoadComponent,
    TutorBookingsComponent,
    UserTransactionsComponent,
    //PostEditComponent,
    InvestorRelationsComponent,
    ImageEditorDialogComponent,
    TermsComponent,
    //DiscussionComponent,
    //DiscussionsSearchComponent,
    //NewDiscussionComponent,
    //LearnerProfileEditComponent,
    //SideHelperComponent,
    BlogComponent,
    //SearchResourcesPanelComponent,
    //SearchResourcesBarComponent,
    //ShowResourceComponent,
    //EditResourcePanelComponent,
    StripePaymentComponent,
    UserPaymentInfoComponent,
    //DashboardHomeSessionsComponent,
    //TutorReportDialogComponent,
    //SessionEditDialogComponent,
    //SchedulesListComponent,
    //LearnerTutorsPanelComponent,
    //ResourcesControllerComponent,
    //ResourcesCreateDisplayCardComponent,
    //TutorHomeworkComponent,
    //QuestionControllerComponent,
    //ShortAnswersParentComponent,
    //ShortAnswersComponent,
    //MultipleChoiceParentComponent,
    //MultipleChoiceComponent,
    //FinishQuizComponent,
    //CancelSessionDialogComponent,
    //SchedulesHomeComponent,
    //ReportSessionIssueDialogComponent,
    //ToastrComponent,
    HelpPanelComponent,
    HelpTeachersMainComponent,
    HelpStudentsMainComponent,
    HelpApplicantsMainComponent,
    HelpMainComponent,
    //ViewAllSessionDialogComponent,
    //LearnerSessionRatingDialogComponent,
    //ResourceEditComponent,
    //ResourcesCollectionComponent,
    //ArticleParentComponent,
    UserTransactionsActionsDialogComponent,
    //QuestionParentComponent,
    //ResourceParentComponent,
    //ArticleModifyComponent,
    //ResourcesArticleShowComponent,
    //ResourcesQuestionComponent,
    //ResourcesQuestionShowComponent,
    ResourcesReferenceShowComponent,
    FormlabelhighlightDirective,
    HelpArticleComponent,
    //FillBlankComponent,
    HelpArticleComponent
  ],

  imports: [
    SharedModule,
    CommonModule,
    NgtUniversalModule,
    // Register module
    NgxJsonLdModule,
    ToastrModule.forRoot(),
    StarRatingModule.forRoot(),
    HttpClientModule,
    RouterModule.forRoot(appRoutes, { preloadingStrategy: AppCustomPreloader }),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatButtonModule,
    //MatMenuTrigger ,
    MatSelectModule,
    MatDividerModule,
    CKEditorModule,
    MatStepperModule,
    ImageCropperModule,
    MatAutocompleteModule, MatBadgeModule, MatCheckboxModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatPaginatorModule,
    MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule
    ],

  entryComponents: [
    NewUserComponent,
    LoginComponent,
    PasswordResetComponent,
    ContactDialogComponent,
    TutorAgreementComponent,
    ImageEditorDialogComponent,
    //TutorReportDialogComponent,
    //SessionEditDialogComponent,
    //FinishQuizComponent,
    //CancelSessionDialogComponent,
    //TutorReportDialogComponent,
    //ReportSessionIssueDialogComponent,
    StripePaymentComponent,
    //ViewAllSessionDialogComponent,
    //LearnerSessionRatingDialogComponent,
    UserTransactionsActionsDialogComponent,
    //ToastrComponent
  ],

  providers: [
    LearnerService,
    GeneralService,
    NewTutorService,
    UserService,
    TutorService,
    AuthService,
    FileValidationService,
    ProfileHelperService,
    RepositoryService,
    RestrictGuard,
    AccessTutorGuard,
    AccessApplyGuard,
    AccessApplicantGuard,
    ResourceRepositoryService,
    AlertNotificationService,
    AppCustomPreloader,
    //{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent
    //,ToastrComponent
  ],
})
export class AppModule { }
