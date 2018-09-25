import { Component, OnInit, OnChanges, ChangeDetectorRef, Input, Output, EventEmitter} from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LoginComponent } from '../../../../fcomponents/basic/login/login.component';
import { environment } from '../../../../../environments/environment.prod';
import { AuthService } from '../../../../services/security/auth.service';
import { UserService } from '../../../../services/servercalls/user.service';
import { CommonSupportService } from '../../../../services/support/common-support.service';
// import { AlertNotificationService } from '../../../../services/support/alert-notification.service';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})

export class DiscussionComponent implements OnInit {
  @Input() discussionId: string;
  @Input() comments:any;
  @Output() refreshComment = new EventEmitter();
  dialogRef: MatDialogRef<LoginComponent>;
  isLogin = false;
  errorFlag = false;
  feedbackMessage: string;
  comment :string;
  userName:string;
  discussionDetail:any;
  imgSrc: string;
  defaultImgUrl = 'http://proprius.co.nz/api/public/userimg/default-cp.jpeg';

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService:AuthService,
    private userService:UserService,
    public changeDetectorRef:ChangeDetectorRef,
    private commonSupport: CommonSupportService,
    // private alertservice: AlertNotificationService

  ) { }
  
  ngOnInit() {
    this.initContent();
    this.userLoginStatus();
  }

  ngOnChanges() {
    //sort by date created_at
    this.comments.sort((a,b)=>{
      console.log('did comments sort!!!!!!');
      if (a.created_at < b.created_at) { return 1; } 
      else if (a.created_at > b.created_at) { return -1; } 
      else { return 0; }
    })
  }

  // Initiate discussion content at the first of all
  initContent(){
    let id ;
    this.route.params.subscribe(params => {
      id = params['id'];
    });
    this.userService.showDiscussion(id).subscribe(
      (res)=>{
        console.log(res);
        this.discussionDetail = res['dataCon'].userDiscussion;
        this.discussionDetail.creator_photo='default4.png';
        this.imgSrc = this.commonSupport.findUserImg(this.discussionDetail.user_id);
        console.log(this.imgSrc);
        console.log(this.discussionDetail);
      },
      (err)=>{
        console.warn(err)
        this.errorFlag = true;
        this.feedbackMessage = 'Sorry, we can not get discussion information right now.';
        this.ariseAlert('INFO', 'toast-center-center', 8000);
      }); 
  }

  // when user Profile img not being edited, put default img into it.
  public onError(e){
    e.target.src=this.defaultImgUrl;
  }

  // check user status is login or not
  userLoginStatus() {
    if(this.authService.getAuth()){
      this.isLogin = true;
      this.userName = localStorage.getItem('lsaUserName');
    } else {
      this.isLogin = false;
      this.userName = 'comments';
    }
  }

  // open login dialog
  loginUser($event){
    let dialogRef = this.dialog.open(LoginComponent, 
      {panelClass: 'dialog1'});
  }

  saveComment(){
    console.log(this.discussionId);
    console.log(this.comment);  
    let discussionComment = {comment:''};
    discussionComment.comment = this.comment;
    this.errorFlag=false;
    
    if ((this.comment===undefined ||this.comment===null)){
      this.errorFlag=true;
      this.feedbackMessage = "The comment is required."
      this.ariseAlert('WARNING', 'toast-top-right', 3000);
      return;
    }
    if ((this.comment.length < 5) ){
      this.errorFlag=true;
      this.feedbackMessage = "The comment input should be at lease 5 characters."
      this.ariseAlert('WARNING', 'toast-top-right', 3000);
      return;
    }
    this.userService.storeUserDiscussionComment(this.discussionDetail.id,discussionComment).subscribe(
      (res)=>{
        console.log(res);
        this.comment = '';
        this.feedbackMessage = 'Your comment has been submitted successfully.';
        this.ariseAlert('SUCCESS', 'toast-top-right', 3000);
        // this.refreshComment.emit();
      },   
      (err)=>{
        console.warn(err)
        this.errorFlag = true;
        this.feedbackMessage = 'Sorry, something went wrong.';
        this.ariseAlert('ERROR', 'toast-top-right', 3000);
      }      
    )
  }

  ariseAlert(messageType, position, duration) {
    // this.alertservice.sendAlert(this.feedbackMessage, messageType, position, duration);
    console.log("The result is :", this.feedbackMessage);
  }


}
