import { Component, OnInit, Inject } from '@angular/core';
import { LearnerService } from '../../../../services/servercalls/learner.service';
import {
  ClickEvent,
  HoverRatingChangeEvent,
  RatingChangeEvent
} from 'angular-star-rating';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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

  constructor(
    private learnerServive: LearnerService,
    private dialogRef: MatDialogRef<LearnerSessionRatingDialogComponent>,
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
  }

  onstarClick = ($event: ClickEvent) => {
    console.log('onClick $event: ', $event);
    this.onClickResult = $event;
    this.rate = this.onClickResult;
  };

  onSubmit(){
    console.log("submited")
    this.learnerServive.storeLearnerSessionsRating(this.tutors.session_id, this.rate).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => { console.log(err), this.errorMessage = "Sorry, but something went wrong." }
    )

    this.dialogRef.close("Done")
  }


}
