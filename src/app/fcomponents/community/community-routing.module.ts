import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RestrictGuard } from '../../services/security/guards/restrict.guard';
import { AccessTutorGuard } from '../../services/security/guards/access-tutor.guard';

import { DiscussionComponent } from './discussions/discussion/discussion.component';
import { DiscussionsSearchComponent } from './discussions/discussions-search/discussions-search.component';
import { NewDiscussionComponent } from './discussions/new-discussion/new-discussion.component';

import { PostComponent } from './posts/post/post.component';
import { PostEditComponent } from './posts/post-edit/post-edit.component';
import { PostsSearchComponent } from './posts/posts-search/posts-search.component';



const routes: Routes = [
  
  { path: 'discussions/:id', component: DiscussionComponent },
  { path: 'discussions', component: DiscussionsSearchComponent },
  { path: 'newdiscussions', component: NewDiscussionComponent },
  { path: 'posts', component: PostsSearchComponent },
  //{ path: 'posts/:id', component: ShowResourceComponent },
  //{ path: 'showresource', component: ShowResourceComponent },
  { path: 'newpost', component: PostEditComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
  { path: 'editpost/:id', component: PostEditComponent, canActivate: [RestrictGuard, AccessTutorGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
