import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';
import { Validators,FormGroup, FormControl, FormBuilder, FormControlName } from '@angular/forms';

@Component({
  selector: 'app-tutor-report-dialog',
  templateUrl: './tutor-report-dialog.component.html',
  styleUrls: ['./tutor-report-dialog.component.css']
})
export class TutorReportDialogComponent implements OnInit {
  reportContent = '';
  reportForm: FormGroup;
  agIndex=['Student behaved well','Student showed a positive attitude','Student was very horriable','Student was unfocused','Student needs to show more appropriate behavior','Other'];
  filter = true;
  reason = new FormControl('');
  constructor(
    private builder: FormBuilder,
    private dialogRef: MatDialogRef<TutorReportDialogComponent>,
    private elem: ElementRef,
    @Inject(MAT_DIALOG_DATA) public data: string,
  ) { }

  ngOnInit() {
    console.log('report data', this.data);
    this.reportForm = this.builder.group({ 'Student behaved well':['',],'Student showed a positive attitude':['',],'Student was very horriable':['',],'Student was unfocused':['',],'Student needs to show more appropriate behavior':['',],
    'Other':['',],'comment':['',Validators.minLength(2)]});
  }
  close() {
    this.dialogRef.close();
  }
  save() {
    console.log(this.reportForm.value);
    let reportData = {  tutor_report:'' };
    let checkboxes = this.elem.nativeElement.querySelectorAll('input[type="checkbox"]');
    let checkedOne = Array.prototype.slice.call(checkboxes).some(x => x.checked);
    if(checkedOne){
      for(let x of this.agIndex){
        console.log(x);
        if(this.reportForm.value[x]){
          if(reportData.tutor_report===''){
            reportData.tutor_report = reportData.tutor_report + x;
          }else{
            reportData.tutor_report = reportData.tutor_report +','+x;
          };
        }
      }
      if(this.reportForm.value['comment']!==''){
        reportData.tutor_report = reportData.tutor_report+','+this.reportForm.value['comment'];
      };
      console.log(reportData);
      this.dialogRef.close(reportData);
    }else{
      console.log('no');
    }
  }

  onFilterChange(eve: any) {
    this.filter = !this.filter;
  }

}
