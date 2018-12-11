import { LearnerService } from '../../../../services/servercalls/learner.service';
import { UserService } from '../../../../services/servercalls/user.service';

import {
  ClickEvent,
  HoverRatingChangeEvent,
  RatingChangeEvent
} from 'angular-star-rating';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Validators,FormGroup, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { Component, OnInit, Inject, ElementRef } from '@angular/core';


@Component({
  selector: 'app-learner-session-rating-dialog',
  templateUrl: './learner-session-rating-dialog.component.html',
  styleUrls: ['./learner-session-rating-dialog.component.css']
  
})
export class LearnerSessionRatingDialogComponent implements OnInit {
  tutors: any;
  rate = 0;
  submit=false;
  errorMessage: string;
  isCheckable = true;

  onClickResult: ClickEvent;
  onHoverRatingChangeResult: HoverRatingChangeEvent;
  onRatingChangeResult: RatingChangeEvent;

  awdIndex = [];
  reportForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<LearnerSessionRatingDialogComponent>,
    private elem: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: any,
  )  {}

  ngOnInit() {
    console.log(this.data)
    this.tutors = {
      name :this.data.tutor_name,
      img: this.data.tutor_img,
      session_time: this.data.session_time,
      session_date: this.data.session_date,
      session_location: this.data.session_location,
      session_id: this.data.session_id
    }
    this.getAward();
    // set the options
  }

  onstarClick = ($event: ClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;
    this.rate = this.onClickResult.rating;
  };
//

    //get award data from server  
  getAward() {
    this.userService.getAwards().subscribe(
      (res) => {
        console.log(res);
        this.awdIndex =res['allAwards'];
         this.reportForm = this.builder.group({ 
            awards:this.builder.array(this.awdIndex.map(e=>this.builder.control(false)),[]) ,
            'comment':['',Validators.minLength(40)]});
        console.log(this.reportForm);
        console.log('get awards sucessed!');
      }
      , (err) => {
        console.warn(err);
      }
    );
  }
  
  close() {
    this.dialogRef.close();
  }

  save() {
    let comment={comment:''};
    let ratingData = {
      ratings:0,
      award:[]
    };
    this.isCheckable = false;
    this.submit = true;
    comment.comment = this.reportForm.value.comment;

    console.log(this.reportForm.value);
    if (comment.comment.length<40){
      this.isCheckable = true;
      return;
    }
    ratingData.ratings = this.rate;
    
    this.reportForm.value.awards.map((e,index)=>{
      if (e===true){
        ratingData.award.push(this.awdIndex[index].award_id);
      }
    });    

    console.log(ratingData,);
      this.dialogRef.close([ratingData,comment]);
    }
}
