import { NgtUniversalModule } from '@ng-toolkit/universal';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastContainerModule } from 'ngx-toastr';

//define Custom Preloader js
import { AppCustomPreloader } from './app-routing-loader';

import { SharedModule } from '../app/shared/shared.module';

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
import { TutorprofileComponent } from './fcomponents/find/tutorprofile/tutorprofile.component';
import { FindMainComponent } from './fcomponents/find/find-main/find-main.component';
import { FindSideComponent } from './fcomponents/find/find-side/find-side.component';
import { FindPanelComponent } from './fcomponents/find/find-panel/find-panel.component';
import { NewUserComponent } from './fcomponents/basic/newuser/newuser.component';
import { LoginComponent } from './fcomponents/basic/login/login.component';
import { NewUserWelcomeComponent } from './fcomponents/support/new-user-welcome/new-user-welcome.component';
import { fcomponentsComponent } from './fcomponents/fcomponents-control';
import { HomeComponent } from './landing/home/home.component';
import { WorkComponent } from './landing/work/work.component';
import { ContactDialogComponent } from './fcomponents/basic/contact-dialog/contact-dialog.component';
// import { UserEditDetailsComponent } from './fcomponents/user-details/user-edit-details/user-edit-details.component';
import { UserDetailsEditComponent } from './fcomponents/user-details/user-details-edit/user-details-edit.component';
import { PasswordResetComponent } from './fcomponents/basic/password-reset/password-reset.component';
import { UserPasswordComponent } from './fcomponents/user-details/user-password/user-password.component';
import { UserDetailsPanelComponent } from './fcomponents/user-details/user-details-panel/user-details-panel.component';
import { ExternalLoadComponent } from './fcomponents/support/external-load/external-load.component';
import { TutorBookingsComponent } from './fcomponents/find/tutor-bookings/tutor-bookings.component';
import { UserTransactionsComponent } from './fcomponents/user-details/user-transactions/user-transactions.component';
import { ImageEditorDialogComponent } from './fcomponents/support/image-editor-dialog/image-editor-dialog.component';
import { UserPaymentInfoComponent } from './fcomponents/user-details/user-payment-info/user-payment-info.component';
import { StripePaymentComponent } from './fcomponents/support/stripe-payment/stripe-payment.component';
import { MomentDateAdapter} from '@angular/material-moment-adapter';
import { UserTransactionsActionsDialogComponent} from './fcomponents/user-details/user-transactions-actions-dialog/user-transactions-actions-dialog.component';

import { FormlabelhighlightDirective } from './fcomponents/dashboard/resources-homework/support/formlabelhighlight.directive';
import { TutorRatingsComponent } from './fcomponents/find/tutor-ratings/tutor-ratings.component';
import { TutorStatsComponent } from './fcomponents/find/tutor-stats/tutor-stats.component';

import { NotificationComponent } from './fcomponents/notifications/notification/notification.component';
import { NotificationDialogComponent } from './fcomponents/notifications/notification-dialog/notification-dialog.component';


//chat 
import { SocketService } from './services/servercalls/socket.service';
import { ChatComponent } from './fcomponents/chat/chat.component';
import { DrawboardComponent } from './fcomponents/chat/drawboard/drawboard.component';
import { PreviewImgComponent } from './fcomponents/chat/preview-img/preview-img.component';
import { DashboardComponent } from './fcomponents/chat/chat-dash/dashboard.component';
import { ChatWindowComponent } from './fcomponents/chat/chat-window/chat-window.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { PickerModule } from '@ctrl/ngx-emoji-mart';

// All Routes follow
const appRoutes: Routes = [
  {
    path: 'app', component: fcomponentsComponent,
    children: [
      // Static pages
      {
        path: 'pages',
        loadChildren:'./fcomponents/pages/pages.module#PagesModule',
        },      
      // help pages
      {
        path: 'help',
        loadChildren:'./fcomponents/help/help.module#HelpModule',
        },
      //Notifications
      { 
        path: 'notifications', component: NotificationComponent,
      },                   
      // Load landing
      { path: 'external/:event', component: ExternalLoadComponent },
      { path: 'onboard/:first_name', component: NewUserWelcomeComponent },
      // Find tutors
      { path: 'find-tutor/:', component: FindPanelComponent },
      { path: 'find-tutor', component: FindPanelComponent },
      { path: 'find-tutor/profile/:id', component: TutorprofileComponent },
      { path: 'find-tutor/profile/:id/book', component: TutorBookingsComponent, canActivate: [RestrictGuard] },
      { path: 'find-tutor-wellington/:', component: FindPanelComponent },
      { path: 'find-tutor-wellington', component: FindPanelComponent },
      { path: 'find-tutor-wellington/profile/:id', component: TutorprofileComponent },
      { path: 'find-tutor-wellington/profile/:id/book', component: TutorBookingsComponent, canActivate: [RestrictGuard] },

      // Community routes

      {
      path: 'community',
      loadChildren:'./fcomponents/community/community.module#CommunityModule',
      },
      // Dashboard routes
      {
        path: 'dashboard',
        loadChildren: './fcomponents/dashboard/dashboard.module#DashboardModule'
      },
      // Jobs specific routes
      {
        path: 'apply',
        loadChildren: './fcomponents/jobs/jobs.module#JobsModule'
      },
      // User specific routes
      {
        path: 'user', component: UserDetailsPanelComponent, canActivate: [RestrictGuard],
        children: [
          { path: 'details', component: UserDetailsEditComponent },
          { path: 'password', component: UserPasswordComponent },
          { path: 'transactions', component: UserTransactionsComponent },
          { path: 'payment-info', component: UserPaymentInfoComponent },
        ]
      },
      { path: 'transaction', component: UserTransactionsComponent},


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
    TutorprofileComponent,
    FindMainComponent,
    FindSideComponent,
    FindPanelComponent,

    NewUserComponent,

    LoginComponent,
    NewUserWelcomeComponent,
    fcomponentsComponent,
    HomeComponent,
    WorkComponent,
    ContactDialogComponent,
    UserDetailsEditComponent,
    PasswordResetComponent,
  
    UserPasswordComponent,

    UserDetailsPanelComponent,

    ExternalLoadComponent,
    //TutorBookingsComponent,
    UserTransactionsComponent,
    ImageEditorDialogComponent,
    StripePaymentComponent,
    //UserPaymentInfoComponent,
    UserTransactionsActionsDialogComponent,
    FormlabelhighlightDirective,
    TutorRatingsComponent,
    TutorStatsComponent,
    NotificationComponent,
    NotificationDialogComponent,
    //for chat begin
    DashboardComponent,
    PreviewImgComponent,
    DrawboardComponent,
    ChatComponent,
    ChatWindowComponent,
    //for chat end

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
    MatSelectModule,
    MatDividerModule,
    CKEditorModule,
    MatStepperModule,
    ImageCropperModule,
    MatAutocompleteModule, MatBadgeModule, MatCheckboxModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatPaginatorModule,
    MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule,
    //for chat
    PickerModule,
    NgbModule,
    ],

  entryComponents: [
    NewUserComponent,
    LoginComponent,
    PasswordResetComponent,
    ContactDialogComponent,
    ImageEditorDialogComponent,
    StripePaymentComponent,
    UserTransactionsActionsDialogComponent,
    NotificationDialogComponent,
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
    SocketService,
    //{ provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro },
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  bootstrap: [AppComponent,
    //,ToastrComponent
    PreviewImgComponent,
    DrawboardComponent   
  ],
})
export class AppModule { }
