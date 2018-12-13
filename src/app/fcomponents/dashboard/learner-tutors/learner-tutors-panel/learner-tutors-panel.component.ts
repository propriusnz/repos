import { Component, OnInit, Pipe, Input } from '@angular/core';
import { TutorService } from '../../../../services/servercalls/tutor.service';
import { LearnerService } from '../../../../services/servercalls/learner.service';
import { AuthService } from '../../../../services/security/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ViewAllSessionDialogComponent } from '../../dashboard-dialogs/view-all-session-dialog/view-all-session-dialog.component';
import { TutorReportDialogComponent } from '../../dashboard-dialogs/tutor-report-dialog/tutor-report-dialog.component';
//import { ReportSessionIssueDialogComponent } from '../../dashboard-dialogs/report-session-issue-dialog/report-session-issue-dialog.component';
import { environment } from '../../../../../environments/environment.prod';
import * as moment from 'moment';
import { Observable, of } from 'rxjs';
import { GeneralService } from '../../../../services/servercalls/general.service';
import { SearchTutorModel } from '../../../../models/SearchTutorModel';
import { CommonSupportService } from '../../../../services/support/common-support.service';


@Component({
  selector: 'app-learner-tutors-panel',
  templateUrl: './learner-tutors-panel.component.html',
  styleUrls: ['./learner-tutors-panel.component.css']
})
export class LearnerTutorsPanelComponent implements OnInit {
  errorObj={hasError:false,errorMessage:''};
  rolePosition: number;
  students: any;
  tutorlists=[];
  tutorProfiles:any;
  sessions: any;
  errorMessage: string;
  display: any = window;
  baseImgUrl = environment.baseUserImgUrl;
  tutor:any;
  tutors=[];
  constructor(
    private dialog: MatDialog,
    private tutorService: TutorService,
    private authService: AuthService,
    private learnerService: LearnerService,
    private searchService: GeneralService,
    private commonSupport: CommonSupportService

  ) { }

  ngOnInit() {
    this.rolePosition = this.authService.getUserRole();
    this.getTutorList();
   
    //console.log(Object.values(this.tutors));
    $(function () {
      $('body').popover({
        selector: '[data-toggle=popover]',
        trigger: "hover",
      });
    })
    if (this.rolePosition == 3) {
      this.getStudentList();
    } else {
      this.getTutorList();
    }
  }

  getStudentList() {
    this.tutorService.indexTutorStudents().subscribe(
      (res) => {
        console.log(res)
        let studentList = [];

        let keys = Object.keys(res['dataCon']);

        for (let i = 0; i < keys.length; i++) {
          studentList[i] = res['dataCon'][keys[i]]
        }
        this.students = this.getStudentInfo(studentList);
        this.students = this.students.filter(x => !!x);
        console.log(this.students)
      },
      (error) => { console.log(error), this.errorMessage = 'Sorry, but something went wrong.' }
    )
  }

  //creat the whole student list
  getStudentInfo(students: any) {
    let studentList = students.map(e => {
      let newObj = {};
      if (e != null) {

        let studentid = e.learner_id;
        let userid = e.user_id;
        let firstname = "";
        if (e.learner_first_name == null) {
          firstname = 'Unknown';
        } else {
          firstname = e.learner_first_name[0].toUpperCase() + e.learner_first_name.substring(1).toLowerCase();
        }
        let lastname = "";
        if (e.learner_last_name == null) {
          lastname = 'Unknown';
        } else {
          lastname = e.learner_last_name[0].toUpperCase() + e.learner_last_name.substring(1).toLowerCase();
        }
        let level = e.grade;
        let subjects = "";

        if (e.subject == null) {
          subjects = "There is no subject exist for this student."
        } else {
          for (let i = 0; i < e.subject.length - 1; i++) {
            subjects = subjects + e.subject[i] + ", ";
          };
          subjects += e.subject[e.subject.length - 1];
        }

        //last session informations
        let lastsessionid: any;
        let lastlocation: any;
        let lastreport: any;
        let lastrequirement = "something";
        let lastsessiondate: any;
        let lastdate: any;
        let lastnewDate: any;
        let laststarttime: any;
        let lastendTime: any;
        if (e.last_session != "") {
          lastsessionid = e.last_session.session_id
          lastsessiondate = e.last_session.session_date;
          //lastdate = this.changeToMoment(lastsessiondate)
          lastnewDate = lastdate.format("LL");
          laststarttime = lastdate.format('LT');
          lastendTime = lastdate.add(e.last_session.session_duration, 'hours').format('LT');

          lastlocation = e.last_session.session_location;
          if (e.last_session.tutor_report != null) {
            lastreport = e.last_session.tutor_report;
          } else {
            lastreport = "There is no report exist";
          }
        } else {
          lastsessiondate = "";
          lastdate = "";
          lastnewDate = "";
          laststarttime = "";
          lastendTime = "";
          lastreport = "There is no report exist";
          lastlocation = "";
          lastsessionid = "";
        }
        //next session informations
        let nextsessionid: any;
        let nextlocation: any;
        let nextreport: any;
        let nextrequirement = "";
        let nextsessiondate: any;
        let nextdate: any;
        let nextnewDate: any;
        let nextstarttime: any;
        let nextendTime: any;
        if (e.next_session != "") {
          nextsessionid = e.next_session.session_id
          nextsessiondate = e.next_session.session_date;
          //  nextdate = this.changeToMoment(nextsessiondate)
          nextnewDate = nextdate.format("LL");
          nextstarttime = nextdate.format('LT');
          nextendTime = nextdate.add(e.next_session.session_duration, 'hours').format('LT');

          nextlocation = e.next_session.session_location;
          if (e.next_session.tutor_report != null) {
            nextreport = e.next_session.tutor_report;
          } else {
            nextreport = "There is no report exist";
          }
        } else {
          nextsessiondate = "";
          nextdate = "";
          nextnewDate = "";
          nextstarttime = "";
          nextendTime = "";
          nextreport = "There is no report exist";
          nextlocation = "";
          nextsessionid = "";
        }

        newObj = {
          user_id: userid,
          student_id: studentid,
          first_name: firstname,
          last_name: lastname,
          level: level,
          subjects: subjects,

          last_session_id: lastsessionid,
          last_session_location: lastlocation,
          last_session_report: lastreport,
          last_session_requirement: lastrequirement,
          last_session_date: lastnewDate,
          last_session_starttime: laststarttime,
          last_session_endtime: lastendTime,

          next_session_id: nextsessionid,
          next_session_location: nextlocation,
          next_session_report: nextreport,
          next_session_requirement: nextrequirement,
          next_session_date: nextnewDate,
          next_session_starttime: nextstarttime,
          next_session_endtime: nextendTime,

          img: this.baseImgUrl + userid + "-cp.jpeg",
        }
        return newObj;
      } else {
        return null;
      }
    })
    return studentList
  }



  getTutorList() {
    this.learnerService.indexLearnersTutor().subscribe(
      (res) => {
       
         let keys = Object.keys(res["dataCon"]);
         for(let i = 0; i<keys.length; i++){
         this.tutors[i] = res["dataCon"][keys[i]];    }
                
        
         }  ,    
      
     
      
      (error) => { 
        this.errorObj = {hasError:true,errorMessage:'Something went wrong, we cannot get any data at this time.'};
        // console.log(error), this.errorMessage = "Sorry, but something went wrong."
      }
    )

  }
  

}