import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../../../services/servercalls/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
// import { AlertNotificationService } from '../../../../services/support/alert-notification.service';

@Component({
  selector: 'app-new-discussion',
  templateUrl: './new-discussion.component.html',
  styleUrls: ['./new-discussion.component.css']
})
export class NewDiscussionComponent implements OnInit {
  createDiscussionFrom: FormGroup;
  errorFlag: boolean;
  errorInfo: string;
  selectedId: any;
  categories: string[] =['Arts','Design', 'Graphics', 'Math', 'Physics', 'Chemistry', 'Biology', 'Science', 'Geography', 'Social Studies', 'Information System', 'Accounting', 'Economics', 'Finance', 'English', 'Maori', 'French', 'German', 'Spanish', 'Chinese', 'Japanese'];

  @Output('_selectChange') private _selectChange = new EventEmitter();

  constructor(
    private fb: FormBuilder, 
    private userService:UserService,
    private router: Router,
    // private alertservice: AlertNotificationService

  ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.createDiscussionFrom = this.fb.group({
      category: ['', Validators.required],
      title: ['', Validators.required],
      body: ['', Validators.required],
      tags: [''],
    });
  }

  saveData(){
    let discussionData  = {
      discussion_author: 'discussion_author',
      discussion_title: 'discussion_title',            
      discussion_categories: 'discussion_categories',  
      discussion_main :"main"       
    };
    let loggedInUserName = localStorage.getItem('lsaUserName');
    discussionData.discussion_author=loggedInUserName;
    discussionData.discussion_title = this.createDiscussionFrom.value.title;
    discussionData.discussion_categories=this.createDiscussionFrom.value.category;
    discussionData.discussion_main = this.createDiscussionFrom.value.body;
    console.log(JSON.stringify(this.createDiscussionFrom.value));
    console.log(this.createDiscussionFrom.value.category);

    this.userService.storeUserDiscussion(discussionData).subscribe(
      (res)=>{
        console.log(res);
        let paraId = res['dataCon'].userDiscussion.id;
        this.errorInfo = 'Your discussion added successfully.';
        this.ariseAlert('SUCCESS', '6000');
        this.router.navigate(['/app/community/discussions/', paraId]);
      },   
      (err)=>{
        console.warn(err)
        this.errorFlag = true;
        this.errorInfo = 'Sorry, something went wrong.';
        this.ariseAlert('ERROR', '5000');
      }      
    )
  }

  cancelBack(){
    history.back();
  };


  ariseAlert(messageType, duration) {
    let position = 'toast-top-right';
    // this.alertservice.sendAlert(this.errorInfo, messageType, position, duration);
    console.log("The result is :", this.errorInfo);
  }
}
