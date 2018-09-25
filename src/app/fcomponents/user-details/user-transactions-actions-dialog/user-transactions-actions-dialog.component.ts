import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { Validators, FormGroup, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { LearnerService } from '../../../services/servercalls/learner.service';

@Component({
  selector: 'app-user-transactions-actions-dialog',
  templateUrl: './user-transactions-actions-dialog.component.html',
  styleUrls: ['./user-transactions-actions-dialog.component.css']
})
export class UserTransactionsActionsDialogComponent implements OnInit {
  disputeForm: FormGroup;
  agIndex=[];
  userComment = '';
  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<UserTransactionsActionsDialogComponent>,
    private elem: ElementRef,
    private learnerService: LearnerService,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) {
  }
  showWarningMes = false;
  ngOnInit() {
    this.userComment = "Comments to your teacher";
    this.agIndex = ['Teacher was absent','Teacher was late','Teacher left early','Teacher-related bad behavour in class',
    'My own technical difficulities', 'Learnspace-related technical difficulities','Other'];
    
    this.disputeForm = this.builder.group({ 'Student was late':['',],'Student was absent':['',],'Student left early': ['',],'Teacher was absent':['',],'Teacher was late':['',],'Teacher left early':['',],'Teacher-related bad behavour in class':['',],
    'My own technical difficulities':['',],'Student-related bad behaviour in class':['',],'Student cannot finish the given tasks':['',],'Learnspace-related technical difficulities':['',],'Other':['',],'comment':['',Validators.minLength(2)]});
  }
  close() {
    this.dialogRef.close();
  }

  save() {
    console.log(this.disputeForm.value);
    let reportData = {  dispute: [] };
    let checkboxes = this.elem.nativeElement.querySelectorAll('input[type="checkbox"]');
    let checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
    let hasComment = false;
    if (this.disputeForm.value['comment'] !== '') {
      hasComment = true;
    }
    // if has dispute
    if (checkedOne || hasComment) {
      this.showWarningMes = false;
      for (let x of this.agIndex){
        console.log(x);
        if ( this.disputeForm.value[x]) {
          reportData['dispute'].push(x);
        }
      }
      if ( this.disputeForm.value['comment'] !== '') {
        reportData['dispute'].push({
          comment: this.disputeForm.value['comment'],
        });
      }
      console.log(reportData);
      // send to server
      this.dialogRef.close(reportData);
    } else {
      // nothing chosen or input
      this.showWarningMes = true;
    }
  }
}
