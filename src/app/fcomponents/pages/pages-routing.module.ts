import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from '../../fcomponents/pages/about/about.component';
import { ContactComponent } from '../../fcomponents/pages/contact/contact.component';
import { FaqComponent } from '../../fcomponents/pages/faq/faq.component';
import { BlogComponent } from '../../fcomponents/pages/blog/blog.component';
import { FeaturesComponent } from '../../fcomponents/pages/features/features.component';
import { HowItWorksComponent } from '../../fcomponents/pages/how-it-works/how-it-works.component';
import { InvestorRelationsComponent } from '../../fcomponents/pages/investor-relations/investor-relations.component';
import { PrivacyComponent } from '../../fcomponents/pages/privacy/privacy.component';
import { TermsComponent } from '../../fcomponents/pages/terms/terms.component';

const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'faq', component: FaqComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'howitworks', component: HowItWorksComponent },
    { path: 'features', component: FeaturesComponent },
    { path: 'privacy', component: PrivacyComponent },
    { path: 'terms', component: TermsComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'investor', component: InvestorRelationsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
