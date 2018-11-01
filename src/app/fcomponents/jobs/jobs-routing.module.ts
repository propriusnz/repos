import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// All Guards follow
import { RestrictGuard } from '../../services/security/guards/restrict.guard';
import { AccessTutorGuard } from '../../services/security/guards/access-tutor.guard';
import { AccessApplyGuard } from '../../services/security/guards/access-apply.guard';
import { AccessApplicantGuard } from '../../services/security/guards/access-applicant.guard';

import { ApplyTeachComponent } from '../../fcomponents/jobs/apply-teach/apply-teach.component';
import { ApplicantTutorComponent } from '../../fcomponents/jobs/applicant-tutor-manager/applicant-tutor.component';
import { TutorAgreementComponent } from '../../fcomponents/jobs/support/tutor-agreement/tutor-agreement.component';

const routes: Routes = [
    { path: 'teach', component: ApplyTeachComponent, canActivate: [RestrictGuard, AccessApplyGuard] },
    { path: 'manager', component: ApplicantTutorComponent, canActivate: [RestrictGuard, AccessApplicantGuard] },
    ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
