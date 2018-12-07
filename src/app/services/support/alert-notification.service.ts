import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertNotificationService {
  subject :Subject<any>;
  myObs$: Observable<any>;
  data: any;

  constructor() { 
    this.subject = new Subject<any> ();
    this.myObs$ = this.subject.asObservable();
  }

  sendAlert(message, messageType, position, duration) {
    this.data = {message, messageType, position, duration};
    this.subject.next(this.data);
    console.log("The result is :", this.data);
  }

  serviceErrorAlert(err) {
    let errorMessage;
    if (err.error.code&&(err.error.code > 400&&err.error.code < 500)){
      errorMessage = "Failed, "+ err.error.error;
    } 
    else      
      errorMessage = "Something went wrong, please try again or contact with our Administrator." 
    this.sendAlert(errorMessage, 'ERROR', 'toast-top-right', 3000);      
  }
  sendError(errorMessage){
    this.sendAlert(errorMessage, 'ERROR', 'toast-top-right', 5000);      
  }
  sendSuccess(Message){
    this.sendAlert(Message, 'SUCCESS', 'toast-top-right', 1500);      
  }  
  sendWarning(Message){
    this.sendAlert(Message, 'WARNING', 'toast-top-right', 3000);      
  }    

  getAlert() {
    return this.myObs$;
  }
  
}
