import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsRoutingModule } from './jobs-routing.module';

import { ApplyTeachComponent } from '../../fcomponents/jobs/apply-teach/apply-teach.component';
import { ApplicantTutorComponent } from '../../fcomponents/jobs/applicant-tutor-manager/applicant-tutor.component';
import { TutorAgreementComponent } from '../../fcomponents/jobs/support/tutor-agreement/tutor-agreement.component';

@NgModule({
  imports: [
    CommonModule,
    JobsRoutingModule,
    FormsModule, ReactiveFormsModule
   ],
  declarations: [
    ApplicantTutorComponent,
    ApplyTeachComponent,
    TutorAgreementComponent,
    ]
})
export class JobsModule { }
