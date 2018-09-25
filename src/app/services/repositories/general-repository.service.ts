import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class GeneralRepositoryService {
  // all user images need to subscribe the userImage
  userImage = new BehaviorSubject<any>('123');
  hasSession=new BehaviorSubject<boolean>(true);
  
  constructor() { }
}
