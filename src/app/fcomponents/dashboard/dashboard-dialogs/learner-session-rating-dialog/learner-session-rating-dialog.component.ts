import { LearnerService } from '../../../../services/servercalls/learner.service';
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
  rate: any
  errorMessage: string;

  onClickResult: ClickEvent;
  onHoverRatingChangeResult: HoverRatingChangeEvent;
  onRatingChangeResult: RatingChangeEvent;

  agIndex = [];
  reportForm: FormGroup;

  constructor(
    private builder: FormBuilder,
    private learnerServive: LearnerService,
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
    // set the options
    this.agIndex = ['Student was late','Student was absent','Student left early',
      'Student-related technical difficulities','Other'];
    this.reportForm = this.builder.group({ 'Student was late':['',],'Student was absent':['',],'Student left early':['',],'Teacher was absent':['',],'Teacher was late':['',],'Teacher left early':['',],
    'My own technical difficulities':['',],'Student-related technical difficulities':['',],'Other':['',],'comment':['',Validators.minLength(2)]});
  }

  onstarClick = ($event: ClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;
    this.rate = this.onClickResult;
  };

  // onSubmit(){
  //   console.log("submited")
  //   this.learnerServive.storeLearnerSessionsRating(this.tutors.session_id, this.rate).subscribe(
  //     (res) => {
  //       console.log(res);
  //     },
  //     (err) => { console.log(err), this.errorMessage = "Sorry, but something went wrong." }
  //   )

  //   this.dialogRef.close("Done")
  // }

  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.reportForm.value);
    let reportData = {
      problem:'',
      comment:''
    };
    let checkboxes = this.elem.nativeElement.querySelectorAll('input[type="checkbox"]');
    let checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
    if(checkedOne){
      for(let x of this.agIndex){
        if(this.reportForm.value[x]){
          if(reportData.problem===''){
            reportData.problem = reportData.problem + x;
          }else{
            reportData.problem = reportData.problem +','+x;
          };
        }
      }
      reportData.comment = this.reportForm.value['comment'];
      console.log(reportData);
      this.dialogRef.close();
    }else{
      console.log('no');
    }

    }


}
