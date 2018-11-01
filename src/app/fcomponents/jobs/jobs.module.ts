import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JobsRoutingModule } from './jobs-routing.module';

import { SharedModule } from '../../shared/shared.module';
import { ApplyTeachComponent } from '../../fcomponents/jobs/apply-teach/apply-teach.component';
//import { ApplicantTutorComponent } from '../../fcomponents/jobs/applicant-tutor-manager/applicant-tutor.component';
import { TutorAgreementComponent } from '../../fcomponents/jobs/support/tutor-agreement/tutor-agreement.component';
/* import { MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule,
  MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, 
  MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule,
   MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule,
    MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, 
    MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule,
     MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter,
      MAT_DATE_FORMATS, MAT_DATE_LOCALE,MatMenuTrigger  } from '@angular/material'; */
import {MatDatepickerModule,
        MatFormFieldModule,
        } from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';        
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    JobsRoutingModule,
    FormsModule, ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDialogModule
   ],
  declarations: [
    //ApplicantTutorComponent,
    ApplyTeachComponent,
    TutorAgreementComponent,
    ]
})
export class JobsModule { }
