import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  'rxjs/add/operator/map';
import { SearchTutorModel } from '../../models/SearchTutorModel';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment.prod';
import { BehaviorSubject } from '../../../../node_modules/rxjs';

@Injectable()
export class GeneralService {
  baseUrl = environment.baseUrl;
  post_id = new BehaviorSubject<any>('');
  post_idObv: Observable<any>;
  constructor(
    public http:HttpClient,
   ) {
    this.post_idObv = this.post_id.asObservable();
   }

  // Find Tutor
  indexTutors(searchValue){
    return this.http.get(this.baseUrl+'/findtutors?'+'subject='+searchValue[0]+'&location='+searchValue[1]);
  }

  showTutor(id:string){
    return this.http.get(this.baseUrl+'/findtutorprofile/'+id);
  }
  showTutorSession(tutorId:string){
    return this.http.get(this.baseUrl+'/tutors/'+tutorId+'/sessions');
  }

  //new showTutor
  findtutorprofile(id:string){
    return this.http.get(this.baseUrl+'/findtutorprofile/'+id);
  }
  // Posts
  sendPostId(val: string): void {
    this.post_id.next(val);
  }
  getPostId() {
    return this.post_idObv;
  }

  displayAllPosts(){
    return this.http.get(this.baseUrl+'/posts');
  }

  indexAllPosts(type, subject, grade){
    return this.http.get(this.baseUrl+'/posts'+'?type='+type+'&'+'subject='+subject+'&grade='+grade);
  }

  showPost(id:string){
    return this.http.get(this.baseUrl+'/posts/'+id);
  }
  
  displayPostPages(page: number){
    return this.http.get(this.baseUrl+'/posts?page='+page);
  }

  indexDiscussions(){

  }
  
  showDiscussions(){

  }

  // Contact us forms
  storeContact(contactUs){
    return this.http.post(this.baseUrl+'/contacts', contactUs);
  }
  // new method
  
}