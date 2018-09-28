import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//import { ResourceEditComponent } from '../fcomponents/dashboard/resources-homework/resource-edit/resource-edit.component';
import { ResourcesQuestionShowComponent } from '../fcomponents/dashboard/resources-homework/show-resource/question/resources-question-show/resources-question-show.component';
import { ResourcesArticleShowComponent } from '../fcomponents/dashboard/resources-homework/show-resource/article/resources-article-show/resources-article-show.component';
import { SideHelperComponent } from '../fcomponents/basic/side-helper/side-helper.component';
import { ToastrComponent } from '../fcomponents/basic/toastr/toastr.component';
import { ApplicantTutorComponent } from '../fcomponents/jobs/applicant-tutor-manager/applicant-tutor.component';
import { ResourcesCollectionComponent } from '../fcomponents/dashboard/resources-homework/resources-collection/resources-collection.component';
import { ArticleParentComponent } from '../fcomponents/dashboard/resources-homework/resources-collection/article-parent/article-parent.component';
import { QuestionParentComponent } from '../fcomponents/dashboard/resources-homework/resources-collection/question-parent/question-parent.component'
import { ArticleModifyComponent } from '../fcomponents/dashboard/resources-homework/resources-collection/article-parent/article-modify/article-modify.component';
import { MultipleChoiceComponent } from '../fcomponents/dashboard/resources-homework/resources-collection/question-parent/resources-question/multiple-choice/multiple-choice.component'
import { ShortAnswersComponent } from '../fcomponents/dashboard/resources-homework/resources-collection/question-parent/resources-question/short-answers/short-answers.component';
import { FillBlankComponent } from '../fcomponents/dashboard/resources-homework/resources-collection/question-parent/resources-question/fill-blank/fill-blank.component';
import { MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material';

//MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatListModule, MatMenuModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule, MatTreeModule, MatNativeDateModule, DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE
@NgModule({
    imports:      [  
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatMenuModule,MatCheckboxModule,
        MatDialogModule, MatCardModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, 
        MatAutocompleteModule, MatBadgeModule, MatBottomSheetModule, MatButtonModule, 
        MatButtonToggleModule, MatChipsModule, MatDividerModule, MatExpansionModule, MatGridListModule, 
        //MatIconModule, MatListModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, 
        //MatRippleModule, MatSelectModule, MatSidenavModule, MatSliderModule, MatSlideToggleModule, 
        //MatSnackBarModule, MatSortModule, MatTableModule, MatTabsModule, MatToolbarModule, 
        //MatTooltipModule, MatTreeModule, MatNativeDateModule        
    ],
    declarations: [ 
        ResourcesQuestionShowComponent,
        ResourcesArticleShowComponent,
        SideHelperComponent,
        ToastrComponent,
        ApplicantTutorComponent,
        ResourcesCollectionComponent,
        ArticleParentComponent,
        QuestionParentComponent,
        ArticleModifyComponent,
        MultipleChoiceComponent,
        ShortAnswersComponent,
        FillBlankComponent
     ],
    exports: [
        ResourcesQuestionShowComponent,
        ResourcesArticleShowComponent,
        SideHelperComponent,
        ToastrComponent,
        ApplicantTutorComponent,
        ResourcesCollectionComponent,
        ArticleParentComponent,
        QuestionParentComponent,
        ArticleModifyComponent,
        MultipleChoiceComponent,
        ShortAnswersComponent,
        FillBlankComponent
      ],
    entryComponents: [ToastrComponent]
 })
 export class SharedModule { }