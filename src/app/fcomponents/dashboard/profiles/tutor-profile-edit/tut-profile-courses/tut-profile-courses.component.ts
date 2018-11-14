import { Component, OnInit } from '@angular/core';

import { TutorService } from '../../../../../services/servercalls/tutor.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { environment } from '../../../../../../environments/environment.prod';
import { CommonSupportService } from '../../../../../services/support/common-support.service';
import { UserService} from '../../../../../services/servercalls/user.service';
import { AlertNotificationService } from '../../../../../services/support/alert-notification.service';

@Component({
  selector: 'app-tut-profile-courses',
  templateUrl: './tut-profile-courses.component.html',
  styleUrls: ['./tut-profile-courses.component.css']
})
export class TutProfileCoursesComponent implements OnInit {
  errorObj={hasError:false,errorMessage:''};
  courses:any;

  constructor(
    private commonSupport: CommonSupportService,
    private userService: UserService,
    private alertservice: AlertNotificationService, 
    private tutorService:TutorService   
  ) { }

  ngOnInit() {
    this.getCourseData();
  }
  getCourseData(){
    this.tutorService.showTutorCourses().subscribe(
      (res) => {
        this.courses = res['allCourses'];
      },
      (err)=>{
        this.errorObj = {hasError:true,errorMessage:'Can not get data,  try again!'};
      }
    )
  }
}
