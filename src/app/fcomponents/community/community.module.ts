import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';

import { CommunityRoutingModule } from './Community-routing.module';


import { DiscussionComponent } from './discussions/discussion/discussion.component';
import { DiscussionsSearchComponent } from './discussions/discussions-search/discussions-search.component';
import { NewDiscussionComponent } from './discussions/new-discussion/new-discussion.component';

import { PostComponent } from './posts/post/post.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostsSearchComponent } from './posts/posts-search/posts-search.component';


import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

import {MatTabsModule} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatPaginatorModule,
    MatTabsModule,
    CommunityRoutingModule,
  ],
  declarations: [
    DiscussionsSearchComponent,
    DiscussionComponent,
    NewDiscussionComponent,
    PostComponent,
    PostEditComponent,
    PostsSearchComponent,
    ]
})
export class CommunityModule { }
