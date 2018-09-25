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

@Component({
  selector: 'app-learner-tutors-panel',
  templateUrl: './learner-tutors-panel.component.html',
  styleUrls: ['./learner-tutors-panel.component.css']
})
export class LearnerTutorsPanelComponent implements OnInit {
  rolePosition: number;
  students: any;
  tutors: any;
  sessions: any;
  errorMessage: string;
  display: any = window;
  baseImgUrl = environment.baseUserImgUrl;

  constructor(
    private dialog: MatDialog,
    private tutorService: TutorService,
    private authService: AuthService,
    private learnerService: LearnerService,

  ) { }

  ngOnInit() {
    this.rolePosition = this.authService.getUserRole()

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
          lastdate = this.changeToMoment(lastsessiondate)
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
          nextdate = this.changeToMoment(nextsessiondate)
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
    this.learnerService.indexLearnersTutor("").subscribe(
      (res) => {
        console.log(res);
        let tutorlist = [];
        let keys = Object.keys(res['dataCon']);

        for(let i = 0; i<keys.length; i++){
          tutorlist[i] = res['dataCon'][keys[i]]
        }
        this.tutors = this.getTutorInfo(tutorlist);
        this.tutors = this.tutors.filter(x => !!x)
        console.log(this.tutors)
      },
      (error) => { console.log(error), this.errorMessage = "Sorry, but something went wrong."}
    )

  }

  getTutorInfo(tutors: any) {
    let tutorlist = tutors.map(e => {
      let newObj = {}
      if (e != null) {

        let userid = e.user_id;
        let studentid = e.tutor_id;
        let firstname = e.first_name;
        let subjects = e.discipline;

        

        let lastsessionid: any;
        let lastlocation: any;
        let lastreport: any;
        let lastsessiondate: any;
        let lastdate: any;
        let lastnewDate: any;
        let laststarttime: any;
        let lastendTime: any;

        if (e.last_session != "") {
          lastsessionid = e.last_session.session_id
          lastsessiondate = e.last_session.session_date;
          lastdate = this.changeToMoment(lastsessiondate)
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

        let nextsessionid: any;
        let nextlocation: any;
        let nextreport: any;
        let nextsessiondate: any;
        let nextdate: any;
        let nextnewDate: any;
        let nextstarttime: any;
        let nextendTime: any;
        if (e.next_session != "") {
          nextsessionid = e.next_session.session_id
          nextsessiondate = e.next_session.session_date;
          nextdate = this.changeToMoment(nextsessiondate)
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
          subjects: subjects,

          last_session_id: lastsessionid,
          last_session_location: lastlocation,
          last_session_report: lastreport,
          last_session_date: lastnewDate,
          last_session_starttime: laststarttime,
          last_session_endtime: lastendTime,

          next_session_id: nextsessionid,
          next_session_location: nextlocation,
          next_session_report: nextreport,
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

    return tutorlist;
  }

  // change time to moment object format
  changeToMoment(time: any): any {
    let sessionDate = time.slice(0, 10);
    let sessionTime = time.slice(11);
    let date = sessionDate + 'T' + sessionTime;
    // change utc to local date
    let localDate = moment.utc(date).local().format().slice(0, 19);
    console.log(localDate)
    return moment(localDate);
  }

  reportClick(studentReport, id) {
    //console.log(studentReport);
    if (studentReport == "There is no report exist" || studentReport == "Please enter a report") {
      this.generateReport(id);
      //window.open("https://www.google.com");
    } else {
      return;
    }
  }

  requirementClick(studentRequirement) {
    console.log(studentRequirement);
    if (studentRequirement == "" || studentRequirement == "Please enter a requirement") {
      window.open("https://www.google.com");
    } else {
      return;
    }
  }

  viewAllSession(ID, Name) {
    console.log('view all session');
    let dialogRef = this.dialog.open(ViewAllSessionDialogComponent,
      {
        panelClass: 'dialog1',
        data: {
          id: ID,
          name: Name,
        },
      });
    dialogRef.afterClosed().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          console.log('got something', res);
        }
      },
      (err) => console.warn(err)
    );
  }

  generateReport(id) {
    let sessionID = id;
    let dialogRef = this.dialog.open(TutorReportDialogComponent,
      {
        panelClass: 'dialog1',
        data: sessionID,
      });
    dialogRef.afterClosed().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          console.log('got something', res);
          //this.sendReport(sessionID, res);
        }
      },
      (err) => console.warn(err)
    );
  }

}