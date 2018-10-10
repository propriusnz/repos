import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// All Guards follow
import { RestrictGuard } from '../../services/security/guards/restrict.guard';


import { AccessTutorGuard } from '../../services/security/guards/access-tutor.guard';
import { AccessApplyGuard } from '../../services/security/guards/access-apply.guard';
import { AccessApplicantGuard } from '../../services/security/guards/access-applicant.guard';

import { TutorSchedulesEditComponent } from './schedules-lessons/tutor-schedules-edit/tutor-schedules-edit.component';//tutor
import { TutProfileEditPanelComponent } from './profiles/tutor-profile-edit/tut-profile-edit-panel/tut-profile-edit-panel.component';//tutor
import { TutProfileEditKeyComponent } from './profiles/tutor-profile-edit/tut-profile-edit-key/tut-profile-edit-key.component';//tutor
import { TutProfileEditCvComponent } from './profiles/tutor-profile-edit/tut-profile-edit-cv/tut-profile-edit-cv.component';//tutor
import { TutProfileEditSpecialComponent } from './profiles/tutor-profile-edit/tut-profile-edit-special/tut-profile-edit-special.component';//tutor
import { VideoUploadHelpComponentComponent } from './profiles/tutor-profile-edit/tut-profile-edit-key/video-upload-help-component/video-upload-help-component.component';

const routes: Routes = [
    { path: 'learner/homework/view/hw', redirectTo: 'app/community/showresource', pathMatch: 'full' },
    { path: 'schedules/edit', component: TutorSchedulesEditComponent },   
    { path: 'resources/view:id', redirectTo: 'community/posts/:id', canActivate: [RestrictGuard, AccessTutorGuard] },   
    { path: 'videouploadhelp', component: VideoUploadHelpComponentComponent },
    {
      path: 'editprofile', component: TutProfileEditPanelComponent, canActivate: [RestrictGuard, AccessTutorGuard],
      children: [
        //{ path: '', component: TutProfileEditKeyComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
        { path: 'key', component: TutProfileEditKeyComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
        { path: 'cv', component: TutProfileEditCvComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
        { path: 'speciality', component: TutProfileEditSpecialComponent },
       
      ]
    }    
    ];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class DashboardTutorRoutingModule { }