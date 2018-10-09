import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HelpApplicantsMainComponent } from '../../fcomponents/help/applicants/help-applicants-main/help-applicants-main.component';
import { HelpArticleComponent } from '../../fcomponents/help/help-article/help-article.component';
import { HelpMainComponent } from '../../fcomponents/help/help-main/help-main.component';
import { HelpPanelComponent } from '../../fcomponents/help/help-panel/help-panel.component';
import { HelpTeachersMainComponent } from '../../fcomponents/help/teachers/help-teachers-main/help-teachers-main.component';
import { HelpStudentsMainComponent } from '../../fcomponents/help/students/help-students-main/help-students-main.component';

const routes: Routes = [
    /*
    { path: 'about', component: AboutComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'howitworks', component: HowItWorksComponent },
    { path: 'features', component: FeaturesComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'investor', component: InvestorRelationsComponent }];*/

    {path: '/', component: HelpPanelComponent},
    {path: 'home', component: HelpMainComponent },
    {path: 'teachers', component: HelpTeachersMainComponent },
    {path: 'students', component: HelpStudentsMainComponent },
    {path: 'applicants', component: HelpApplicantsMainComponent },
    {path: 'article/:articletype/:id', component: HelpArticleComponent}
    ];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HelpRoutingModule { }
