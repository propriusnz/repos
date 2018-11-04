import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// All Guards follow
import { RestrictGuard } from '../../services/security/guards/restrict.guard';


import { AccessTutorGuard } from '../../services/security/guards/access-tutor.guard';
import { AccessApplyGuard } from '../../services/security/guards/access-apply.guard';
import { AccessApplicantGuard } from '../../services/security/guards/access-applicant.guard';

import { LearnerProfileEditComponent } from './profiles/learner-profile-edit/learner-profile-edit.component'; //learner
import { LearnerTutorsPanelComponent } from './learner-tutors/learner-tutors-panel/learner-tutors-panel.component'; //learner
import { ViewAllSessionDialogComponent } from './dashboard-dialogs/view-all-session-dialog/view-all-session-dialog.component'; //learner
import { OrderConfirmComponentComponent } from './order/order-confirm-component/order-confirm-component.component';//learner
import { LessonOrderComponent } from './order/lesson-order/lesson-order.component'

const routes: Routes = [
    /*{ path: 'discussions/:id', component: DiscussionComponent },
    { path: 'discussions', component: DiscussionsSearchComponent },
    { path: 'newdiscussions', component: NewDiscussionComponent }*/
    { path: 'mytutors', component: LearnerTutorsPanelComponent },
    { path: 'mylearners', component: LearnerTutorsPanelComponent },
    { path: 'profile', component: LearnerProfileEditComponent },
    { path: 'myorders', component: LessonOrderComponent },     
    { path: 'order/:id', component: OrderConfirmComponentComponent }, 
    ];

@NgModule({
  imports: [RouterModule.forChild(routes),
    ],
  exports: [RouterModule]
})
export class DashboardLearnerRoutingModule { }