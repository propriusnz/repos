import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResourceRepositoryService {

  constructor() { }

  // resources normal signal subject: resource type & action
  private resourcesNormalSignalSubject = new BehaviorSubject({});
  resourcesNormalSignal = this.resourcesNormalSignalSubject.asObservable();

  // resources data signal subject
  private resourcesDataSignalSubject = new BehaviorSubject({});
  resourcesDataSignal = this.resourcesDataSignalSubject.asObservable();

  // resources data subject
  private resourcesDataSubject = new BehaviorSubject({});
  resourcesData = this.resourcesDataSubject.asObservable();

  // resources data subject for editing
  private resourcesEditDataSubject = new BehaviorSubject({});
  resourcesDataForEdit = this.resourcesEditDataSubject.asObservable();

  // send show answers signal to each question components
  private showAnsSignal = new BehaviorSubject({});
  answerSignal = this.showAnsSignal.asObservable();




  private signalSubject = new BehaviorSubject({});
  signalProperty = this.signalSubject.asObservable();




  private accessSubject = new BehaviorSubject({});
  accessProperty = this.accessSubject.asObservable();

  

  private resourceSubject = new BehaviorSubject({});
  resourceProperty = this.resourceSubject.asObservable();

  private homeworkSubject = new BehaviorSubject({});
  homeworkProperty = this.resourceSubject.asObservable();

  // controlling question content collection
  private questionSource = new BehaviorSubject({});
  questionArray = this.questionSource.asObservable();

  private searchOptionObject = new BehaviorSubject({});
  seachOptionProperty = this.searchOptionObject.asObservable();

  // send page information for resources
  private resourcePageObject = new BehaviorSubject({});
  resourcePageProperty = this.resourcePageObject.asObservable();

  // ***************************************************
  // ************ Resources Related Services ************
  // ***************************************************

  // request resource data
  requestResourcesData(): void {
    console.log('Requesting resources data...');
    let requestObj = { op: 'request' };
    this.resourcesDataSignalSubject.next(requestObj);
  }

  // send resources normal signal
  sendResourcesNormalSignal(action: string, resType: string): void {
    console.log('Sending resources normal signal....');
    let signalObject = {
      action: action,
      type: resType
    };
    this.resourcesNormalSignalSubject.next(signalObject);
  }

  // send resource data
  sendResourcesData(resData: any, extraData: any): void {
    console.log('Sending resources data...');
    let resourcesObject = {
      data: resData,
      extra: extraData
    };
    this.resourcesDataSubject.next(resourcesObject);
  }

  // send resource data for edit
  sendResourcesDataForEdit(resData: any) {
    console.log('Sending resources data for edit....');
    this.resourcesEditDataSubject.next(resData);
  }

  // *************** Clear Subject *****************//
  // clear resourcesDataSignalSubject
  clearResourcesDataSignalSubject() {
    this.resourcesDataSignalSubject.next({});
  }

  // clear resourcesDataSignalSubject
  clearResourcesDataSubject() {
    this.resourcesDataSubject.next({});
  }

  // clear resourcesDataSignalSubject
  clearResourcesEditDataSubject() {
    this.resourcesEditDataSubject.next({});
  }

  // request show answer
  requestShowAns(): void {
    console.log('Requesting show ans...');
    let requestObj = { op: 'request' };
    this.showAnsSignal.next(requestObj);
  }



  


  // send access property (tutor or learner, display or modify)
  sendAccessProperty(user: string, op: string) {
    console.log("Sending access property....");
    let accessObj = { viewerType: user, op: op };
    this.accessSubject.next(accessObj);
  }

  // requesting questionArray to save from question parent
  requestQuestionArayToSave() {
    console.log("Requesting question array from question parent....");
    let signalObj = { op: "request2Save" };
    this.signalSubject.next(signalObj);
  }

  // send resource information for any usage purposes
  sendResourceInfo(resource: object, op: string) {
    console.log("Sending resource object....");
    let resourceObj = { op: op, value: resource };
    this.resourceSubject.next(resourceObj);
  }

  // send homework information for any usage purposes
  sendHomeworkInfo(resource: object, op: string) {
    console.log("Sending homework object....");
    let homeworkObj = { op: op, value: resource };
    this.homeworkSubject.next(homeworkObj);
  }

  // ***************************************************
  // ************ Question Related Services ************
  // ***************************************************
  // send empty question array for creating questions for new homework
  initQuestionArray() {
    console.log("Sending initialized empty question array....");
    let emptyArray: any[] = [];
    let msg = { op: "init", value: emptyArray };
    this.questionSource.next(msg);
  }

  // send question array collection
  sendSavedQuestionArray(quizType, quizArray: any[]) {
    console.log("Sending question array.....");
    let questionInfo = {
      questionType: '',
      questionCollection: []
    };
    questionInfo.questionType = quizType;
    questionInfo.questionCollection = quizArray;
    let msg = { op: "save", value: questionInfo };
    this.questionSource.next(msg);
  }

  // send question collection for edit
  sendQuestionForEdit(quizInfo: object) {
    console.log("Sending question information for editing...");
    let msg = { op: "forEdit", value: quizInfo };
    this.questionSource.next(msg);
  }

  // send ready to go question
  sendReadyToGoQuestionCollection(quizInfo: any[]) {
    console.log("Sending ready to go questions for editing....");
    let msg = { op: "edit", value: quizInfo };
    this.questionSource.next(msg);
  }

  // ***************************************************
  // ************ Search Related Services ************
  // ***************************************************
  sendSearchOption(user: string, data: any) {
    console.log("Sending search option....");
    let searchOpt = { viewerType: user, data: data };
    this.searchOptionObject.next(searchOpt);
  }

  // ***************************************************
  // ************ Show Related Services ************
  // ***************************************************
  sendResourcePage(pageNum: number) {
    console.log("Sending resource page information...");
    let resPageObj = { resourcePage: pageNum };
    console.log(resPageObj);
    this.resourcePageObject.next(resPageObj);
  }


  // ************* clear subscription ******************
  // clear access property subject subscription
  clearAccessSubject() {
    console.log("Clear access subject....");
    this.accessSubject.next({});
  }

  // clear access property subscription
  clearSignalSubject() {
    console.log("Clear signal subject....");
    this.signalSubject.next({});
  }

  // clear resource subject subscription
  clearResourceSubject() {
    console.log("Clear resource subject....");
    this.resourceSubject.next({});
  }

  // clear homework subject subscription
  clearHomeworkSubject() {
    console.log("Clear homework subject....");
    this.homeworkSubject.next({});
  }

  // clear question source subject subscription
  clearQuestionSourceSubject() {
    console.log("Clear question source subject....");
    this.questionSource.next({});
  }

  // clear search option subject subscription
  clearSearchOptionSubject() {
    console.log("Clear search option subject....");
    this.searchOptionObject.next({});
  }

  // clear search option subject subscription
  clearResourcePageSubject() {
    console.log("Clear search option subject....");
    this.resourcePageObject.next({});
  }
}