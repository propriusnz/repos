import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { isPlatformBrowser } from '@angular/common';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CommonSupportService {

  baseUserImgUrl = environment.baseUserImgUrl;
  userId: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(LOCAL_STORAGE) private localStorage: any,
  ) {
    this.userId = localStorage.getItem('lsaUserId');
  }

  getTime() {
    return new Date().getTime();
  }

  // prepare image url with provided user id
  findUserImg(userId: any) {
    // let ver = new Date().getTime();
    return this.baseUserImgUrl + userId + "-cp.jpeg";
  }

  // preapre image url with user id
  prepareUserImgUrl() {
    // let ver = new Date().getTime();
    return this.baseUserImgUrl + this.userId + "-cp.jpeg";
  }

  //not using currently
  prepareUserImage(userImg) {
    return this.baseUserImgUrl + this.userId + "-cp.jpeg";
  }

  changeToMoment(time: any): any {
    let sessionDate = time.slice(0, 10);
    let sessionTime = time.slice(11);
    let date = sessionDate + 'T' + sessionTime;
    // change utc to local date
    let localDate = moment.utc(date).local().format().slice(0, 19);
    return moment(localDate);
  }
}
