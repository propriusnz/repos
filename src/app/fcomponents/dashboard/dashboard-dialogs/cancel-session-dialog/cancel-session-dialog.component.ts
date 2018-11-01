import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-cancel-dialog',
  templateUrl: './cancel-session-dialog.component.html',
  styleUrls: ['./cancel-session-dialog.component.css']
})
export class CancelSessionDialogComponent implements OnInit {
  rescheduleStatus = false;
  withTwelveHours: boolean;
  showDialog = true;
  showComment = false;
  warningMes = '';
  comment = new FormControl('');
  constructor(
    private dialogRef: MatDialogRef<CancelSessionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.withTwelveHours = this.data[2];
    console.log(this.withTwelveHours);
    // Remove padding top and padding bottom gaps
    $('.dialog1 .mat-dialog-container').css({'padding-top':'0', 'padding-bottom':'0'});
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    console.log(this.comment.value);
    let user_ticked = '';
    $.each($('input[name=\'tick_comment\']:checked'), function(){
      user_ticked += $(this).val() + ', ';
  });
    console.log(user_ticked);
    let user_comment = this.comment.value + ',' + user_ticked;
    if (user_comment === ',') {
      this.warningMes = '* Please give some comments before cancel the lesson';
    } else {
      this.dialogRef.close(['yes', user_comment]);
    }
  }
  reschedule() {
    this.showComment = false;
    console.log('reschedule the lesson --------');
    this.rescheduleStatus = true;
    this.dialogRef.close([this.rescheduleStatus]);
  }
  // show comment dialog when user clicks cancel lesson button
  commentDialog() {
    this.showDialog = false;
    this.showComment = true;
  }
}
