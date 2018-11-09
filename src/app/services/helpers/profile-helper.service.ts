import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RepositoryService } from './../repositories/repository.service';
import { GeneralRepositoryService  } from './../repositories/general-repository.service';

@Injectable()
export class ProfileHelperService {
  genU: {destination: string; main: string;icon:string }[];
  gen=[{destination:'',main:'',icon:''}];
  ea:string;
  userR: number;
  helper=new BehaviorSubject<any>('');
  userRole = new BehaviorSubject<any>('');
  userImage = new BehaviorSubject<any>('');

  constructor(
    private repositoryService: RepositoryService,
    private generalRepositoryService:GeneralRepositoryService
  ) {
    this.helper.asObservable();
   }

  getHelpers(uR) {
    this.userR = uR;
    if (this.userR === 1) {
      this.repositoryService.learnerInfo.subscribe(res => {
        console.log(res);
        this.students(res);
        this.generalRepositoryService.hasSession.subscribe(res => {
          this.students2(res);  
          }
        )       
        this.userRole.next(1);
      });
    }
    else if (this.userR === 2) {
      this.repositoryService.applicantInfo.subscribe(res => {
        //console.log('i am an applicant', res);
        this.applicants(res);
      });
    }
    else if (this.userR === 3) {
      this.repositoryService.tutorInfo.subscribe(res => {
        console.log('tutorInfo',res);
        this.tutors(res);
        this.userRole.next(3);
      });
    }
    // tslint:disable-next-line:one-line
    else{
      return this.noRoles();
    }
  }

  students(data){
    console.log(data);
    if(data===null||data===''||data.learnerProfile.length===0){
      this.gen=[{destination:"/app/dashboard/learner/profile", main:"You need complete your profile",icon:'<i class="fas fa-edit"></i>'}]
      } 
    }
  students2(data){
    if (data===false){
      var status = this.gen.some(function(el) {
          return (el.main == "No tutor,find a tutor.");
      });
      if (!status){
        if (this.gen[0].main==="You need complete your profile")
          this.gen.push({destination:"/app/find-tutor", main:"No tutor,find a tutor.",icon:'<i class="fas fa-chalkboard-teacher"></i>'})
        else
          this.gen=[{destination:"/app/find-tutor", main:"No tutor,find a tutor.",icon:'<i class="fas fa-chalkboard-teacher"></i>'}]          
      }
    }
    this.helper.next(this.gen)      
  }
  applicants(data){
    this.gen = [{ destination:"/app/dashboard/apply/manager", main:"Thank you for applying to teach.", icon:"<i class='fas fa-smile-beam'></i>"}]
    //data.condition='interview'
    if(data.condition=='update'){//update
      this.gen.push({destination:"/app/dashboard/apply/manager", main:"Your application needs an update:", icon:"<i class='fas fa-edit'></i>"})
    }
    else {
    //if(data.condition=='approved'){
      let msg,icon;
      
      switch (data.condition)
      {
        case 'pending'://pending
          msg = "Your application is pending";
          icon = '<i class="fas fa-stop"></i>';
          break;
        case 'interview':        
           msg = "Your application is in [interview] phase";        
           icon = '<i class="fal fa-chalkboard-teacher"></i>';           
           break;           
        case 'pending_interview':           
          msg = "Your application is pending in interview";     
          icon = '<i class="fas fa-tachometer-alt"></i>';                    
          break;          
        case 'approved':   
          msg = "Your application has been approved";  
          icon = '<i class="far fa-arrow-alt-circle-right"></i>';                  
          break;          
        case 'contract_signed':
          msg = "Your application is in [contract signed] phase";
          icon = '<i class="fas fa-file-signature"></i>';              
          break;                
        case 'declined':                     
          msg = "Sorry!Your application has been declined";
          icon = '<i class="fas fa-ban"></i>';            
          break;          
      }
      this.gen.push({destination:"/app/apply/manager", main:msg,icon:icon})
    }
    this.helper.next(this.gen)
  }

  tutors(data){
    /*
        setInterval(()=>{
          this.gen = [{destination:"/dfgfd/", main: "dfddddddddddddddddddddd.",icon:''}]
          //console.log(this.gen)
        }, 10000);
    */
    if(data.publish==0){
      this.gen = [{destination:"/app/dashboard/tutor/editprofile/", main: "Your profile is incomplete, and had not yet been published.",icon:"<i class='fas fa-upload'></i>"}]
    }
    if(data.publish==1){
      this.gen = [{destination:"/app/dashboard/tutor/editprofile", main: "Your profile have been published.",icon:"<i class='fas fa-upload'></i>"}]
    }
    if(!data.profile_video){
      this.gen.push({destination:"/app/dashboard/tutor/editprofile/cv", main:"Update an video introduction",icon:"<i class='fas fa-video'></i>"})
    }
    if(!data.edu_1 && !data.edu_2 && !data.edu_3){
      this.gen.push({destination:"/app/dashboard/tutor/editprofile/cv", main:"Add a education history",icon:"<i class='fas fa-graduation-cap'></i>"})
    }
    if(!data.hobby_1 && !data.hobby_2){
      this.gen.push({destination:"/app/dashboard/tutor/editprofile/cv", main:"Add a interest",icon:"<i class='fas fa-futbol'></i>"})
    }
    if(!data.teaching_locations){
      this.gen.push({destination:"/app/dashboard/tutor/editprofile", main:"Add a teaching location",icon:"<i class='fas fa-map-marked-alt'></i>"})
    } 
    if(!data.intro_statement){
      this.gen.push({destination:"/app/dashboard/tutor/editprofile", main:"Add a introduction statement",icon:"<i class='fas fa-user-edit'></i>"})
    } 
    if(!data.work_1 && !data.work_2 && !data.work_3){
      this.gen.push({destination:"/app/dashboard/tutor/editprofile/cv", main:"Add a work field",icon:"<i class='fas fa-briefcase'></i>"})
    }
    if(!data.quote){
      this.gen.push({destination:"/app/dashboard/tutor/editprofile/cv", main:"Add a favorite quote",icon:"<i class='fas fa-quote-right'></i>"})
    }
    if(!data.profile_photo){
      this.gen.push({destination:"/app/dashboard/tutor/editprofile/key", main:"Add a photo",icon:"<i class='fas fa-camera-retro'></i>"})
    }    
    this.genU=this.gen.slice(1,5)
    this.helper.next(this.genU)
  }

  noRoles(){
    this.gen = [{destination:"", main: "We can't reach anything for you at this moment.",icon:'<i class="fas fa-times-circle"></i>'}]
    return this.gen
  }
}