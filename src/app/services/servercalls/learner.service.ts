import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class LearnerService {
  headers1: HttpHeaders;
  id: string;
  baseUrl = environment.baseUrl;

  constructor(
    @Inject(LOCAL_STORAGE)
    private localStorage: any,
    private http: HttpClient) {
    this.id = localStorage.getItem('lsaUserId');
    this.headers1 = new HttpHeaders({ 'Authorization': "Bearer " + localStorage.getItem('lsaToken_access') });
  }
  // Learner Profile
  indexLearnerProfile(){
    return this.http.get(this.baseUrl + '/users/' + this.id +'/learners', {headers: this.headers1});
  }
    // Learner Profile
  indexLearner(){
      // proprius.co.nz/testing/public/users/60/alllearners  
      return this.http.get(this.baseUrl + '/users/' + this.id +'/alllearners', {headers: this.headers1});
  }
  updateLearnerProfile(learnerId, learner) {
    return this.http.put(this.baseUrl + '/users/' + this.id +'/learners/' + learnerId, learner, { headers: this.headers1 });
  }

  storeLearnerProfile(learner) {
    return this.http.post(this.baseUrl + '/users/' + this.id + '/learners', learner, { headers: this.headers1 });
  }
  // Learner Resources
  indexLearnerResources() {
    return this.http.get(this.baseUrl + '/learners/' + this.id + '/resources?hw=0', { headers: this.headers1 });
  }

  indexLearnerPublicResources() {
    return this.http.get(this.baseUrl + '/learners/' + this.id + '/resources?hw=1', { headers: this.headers1 });
  }

  showLearnerResource(resourceId) {
    return this.http.get(this.baseUrl + '/learners/' + this.id + '/resources/' + resourceId, { headers: this.headers1 });
  }

    // Learner Sessions
  storeLearnerSessions(tutorId, billAmount, bookings) {
    console.log(tutorId, billAmount ,bookings);
//    users/(user)/products/(tutor)/flatorder/(price)
    return this.http.post(this.baseUrl + '/users/' + this.id + '/products/' + tutorId + '/flatorder/'+billAmount, bookings[0], { headers: this.headers1 });
  }
  storeSchedulingSessions(orderId, scheduling){
    return this.http.post(this.baseUrl + '/learners/' + this.id + '/orders/' + orderId + '/session', scheduling, { headers: this.headers1 });
  }

  updateLearnerSessions(objects) {
    return this.http.put(this.baseUrl + '/learnersessions/' + this.id, objects, { headers: this.headers1 });
  }

  //  indexLearnerSessions(conditions){
  //   return this.http.get(this.baseUrl+'/learners/'+this.id+'/sessions?'+'start'+conditions[0]+ '&end' + conditions[1], {headers: this.headers1});
  //  }
  indexLearnerSessions(searchValue) {
    return this.http.get(this.baseUrl + '/learners/' + this.id + '/sessions?' + 'start=' + searchValue[0] + '&end=' + searchValue[1], { headers: this.headers1 });
  }
  
  LearnerCancelSession(sessionId, reason) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.baseUrl + '/learners/' + this.id + '/sessions/' + sessionId + '/cancel', reason, { headers: this.headers1 });
  }

  updateLearnerSessionStatus(sessionId, reason) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.baseUrl + '/learners/' + this.id + '/sessions/' + sessionId + '/cancel', reason, { headers: this.headers1 });
  }

  updateLearnerSessionTimelocation(sessionId, sessionValues) {
    // tslint:disable-next-line:max-line-length
    return this.http.post(this.baseUrl + '/learners/' + this.id + '/sessions/' + sessionId + '/timelocation', sessionValues, { headers: this.headers1 });
  }

  // Learner See Tutor
  indexTutor(queryParams: string) {
    return this.http.get(this.baseUrl + '/learners/' + this.id + '/tutors?' + 'tut=' + queryParams, { headers: this.headers1 });
  }
  // show tutor schedule
  showSchedule(queryParams: string) {
    return this.http.get(this.baseUrl + '/learners/' + this.id + '/tutorshow/' + queryParams, { headers: this.headers1 });
  }

  showTutor(id: string) {
    return this.http.get(this.baseUrl + '/findtutorprofile/' + id);
  }
  // Learner See Tutor
  indexLearnersTutor() {
    return this.http.get(this.baseUrl + '/learners/' + this.id + '/tutors', { headers: this.headers1 });
  }

  showLearnersTutor(tutorId: string) {
    return this.http.get(this.baseUrl + '/learners/' + this.id + '/tutors/' +tutorId, { headers: this.headers1 });
  }
  //Learner rate sessions
  storeLearnerSessionsRating(sessionId, info){
    return this.http.post(this.baseUrl + '/learners/' + this.id + '/sessions/' + sessionId + '/rating', info, { headers: this.headers1 });
  }

  // Learner Transactions
  indexLearnerTransactions(searchValue) {
    // tslint:disable-next-line:max-line-length
    return this.http.get(this.baseUrl + '/learners/' + this.id + '/transactions?' + 'start=' + searchValue[0] + '&end=' + searchValue[1], { headers: this.headers1});
  }

  updateLearnerDispute(transactionId, data) {
    return this.http.put(this.baseUrl + '/learners/' + this.id + '/transactions/' + transactionId, data, { headers: this.headers1});
  }

  updateLearnerPayment(transactionId){
    return this.http.post(this.baseUrl + '/learners/' + this.id + '/transactions/' + transactionId+'/oneoff', { headers: this.headers1});
  }
  bookPackageOrder(courseId,price){
    return this.http.post(this.baseUrl + '/users/' + this.id + '/products/' + courseId+'/packageorder/'+price, {},{ headers: this.headers1});
  }
  userOrder(){
    return this.http.get(this.baseUrl + '/buyers/' + this.id + '/orders', { headers: this.headers1});    
  }
  userCredit(){
    return this.http.get(this.baseUrl + '/users/' + this.id + '/credit', { headers: this.headers1});    
  }
  //rate session
  storeRateSession(sessionId,rating){
    return this.http.post(this.baseUrl + '/learners/' + this.id + '/sessions/' + sessionId+'/rating',rating,{ headers: this.headers1});  }  
  //rate session
  storeTutorReference(tutorId,reference){
    return this.http.post(this.baseUrl + '/learners/' + this.id + '/tutors/' + tutorId+'/reference',reference,{ headers: this.headers1});  }  
    //report session
  storeReportSession(sessionId,report){
    return this.http.post(this.baseUrl + '/learners/' + this.id + '/sessions/' + sessionId+'/report',report,{ headers: this.headers1});
  } 
  showLearnerPayment(){
    return this.http.get(this.baseUrl + '/users/' + this.id + '/payments');
  }

}
