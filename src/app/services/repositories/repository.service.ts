import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { UserService } from '../servercalls/user.service';
import { AuthService } from '../security/auth.service';
import { NewTutorService } from '../servercalls/new-tutor.service';
import { TutorService } from '../servercalls/tutor.service';
import { LearnerService } from '../servercalls/learner.service';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class RepositoryService {
  userData= new BehaviorSubject<any>('');
  tutorData= new BehaviorSubject<any>('');
  applicantData= new BehaviorSubject<any>('');
  learnerData= new BehaviorSubject<any>('');
  userPostsData= new BehaviorSubject<any>('');

  combinedUser: Object;
  combinedTutor: Object;
  applyData: Object;
  uR: number;
  applicantInfo: Observable<object>;
  userInfo: Observable<object>;
  tutorInfo: Observable<object>;
  learnerInfo: Observable<Object>;
  thisUserPosts: Observable<Object>;
  isBrowser = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    private userService: UserService,
    private authService: AuthService,
    private newTutorService: NewTutorService,
    private tutorService: TutorService,
    private learnerService: LearnerService
  ) {
      if (isPlatformBrowser(this.platformId)) {
        this.isBrowser = true;
      }

      this.uR = this.authService.getUserRole();
      if (this.isBrowser) {
        this.userSpData();
        this.sessionUserData();
      }

      this.applicantInfo = this.applicantData.asObservable();
      this.userInfo = this.userData.asObservable();
      this.tutorInfo = this.tutorData.asObservable();
      this.learnerInfo = this.learnerData.asObservable();
      this.thisUserPosts = this.userPostsData.asObservable();
   }
   userSpData() {
    if (this.uR === 1) {
      console.log('i am a learner');
      this.sessionLearnerData();
      }
    if (this.uR === 2) {
      this.sessionApplicantData();
      }
    if (this.uR === 3) {
      this.sessionTutorData();
      }
    }
    // ---------------------- Applicant role -------------------------
      // get data from session storage, if not, get from server
   sessionApplicantData() {
    if (this.isBrowser) {
      let aInfo = JSON.parse(sessionStorage.getItem('lsaSpApplicantInfo'));
      if (!aInfo) {
        this.currentApplicantData();
      } else {
        this.applicantData.next(aInfo);
      }
    }
    // this.currentApplicantData();
  }

  // Save as sessions
  saveApplicantSession(res) {
    sessionStorage.setItem('lsaSpApplicantInfo', JSON.stringify(res['dataCon'].applyInfo));
  }

   currentApplicantData() {
    return this.newTutorService.showTutorApplication().subscribe(
      (res) => {
        this.applyData = res['dataCon'].applyInfo;
        console.log(res);
        console.log(this.applyData);
        this.applicantData.next(this.applyData);
        this.saveApplicantSession(this.applyData); },
      (error) => console.log(error)
    );
   }
   // ---------------------- Tutor role -------------------------
   sessionTutorData() {
    // this.currentTutorData();
    if (this.isBrowser) {
      let tInfo,tProf
      let TutorInfo = sessionStorage.getItem('lsaSpTutorInfo');
      let TutorProfile = sessionStorage.getItem('lsaSpTutorProfile');
      if (!TutorInfo || !TutorProfile) {      
        tInfo = JSON.parse(TutorInfo);
        tProf = JSON.parse(TutorProfile);
      }
      if (!tInfo || !tProf) {
        this.currentTutorData();
      } else {
        this.combinedTutor = Object.assign(tInfo, tProf);
        this.tutorData.next(this.combinedTutor);
      }
    }
  }

   currentTutorData() {
     this.tutorService.showTutorProfile().subscribe(
       (res) => {
         console.log(res);
         this.combinedTutor = Object.assign(res['tutorInfo'], res['tutorProfile'],  );
         this.tutorData.next(this.combinedTutor);
         this.saveTutorSession(res);
        },
       (error) => console.warn(error)
     );
   }

   saveTutorSession(res) {
    sessionStorage.setItem('lsaSpTutorInfo', JSON.stringify(res['tutorInfo']));
    sessionStorage.setItem('lsaSpTutorProfile', JSON.stringify(res['tutorProfile']));
  }

   // ---------------------- Learner role -------------------------
   sessionLearnerData() {
    if (this.isBrowser) {
      let aInfo = JSON.parse(sessionStorage.getItem('lsaSpLearnerInfo'));
      if (!aInfo) {
        this.currentLearnerData();
      } else {
        this.learnerData.next(aInfo);
      }
    }
  }

  currentLearnerData() {
    console.log('hello i am a learner');
    return this.learnerService.showLearnerProfile().subscribe(
      (res) => {
        this.learnerData.next(res['dataCon']);
        this.saveLearnerSession(res); },
      (error) => console.log(error)
    );

  }

  saveLearnerSession(res) {
    sessionStorage.setItem('lsaSpLearnerInfo', JSON.stringify(res['dataCon']));
  }

   // ---------------------- All Users -------------------------
   sessionUserData() {
    // this.currentUserData();
    if (this.isBrowser) {
      let uKeys = JSON.parse(sessionStorage.getItem('lsaUserskeys'));
      let uInfo = JSON.parse(sessionStorage.getItem('lsaUsersInfo'));
      if (!uKeys || !uInfo) {
        this.currentUserData();
      } else {
        this.combinedUser = Object.assign(uKeys, uInfo);
        this.userData.next(this.combinedUser);
      }
    }
   }

   currentUserData() {
    this.userService.showUserInfo().subscribe(
     (res) => {
       this.saveUserSession(res);
       this.combinedUser = Object.assign(res['userInfo'], res['userKey']),
       this.userData.next(this.combinedUser);
     },
     (error) => console.log(error)
   );
  }

  saveUserSession(res) {
    sessionStorage.setItem('lsaUserskeys', JSON.stringify(res['userInfo']));
    sessionStorage.setItem('lsaUsersInfo', JSON.stringify(res['userKey']));
  }

  testEmptySub() {
    this.userData.next({});
  }
}
