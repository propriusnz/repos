import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { 
  BasicOpProperty,
  ExtraOpProperty, 
} from '../../models/HomeworkResourceModel';

@Injectable({
  providedIn: 'root'
})
export class ResourceSupportService {

  constructor() { }

  // *************** Commonly used functions ******************
  // get access mode
  getAccessModeFromURL(url: string): string {
    if(url.indexOf('/add') != -1) {
      return 'add';
    } else if(url.indexOf('/edit') != -1) {
      return 'edit';
    } else if(url.indexOf('/view') != -1) {
      return 'view';
    }
  }

  // get resource type
  getResourceTypeFromURL(routeInfo): string {
    return routeInfo['params']['type'];
  }

  // basic resource op property subject
  private basicOpSubject = new BehaviorSubject({});
  basicOpProperty = this.basicOpSubject.asObservable();

  // extra resource op property subject
  private extraOpSubject = new BehaviorSubject({});
  extraOpProperty = this.extraOpSubject.asObservable();

  // ***************************************************
  // ************ Resources Related Services ************
  // ***************************************************
  //
  // Send <user type>, <mode>, and <rsource type>
  // <user type>      => tutor, learner.
  // <mode>           => add, edit, view
  // <resource type>  => article, question, file or link
  sendBasicOpProperty(user: string, mode: string, resType: string) {
    console.log("Sending basic resource operation property....");
    let basicOp = new BasicOpProperty(user, mode, resType);
    this.basicOpSubject.next(basicOp);
  }

  // Send extra data and where it comes from
  // <extra data> will be different according to different source.
  // e.g. the extra data is sent from Community, then edit is banned.
  sendExtraOpProperty(from: string, extra: any) {
    console.log("Sending extra resource operation property....");
    let extraOp = new ExtraOpProperty(from, extra);
    this.extraOpSubject.next(extraOp);
  }

   // ************* clear subscription ******************
   clearBasicOpProperty() {
    this.basicOpSubject.next({});
   }
}
