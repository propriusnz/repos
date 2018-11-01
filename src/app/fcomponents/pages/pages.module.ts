import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagesRoutingModule } from './pages-routing.module';

import { AboutComponent } from '../../fcomponents/pages/about/about.component';
import { ContactComponent } from '../../fcomponents/pages/contact/contact.component';
import { FaqComponent } from '../../fcomponents/pages/faq/faq.component';
import { BlogComponent } from '../../fcomponents/pages/blog/blog.component';
import { FeaturesComponent } from '../../fcomponents/pages/features/features.component';
import { HowItWorksComponent } from '../../fcomponents/pages/how-it-works/how-it-works.component';
import { InvestorRelationsComponent } from '../../fcomponents/pages/investor-relations/investor-relations.component';
import { PrivacyComponent } from '../../fcomponents/pages/privacy/privacy.component';
import { TermsComponent } from '../../fcomponents/pages/terms/terms.component';

@NgModule({
  imports: [
    CommonModule,
    PagesRoutingModule,
    FormsModule, ReactiveFormsModule
   ],
  declarations: [
    AboutComponent,
    ContactComponent,
    FaqComponent,
    HowItWorksComponent,
    PrivacyComponent,
    FeaturesComponent,
    InvestorRelationsComponent,
    TermsComponent,
    BlogComponent,
    ]
})
export class PagesModule { }
