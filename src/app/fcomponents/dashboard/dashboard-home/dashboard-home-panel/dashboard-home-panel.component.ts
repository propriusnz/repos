import { Component,  OnInit,  Input, Inject, OnDestroy} from '@angular/core';
import { RepositoryService} from '../../../../services/repositories/repository.service';
import {LearnerService} from '../../../../services/servercalls/learner.service'
import {TutorService} from '../../../../services/servercalls/tutor.service'
import { UserService} from '../../../../services/servercalls/user.service';
import { CommonSupportService } from '../../../../services/support/common-support.service';
import { ProfileHelperService} from '../../../../services/helpers/profile-helper.service';
import { environment} from '../../../../../environments/environment.prod';
import { MatDialog,  MatDialogRef} from '@angular/material';
import { ImageEditorDialogComponent} from '../../../support/image-editor-dialog/image-editor-dialog.component';
import { DomSanitizer,  SafeResourceUrl,  SafeUrl, Title } from '@angular/platform-browser';
import { ConstantPool } from '../../../../../../node_modules/@angular/compiler/src/constant_pool';
import { Subscription } from '../../../../../../node_modules/rxjs';
import { isEmpty } from '../../../../../../node_modules/rxjs/operators';
import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { GeneralRepositoryService  } from '../../../../services/repositories/general-repository.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home-panel.component.html',
  styleUrls: ['./dashboard-home-panel.component.css']
})
export class DashboardHomePanelComponent implements OnInit, OnDestroy {
  baseUserImgUrl = environment.baseUserImgUrl;
  imgUrl=''
  uRole: number;
  orderLeft:number=0
  testArray=[]
  endingTime1=[]
  endingTime2=[]
  canceledCourses=[]
  sessionDetail:any;
  searchValueBefore=[]
  searchValueAfter=[]
  dropIndex=[]
  nextCourses =[]
  nextIndex = []
  nextBoard:any
  finisedBorad:any
  reportBoard:any
  finishedCourses = []
  finishedIndex = []
  isTutor:boolean = true
  helpers: ({
    destination: string;main: string; icon:string;
  })[];
  userCredit:any;
  userInfo: Object;
  applyInfo: Object;
  tutorInfo: Object;
  sessions: any;
  role:number;
  haveSessions:boolean = false;
  user_profile_photo: string;
  userPhoto:string;
  image_change = false;
  baseImgUrl = environment.baseUserImgUrl + '/userimg/';

  userRepositoryService: Subscription;

  constructor(
    @Inject(LOCAL_STORAGE)
    private localStorage: any,
    private repositoryService: RepositoryService,
    private learnerService: LearnerService,
    private tutorService: TutorService,
    private helperService: ProfileHelperService,
    private UserService: UserService,
    private dialog: MatDialog,
    private _sanitizer: DomSanitizer,
    private titleService: Title,
    private generalRepositoryService:GeneralRepositoryService,

    private commonSupportService: CommonSupportService
  ) {
    this.titleService.setTitle('Dashboard');

    this.uRole = this.repositoryService.uR
    this.helperService.getHelpers(this.uRole)
    this.role = Number(localStorage.getItem('lsaWho'));
  }

