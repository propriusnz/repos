import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../services/servercalls/general.service';
import { ActivatedRoute } from '@angular/router';
import { CommonSupportService } from '../../../../services/support/common-support.service';


@Component({
  selector: 'post-article',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  user_id: number;
  loginUserId = localStorage.getItem('lsaUserId');
  editButton = false;
  postId: string;
  post: any;
  baseUrl="http://ls3.api2";
  postBody: any;

  defaultImgUrl = 'http://proprius.co.nz/api/public/userimg/default-cp.jpeg';
  defaultSubImg = '../../../../../assets/postImgs/default.jpg';
  defaultSubIcon = '../../../../../assets/icons/categoryIcon.png';

  constructor(
    public communitySearchService: GeneralService,
    private route: ActivatedRoute,
    private commonSupport: CommonSupportService

  ) { }

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];
    this.communitySearchService.sendPostId(this.postId);
    this.communitySearchService.showPost(this.postId).subscribe(
      (data)=>{
        console.log(data);
        this.post = data['data'].thisPost;
        if (this.post.post_type === 0) { this.post.post_type = 'Article post'; } 
        else if (this.post.post_type === 1) { this.post.post_type = 'Resource post'; } 
        else if (this.post.post_type === 2) { this.post.post_type = 'Homework post'; }
        if (this.post.user_id.toString() === this.loginUserId){ this.editButton = true; }
        else { this.editButton = false; }
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  // when user Profile img not being edited, put default img into it.
  defaultUserImg(e){
    e.target.src=this.defaultImgUrl;
  }

  // when subjectIcon cannot match to subject name, put default subIcon into it.
  subjectIcon(e){
    e.target.src = this.defaultSubIcon;
  }

  // If user does not insert img into post, add default img instead of null
  subjectImg(e) {
    e.target.src = this.defaultSubImg;
  }
}
