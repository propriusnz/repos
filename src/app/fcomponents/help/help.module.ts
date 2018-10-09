import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HelpRoutingModule } from './help-routing.module';

import { HelpApplicantsMainComponent } from '../../fcomponents/help/applicants/help-applicants-main/help-applicants-main.component';
import { HelpArticleComponent } from '../../fcomponents/help/help-article/help-article.component';
import { HelpMainComponent } from '../../fcomponents/help/help-main/help-main.component';
import { HelpPanelComponent } from '../../fcomponents/help/help-panel/help-panel.component';
import { HelpTeachersMainComponent } from '../../fcomponents/help/teachers/help-teachers-main/help-teachers-main.component';
import { HelpStudentsMainComponent } from '../../fcomponents/help/students/help-students-main/help-students-main.component';

@NgModule({
  imports: [
    CommonModule,
    HelpRoutingModule,
    FormsModule, ReactiveFormsModule
   ],
  declarations: [
    HelpPanelComponent,
    HelpTeachersMainComponent,
    HelpStudentsMainComponent,
    HelpApplicantsMainComponent,
    HelpMainComponent,
    HelpArticleComponent,
    HelpArticleComponent,
    ]
})
export class HelpModule { }