  ngOnInit() {
    this.learnerService.userCredit().subscribe(res=>{
      this.userCredit = res['userCredit'].credit
    })
    this.searchValueAfter = [moment().utc().format(),moment().utc().add(1, 'week').format()]
    this.searchValueBefore = [moment().subtract(1,'week').format(),moment().utc().local().format()]
    this.dataInit();
    if (this.role === 1 || this.role === 2) {
      this.isTutor = false
      this.learnerSessions()
      this.learnerService.userOrder().subscribe(res=>{
        let userOrderList = res['allOrders']
        for (let i=0; i<userOrderList.length; i++){
          if (userOrderList[i].order.order_quantity_left!==0&&userOrderList[i].order.order_quantity_left!=null){
            this.orderLeft+=Number(userOrderList[i].order.order_quantity_left)
          }
        }
      })
    }
    if (this.role === 3){
      this.isTutor = true
      this.tutorSessions()
      this.UserService.userOrders().subscribe(res=>{
        let userOrderList = res['allOrders']
        for (let i=0; i<userOrderList.length; i++){
          if (userOrderList[i].order_quantity_left!=null&&userOrderList[i].order_quantity_left!=='0.0'){
            this.orderLeft+=Number(userOrderList[i].order_quantity_left)
          }
        }
      })
    }
  }
  dataInit() {
      // if (this.role === 3) {
      //   this.isTutor = true
      //   for (let i=0;i<this.sessionDetail.length;i++){
      //     if(this.sessionDetail.tutor_report == null){
      //       this.finishedCourses.push(this.sessionDetail[i])
      //     }
      //   }
      // }
      // for ( let i = 0; i < this.sessionDetail.length; i++) {
      //   this.dropIndex.push(i); // is for front page table row loop
      // }


    this.repositoryService.currentUserData();
    this.userRepositoryService = this.repositoryService.userInfo.subscribe(
      (res) => {
        console.log("userRepositoryService:",res);
        if (res.hasOwnProperty("user_id")) {
          this.userInfo = res;
          if (this.userInfo['user_id']) {
            let ver = new Date().getTime();
            // console.log("timestamp for ver is: " + ver);
            // console.log(this.baseImgUrl + this.userInfo['user_profile_photo']);
            // console.log(this.userInfo['user_profile_photo']);
            // try {
            //   this.user_profile_photo = this.baseImgUrl + this.userInfo['user_profile_photo'] + "?ver=" + ver;
            // } catch(err) {
            //   console.log("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
            //   console.log(err);
            // }
            // this.user_profile_photo = this.baseImgUrl + this.userInfo['user_profile_photo'] + "?ver=" + ver;
            this.user_profile_photo = this.commonSupportService.prepareUserImgUrl() + '?ver=' + ver;
          } else {
            this.user_profile_photo = '../../../../assets/default_pics/default-cp.jpg';
          }
        }
      }, (error) => console.log(error)
    );

    // if (this.uRole == 1) {  }
    // if (this.uRole == 2) {
    //   this.repositoryService.applicantInfo.subscribe(
    //     (res) => {
    //       console.log(res), this.applyInfo = res
    //     })
    // }
    if (this.uRole == 3) {
      this.repositoryService.tutorInfo.subscribe(
        (res) => {
          this.tutorInfo = res, console.log(this.tutorInfo)
        })
    }

    this.helperService.helper.subscribe((e) => {
        console.log(e), this.helpers = e
      }
    );
  }


  // When click img or link, edit img dialog pop-up
  imgDialog() {
    let dialogRef = this.dialog.open(ImageEditorDialogComponent, {
      panelClass: 'dialog1',
      data: [2 / 2, this.user_profile_photo],
    });
    dialogRef.afterClosed().subscribe(
      (res) => {// console.log(res);
        if (res) {
          this.user_profile_photo = res;
          this.helperService.userImage.next(res);
          this.image_change = true;
          // console.log('new image', this.helperService.userImage);
          // convert base64 image to blob type
            fetch(this.user_profile_photo).then(
              (res) => res.blob()).then(
              (blob) => {
                this.userInfo['user_profile_photo'] = blob;
                // append blob type to formData
                let imgFormData = new FormData();
                for (let key in this.userInfo) {
                  if (key == "user_profile_photo") {
                    imgFormData.append("image", this.userInfo[key], 'test.jpeg');
                  }
                  else {
                    imgFormData.append(key, this.userInfo[key]);
                  }
                }
                this.UserService.updateUserPhoto(imgFormData).subscribe(
                  (res) => console.log(res),
                  (err) => console.log(err), )
              }
            )
        }
      }, (err) => console.warn(err)
    );
  }

  ngAfterViewInit() {}
  ngOnDestroy(): void {
    this.repositoryService.testEmptySub();
    this.userRepositoryService.unsubscribe();
  }

  receiveMessage($event) {
    this.sessions = $event;
  }

