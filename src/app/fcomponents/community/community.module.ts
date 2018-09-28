import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/sharedModule';

import { CommunityRoutingModule } from './Community-routing.module';


import { DiscussionComponent } from './discussions/discussion/discussion.component';
import { DiscussionsSearchComponent } from './discussions/discussions-search/discussions-search.component';
import { NewDiscussionComponent } from './discussions/new-discussion/new-discussion.component'

import { PostComponent } from './posts/post/post.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostsSearchComponent } from './posts/posts-search/posts-search.component'

import { ShowResourceComponent } from '../dashboard/resources-homework/show-resource/show-resource.component';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MatPaginatorModule,
    CommunityRoutingModule    
  ],
  declarations: [//CommunityComponent,
    DiscussionsSearchComponent,
    DiscussionComponent,
    NewDiscussionComponent,
    PostComponent,
    PostEditComponent,
    PostsSearchComponent,
    ShowResourceComponent
    ]
})
export class CommunityModule { }
