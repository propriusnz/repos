import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { Validators,FormGroup, FormControl, FormBuilder, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-report-session-issue-dialog',
  templateUrl: './report-session-issue-dialog.component.html',
  styleUrls: ['./report-session-issue-dialog.component.css']
})
export class ReportSessionIssueDialogComponent implements OnInit {
  reportForm: FormGroup;
  // all possible problem related to the report issue
  // agIndex=['Student was late','Student was absent','Student left early','Teacher was absent','Teacher was late','Teacher left early',
  // 'Student-related technical difficulities', 'Teacher-related technical difficulities','Learnspace-related technical difficulities','Lesson status should be Completed','Other'];
  agIndex = [];
  userRole = '';
  userComment = '';
  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<ReportSessionIssueDialogComponent>,
    private elem: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: string, ) { }

  ngOnInit() {
    this.userRole = localStorage.getItem('lsaWho');
    if(this.userRole==='3'){
      this.userComment = "Comments";
      this.agIndex = ['Student was late','Student was absent','Student left early',
      'Student-related technical difficulities', 'My own technical difficulities','Learnspace-related technical difficulities','Lesson status should be Completed','Other'];
    }else{
      this.userComment = "Comments";
      this.agIndex = ['Teacher was absent','Teacher was late','Teacher left early',
      'My own technical difficulities', 'Teacher-related technical difficulities','Learnspace-related technical difficulities','Lesson status should be Completed','Other'];
    };
    console.log(this.agIndex);
    this.reportForm = this.builder.group({ 'Student was late':['',],'Student was absent':['',],'Student left early':['',],'Teacher was absent':['',],'Teacher was late':['',],'Teacher left early':['',],
    'My own technical difficulities':['',],'Student-related technical difficulities':['',], 'Teacher-related technical difficulities':['',],'Learnspace-related technical difficulities':['',],'Lesson status should be Completed':['',],'Other':['',],'comment':['',Validators.minLength(2)]});
  }
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