  learnerSessions(){
     //incoming courses
     this.learnerService.indexLearnerSessions(this.searchValueAfter).subscribe((res)=>{
      //  console.log("learner:",res)
       this.sessionDetail = res['allSessions']
       this.getIncomingCourses()
     })
     this.learnerService.indexLearnerSessions(this.searchValueBefore).subscribe((res)=>{
       this.sessionDetail = res['allSessions']
       this.getFinishedCourses()
       this.finisedBorad = this.sessionDetail.length
      })
  }
  tutorSessions(){
         //incoming courses
         this.tutorService.indexTutorSessions(this.searchValueAfter).subscribe((res)=>{
           this.sessionDetail = res['tutorSessions']
          //  console.log("sessionDetailAfter:",this.sessionDetail)
           this.getIncomingCourses()
         })
         this.tutorService.indexTutorSessions(this.searchValueBefore).subscribe((res)=>{
           this.sessionDetail = res['tutorSessions']
          //  console.log("sessionDetailBefore:",this.sessionDetail)
           this.getFinishedCourses()
           this.finisedBorad = this.sessionDetail.length
          })
  }
  getFinishedCourses(){
    for (let i=0;i<this.sessionDetail.length;i++){
      this.sessionDetail[i].session_date = this.commonSupportService.changeToMoment(this.sessionDetail[i].session_date)
      if (this.isTutor&&this.sessionDetail[i].tutor_report===null){
        this.finishedCourses.push(this.sessionDetail[i])
      }
      if (!this.isTutor&&this.sessionDetail[i].tutor_report!=null&&this.sessionDetail[i].ratings===null)
        this.finishedCourses.push(this.sessionDetail[i])
    }
    this.reportBoard = this.finishedCourses.length
    if( this.finishedCourses.length >5){
      this.finishedCourses=this.finishedCourses.slice(0,5)
    }
    for (let i=0;i<this.finishedCourses.length;i++){
      this.finishedIndex.push(i)
      this.endingTime2.push(moment(this.finishedCourses[i].session_date).add(Number(this.finishedCourses[i].session_duration),'h').format('ha'))
      this.finishedCourses[i].session_date = moment(this.finishedCourses[i].session_date).format("ddd,DD,MMM,ha");
      this.finishedCourses[i].session_subject = this.finishedCourses[i].session_subject.toLowerCase()
    }
    // console.log('finishedCourses:',this.finishedCourses)
    // console.log('finishedIndex:',this.finishedIndex)
  }
  getIncomingCourses(){
    for (let i=0;i<this.sessionDetail.length;i++){
      this.sessionDetail[i].session_subject = this.sessionDetail[i].session_subject.toLowerCase()
      if(this.sessionDetail[i].canceled_at!=null){
        this.canceledCourses.push(this.sessionDetail[i])
      }else{
        this.nextCourses.push(this.sessionDetail[i])
      }
    }
    if( this.nextCourses.length >5){
      this.nextCourses=this.nextCourses.slice(0,5)
    }
    if( this.canceledCourses.length >5){
      this.canceledCourses=this.canceledCourses.slice(0,5)
    }
    for (let b=0; b<this.nextCourses.length; b++){
      this.endingTime1.push(moment(this.commonSupportService.changeToMoment(this.nextCourses[b].session_date)).add(Number(this.nextCourses[b].session_duration),'h').format("ha"))
      this.nextCourses[b].session_date = this.commonSupportService.changeToMoment(this.nextCourses[b].session_date).format("ddd,DD,MMM,ha")
      this.nextIndex.push(b)
    }
    for (let a=0; a<this.canceledCourses.length; a++){
      this.canceledCourses[a].session_date = moment(this.canceledCourses[a].session_date).format("ddd,DD,MMM,ha");
      this.canceledCourses[a].canceled_at = this.commonSupportService.changeToMoment(this.canceledCourses[a].canceled_at)
      this.canceledCourses[a].canceled_at = moment(this.canceledCourses[a].canceled_at).format("ddd,DD,MMM,ha");
    }
    this.nextBoard = this.nextCourses.length
    // console.log('canceledCourses:',this.canceledCourses)
    // console.log('nextCourses',this.nextCourses)
  }
  buttonControls(elemment:string,i){
    document.getElementById(elemment+i).style.display="inline"
  }
  buttonsHide(elemment:string,i){
    document.getElementById(elemment+i).style.display="none"
  }
  cancelSession(i){

  }
}
