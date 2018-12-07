import { Component, OnInit } from '@angular/core';

import { TutorService } from '../../../../../services/servercalls/tutor.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { environment } from '../../../../../../environments/environment.prod';
import { CommonSupportService } from '../../../../../services/support/common-support.service';
import { UserService } from '../../../../../services/servercalls/user.service';
import { AlertNotificationService } from '../../../../../services/support/alert-notification.service';
import { Observable, of } from 'rxjs';
import { concatMap } from 'rxjs/operators';

@Component({
  selector: 'app-tut-profile-courses',
  templateUrl: './tut-profile-courses.component.html',
  styleUrls: ['./tut-profile-courses.component.css']
})
export class TutProfileCoursesComponent implements OnInit {
  errorObj = { hasError: false, errorMessage: '' };
  courses: any;
  courses1: any;

  message: string;
  warning: string;
  warning1: string;
  warningFlag: boolean = false;

  selectedCourse: any;  //update or delete modal used
  onSelect(course: any): void {
    this.selectedCourse = course;
  }


  changedCourse: any;      //add modal used
  onChange(course: string): void {
    this.changedCourse = JSON.parse(course);
    if (this.courses != null) {
      for (let i = 0; i < this.courses.length; i++) {
        if (this.courses[i].course_id == this.changedCourse.course_id) {
          this.warning = 'Duplicated course!';
          this.message = '';
          this.warningFlag = true;
          return;
        } else {
        this.warning = ''; this.warningFlag = false;
          this.message = '';
        }
      }
    }
  }

  clearChangedCourse() {         //clear add modal data
    delete this.changedCourse;
  }
  constructor(
    private commonSupport: CommonSupportService,
    private userService: UserService,
    private alertservice: AlertNotificationService,
    private tutorService: TutorService
  ) { }

  ngOnInit() {
    this.getCourseData();
    this.getAllCourseData();
    this.message = '';                     //success message
    this.warning = '';                      //fail message
    this.warning1 = '';
    this.warningFlag = false;
    this.updatePrice = null;
  }
  getCourseData() {
    this.tutorService.showTutorCourses().subscribe(
      (res) => {
        this.courses = res['allCourses'];
      },
      (err) => {
        //this.errorObj = {hasError:true,errorMessage:'Can not get data,  try again!'};
        this.message = "";
        this.alertservice.sendAlert('Can not get data,  try again!', 'ERROR', 'toast-top-right', 5000);
      }
    )
  }


  getAllCourseData() {
    this.tutorService.showAllCourses().subscribe(
      (res) => {
        this.courses1 = res['allCourses'];
      },
      (err) => {
        //this.errorObj = {hasError:true,errorMessage:'Can not get all courses data,  try again!'};
        this.message = "";
        this.alertservice.sendAlert('Can not get all courses data,  try again!', 'ERROR', 'toast-top-right', 5000);
      }
    )
  }

  addCourse(id: any, price: number) {
    if (!price) {
      this.warning = 'Please input a price!';
      this.message = '';
      return;
    }
    if (this.courses != null) {
      for (let i = 0; i < this.courses.length; i++) {
        if (this.courses[i].course_id == this.changedCourse.course_id) {
          this.warning = 'Duplicated course!';
          this.message = '';
          return;
        }

      }
    }
    this.tutorService.addTutorCourses(id, price)
      .subscribe(course => {
        if (this.courses != null)
          this.courses.unshift(course);
        this.getCourseData();
        this.clearChangedCourse();
        this.message = 'Course added!';
        this.warning = '';
        this.errorObj.hasError = false;
        this.alertservice.sendAlert('Course Added successfully!', 'SUCCESS', 'toast-top-right', 5000);
      });
  }

  removeCourse(course: any) {
    this.tutorService.removeTutorCourses(course.id).subscribe(() => {
      for (let i = 0; i < this.courses.length; i++) {
        if (this.courses[i] == this.selectedCourse) {
          this.courses.splice(i, 1);
        }
      }
      this.message = 'Course Deleted!';
      this.warning = '';
      this.errorObj.hasError = false;
      this.alertservice.sendAlert('Course Deleted successfully!', 'SUCCESS', 'toast-top-right', 5000);

    })
  }
  updatePrice: number;
  fireEvent(e) {
    this.updatePrice = e.target.value;
  }
  updateCourse() {
    if (this.updatePrice != null)
      this.update(this.selectedCourse, this.updatePrice);
    else {
      //this.errorObj = {hasError:true,errorMessage:'Can not update data,  please edit the price first!'};
      this.message = "";
      this.alertservice.sendAlert('Can not update data,  please edit the price first!', 'ERROR', 'toast-top-right', 5000);
    }
    this.updatePrice = null;
  }


  update(course: any, price: number) {
    this.tutorService.removeTutorCourses(course.id).subscribe(
      (res) => {
        for (let i = 0; i < this.courses.length; i++) {
          if (this.courses[i] == this.selectedCourse) {
            this.courses.splice(i, 1);
          }
        }
        this.tutorService.addTutorCourses(course.course_id, price)
          .subscribe(course => {
            if (this.courses != null) this.courses.unshift(course);
            this.getCourseData();
            this.message = 'Course Updated!';
            this.warning = '';
            this.errorObj.hasError = false;
            this.alertservice.sendAlert('Course Updated successfully!', 'SUCCESS', 'toast-top-right', 5000);
          },
            error => {
              //this.errorObj = {hasError:true,errorMessage:'Something went wrong, we cannot update any data at this time.'};
              this.message = "";
              this.alertservice.sendAlert('Something went wrong, we cannot update any data at this time.', 'ERROR', 'toast-top-right', 5000);
            }
          );
      },

      (error) => {

        //this.errorObj = {hasError:true,errorMessage:'Something went wrong, we cannot update any data at this time.'};
        this.message = "";
        this.alertservice.sendAlert('Something went wrong, we cannot update any data at this time.', 'ERROR', 'toast-top-right', 5000);
      })

  }

}
