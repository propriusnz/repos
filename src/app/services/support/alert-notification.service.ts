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

  getAlert() {
    return this.myObs$;
  }
  
}
