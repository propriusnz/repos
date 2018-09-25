import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';
import { Inject } from '@angular/core';

@Injectable()
export class TutorService {
  headers1: HttpHeaders;
  token: string;
  id: string;
  baseUrl = environment.baseUrl;
  isown = 0;

  constructor(
    @Inject(LOCAL_STORAGE)
    private localStorage: any,
    private http: HttpClient
  ) {
    this.id = localStorage.getItem('lsaUserId');
    this.headers1= new HttpHeaders({'Authorization': "Bearer "+localStorage.getItem('lsaToken_access')});
  }

  // Tutor Schedules
  showTutorSchedules() {
    return this.http.get(this.baseUrl + '/tutorschedule/' + this.id, { headers: this.headers1 });
  }

  updateTutorSchedules(scheduleUpdate) {
    return this.http.put(this.baseUrl + '/tutorschedule/' + this.id, scheduleUpdate, { headers: this.headers1 });
  }

  // Tutor Profile
  showTutorProfile() {
    return this.http.get(this.baseUrl + '/tutorsedit/' + this.id, { headers: this.headers1 })
  }

  updateTutorProfile(tutorUpdate) {
    return this.http.post(this.baseUrl + '/tutorsedit/' + this.id, tutorUpdate, { headers: this.headers1 });
  }

  // Tutor Students
  indexTutorStudents() {
    // return this.http.get(this.baseUrl + '/tutors/' + this.id + '/students', { headers: this.headers1 });
    return this.http.get(this.baseUrl + '/tutors/' + this.id + '/learners', { headers: this.headers1 });
  }

  showTutorStudent(studentId){
    // return this.http.get(this.baseUrl + '/tutors/' + this.id + '/students/' + studentId, { headers: this.headers1 });
    return this.http.get(this.baseUrl + '/tutors/' + this.id + '/learners/' + studentId, { headers: this.headers1 });
  }

  // tutor transactions
  indexTutorTransactions(searchValue) {
    return this.http.get(this.baseUrl + '/tutors/' + this.id + '/transactions?' + 'start=' + searchValue[0] + '&end=' + searchValue[1], { headers: this.headers1 });
  }
  // Tutor Sessions
  indexTutorSessions(searchValue) {
    return this.http.get(this.baseUrl + '/tutors/' + this.id + '/sessions?' + 'start=' + searchValue[0] + '&end=' + searchValue[1], { headers: this.headers1 });
  }
  updateTutorSessionStatus(sessionId, sessionValues) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.baseUrl + '/tutors/' + this.id + '/sessions/' + sessionId + '/status', sessionValues, { headers: this.headers1 });
  }

  updateTutorSessionTimelocation(sessionId, sessionValues) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.baseUrl + '/tutors/' + this.id + '/sessions/' + sessionId + '/timelocation', sessionValues, { headers: this.headers1 });
  }
  storeTutorSessionReport(sessionId, sessionValues) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.baseUrl + '/tutors/' + this.id + '/sessions/' + sessionId + '/report', sessionValues, { headers: this.headers1 });
  }

  // ** update tutor posts ** //
  updateTutorPost(postId, data) {
    return this.http.post(this.baseUrl + '/tutors/' + this.id + '/posts/' + postId, data, { headers: this.headers1 });
  }
  testPost(data: any) {
    return this.http.post(this.baseUrl + '/tutors/' + this.id + '/posts', data, { headers: this.headers1 });
  }

  // Tutor Posts
  storeTutorPost(postObject, postId) {
    return this.http.post(this.baseUrl + '/tutors/' + this.id + '/posts' + postId, postObject, { headers: this.headers1 });
  }

  //search with index page
  indexTutorResourcesWithPage(pageNum) {
    return this.http.get(this.baseUrl + '/tutors/' + this.id + '/postsearch?isown=' + this.isown + '&page=' + pageNum , { headers: this.headers1 });
  }

  showTutorResource(resourceId) {
    return this.http.get(this.baseUrl + '/tutors/' + this.id + '/resources/' + resourceId, { headers: this.headers1 });
  }

  storeTutorResource(hwInfo) {
    return this.http.post(this.baseUrl + '/tutors/' + this.id + '/resources', hwInfo, { headers: this.headers1 });
  }

  updateTutorResource(hwId, hwInfo) {
    return this.http.post(this.baseUrl + '/tutors/' + this.id + '/resources/' + hwId, hwInfo, { headers: this.headers1 });
  }


}
