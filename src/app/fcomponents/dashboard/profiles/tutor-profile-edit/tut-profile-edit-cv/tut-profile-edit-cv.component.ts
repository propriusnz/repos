import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject} from '@angular/core';
import { Validators,FormGroup, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { TutorService } from '../../../../../services/servercalls/tutor.service';
import { SideHelperService } from '../../../../../services/helpers/side-helper.service';
import { AlertNotificationService } from '../../../../../services/support/alert-notification.service';

@Component({
  selector: 'app-tut-profile-edit-cv',
  templateUrl: './tut-profile-edit-cv.component.html',
  styleUrls: ['./tut-profile-edit-cv.component.css']
})

export class TutProfileEditCvComponent implements OnInit {
  // Education Background stuff
  eduAddStatus=[false,false,false];
  eduForms=[]; edu1Form: FormGroup;  edu2Form: FormGroup;  edu3Form: FormGroup;
  educationInfo = {'edu_1':'', 'edu_1_date':'', 'edu_1_detail':'', 'edu_2':'', 'edu_2_date':'', 'edu_2_detail':'', 'edu_3':'', 'edu_3_date':'', 'edu_3_detail':''};
  addNewEdu = false; addAnotherEdu = false;
  // Work Experience stuff
  workAddStatus=[false,false,false]; 
  workForms=[]; work1Form: FormGroup; work2Form: FormGroup; work3Form: FormGroup; 
  workInfo = {'work_1':'', 'work_1_date':'', 'work_1_detail':'', 'work_2':'', 'work_2_date':'', 'work_2_detail':'', 'work_3':'', 'work_3_date':'', 'work_3_detail':''};
  addNewWork = false; addAnotherWork = false;
  // Hobby&Interest stuff
  hobbyAddStatus=[false,false]; 
  hobbyForms=[]; hobby1Form: FormGroup;  hobby2Form: FormGroup;
  hobbyInfo = {'hobby_1':'', 'hobby_1_detail':'', 'hobby_2':'', 'hobby_2_detail':''};
  addNewHobby = false; addAnotherHobby = false;
  // Quote stuff
  qStatus=false;
  quoteForm: FormGroup;
  quoteInfo = {'quote':'', 'quote_author':''};

  // Total tutor profile info
  tProfile: any;     // total tutor profile data get from server
  Profile={"quote":null,"quote_author":null,"edu_1":null,"edu_1_detail":null,"edu_1_date":null,"edu_2":null,"edu_2_detail":null,"edu_2_date":null,"edu_3":null,"edu_3_detail":null,"edu_3_date":null,"work_1":null,"work_1_detail":null,"work_1_date":null,"work_2":null,"work_2_detail":null,"work_2_date":null,"work_3":null,"work_3_detail":null,"work_3_date":null,"hobby_1":null,"hobby_1_detail":null,"hobby_2":null,"hobby_2_detail":null};
  tutorCV={          // display info in web page
    eduBackground:[
      {edu:'',edu_date:'',edu_detail:''},
      {edu:'',edu_date:'',edu_detail:''},
      {edu:'',edu_date:'',edu_detail:''}
    ],
    workExp:[
      {work:'',work_date:'',work_detail:''},
      {work:'',work_date:'',work_detail:''},
      {work:'',work_date:'',work_detail:''}
    ],
    hobbyInt:[
      {hobby:'',hobby_detail:''},
      {hobby:'',hobby_detail:''},
    ],
    quote:{quote:'', quote_author:''} 
  };
  tutor: any;
  statuses: any;
  forms: any;
  details: any;
  names: any;
  sYears: any;
  eYears: any;
  titles: any;
  years: any;
  description: any;
  alertCounter = 0;
  feedbackMessage: string;

  constructor(
    @Inject(WINDOW) private window: Window, 
    private builder: FormBuilder,    
    private tutorService:TutorService,
    private SideHelperService: SideHelperService,
    private alertservice: AlertNotificationService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getProfileData();
  }

  // create 9 forms in total (3 education background  + 3 work experience + 2 hobbies&Interests + 1 favoriteQuote)
  createForm(){
    this.edu1Form = this.builder.group({
      edu :['',[Validators.required,Validators.minLength(2)]], 
      eDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.min(1950),Validators.max(2018)]], 
      eYear :['',[Validators.required,Validators.min(1950),Validators.max(2020)]],});
    this.edu2Form=this.builder.group({
      edu :['',[Validators.required,Validators.minLength(2)]],
      eDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.min(1950),Validators.max(2018)]],
      eYear :['',[Validators.required,Validators.min(1950),Validators.max(2020)]],});
    this.edu3Form=this.builder.group({
      edu :['',[Validators.required,Validators.minLength(2)]],
      eDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.min(1950),Validators.max(2018)]],
      eYear :['',[Validators.required,Validators.min(1950),Validators.max(2020)]],});
    this.work1Form= this.builder.group({
      work :['',[Validators.required,Validators.minLength(2)]], 
      wDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.min(1950),Validators.max(2018)]],
      eYear :['',[Validators.required,Validators.min(1950),Validators.max(2020)]],});
    this.work2Form= this.builder.group({
      work :['',[Validators.required,Validators.minLength(2)]],
      wDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.min(1950),Validators.max(2018)]],
      eYear :['',[Validators.required,Validators.min(1950),Validators.max(2020)]],});
    this.work3Form= this.builder.group({
      work :['',[Validators.required,Validators.minLength(2)]],
      wDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.min(1950),Validators.max(2018)]],
      eYear :['',[Validators.required,Validators.min(1950),Validators.max(2020)]],});
    this.hobby1Form= this.builder.group({
      hobby :['',[Validators.required,Validators.minLength(2)]],
      hDetail :['',[Validators.required,Validators.minLength(3)]],});
    this.hobby2Form= this.builder.group({
      hobby :['',[Validators.required,Validators.minLength(2)]],
      hDetail :['',[Validators.required,Validators.minLength(3)]],});
    this.quoteForm= this.builder.group({
      quote :['',[Validators.required,Validators.minLength(2)]],
      qAuthor :['',[Validators.required,Validators.minLength(3)]],});
    // combine 9 forms into 4 categories form arrays.
    this.eduForms.push(this.edu1Form,this.edu2Form,this.edu3Form);
    this.workForms.push(this.work1Form,this.work1Form,this.work1Form);
    this.hobbyForms.push(this.hobby1Form,this.hobby1Form);
    console.log(this.eduForms);
    console.log(this.workForms);
    console.log(this.hobbyForms);
  }

  getProfileData(){
    this.tutorService.showTutorProfile().subscribe(
      (res)=>{
        console.log(res);
        this.tProfile = Object.assign(res['dataCon'].tutorProfile);
        console.log(this.tProfile);
        this.combineEduData();
        this.combineWorkData();
        this.combineHobbyData();
      },
      (error)=>{
        console.log(error);
        this.feedbackMessage="Sorry, but we can't get your data at this time. Please try again"; 
        this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-center-center', 8000);
      }
    )
  }

  // ----------------------------------------------- Education background -----------------------------------------------------
  // get all Education Background data from tutorProfile when Initiating to decrease repeat value
  combineEduData(){
    // combination data is array [...] type to help show add Links
    this.educationInfo.edu_1 = this.tProfile.edu_1;
    this.educationInfo.edu_1_date = this.tProfile.edu_1_date;
    this.educationInfo.edu_1_detail = this.tProfile.edu_1_detail;
    this.educationInfo.edu_2 = this.tProfile.edu_2;
    this.educationInfo.edu_2_date = this.tProfile.edu_2_date;
    this.educationInfo.edu_2_detail = this.tProfile.edu_2_detail;
    this.educationInfo.edu_3 = this.tProfile.edu_3;
    this.educationInfo.edu_3_date = this.tProfile.edu_3_date;
    this.educationInfo.edu_3_detail = this.tProfile.edu_3_detail;
    let eduValue = Object.values(this.educationInfo);
    console.log('educationInfo: ', this.educationInfo);
    console.log('edu object Value: ', eduValue);
    this.eduLinks(eduValue);
    // combination data is array [{},{},{}] type to display web page
    this.tutorCV.eduBackground[0].edu = this.tProfile.edu_1;
    this.tutorCV.eduBackground[0].edu_date = this.tProfile.edu_1_date;
    this.tutorCV.eduBackground[0].edu_detail = this.tProfile.edu_1_detail;
    this.tutorCV.eduBackground[1].edu = this.tProfile.edu_2;
    this.tutorCV.eduBackground[1].edu_date = this.tProfile.edu_2_date;
    this.tutorCV.eduBackground[1].edu_detail = this.tProfile.edu_2_detail;
    this.tutorCV.eduBackground[2].edu = this.tProfile.edu_3;
    this.tutorCV.eduBackground[2].edu_date = this.tProfile.edu_3_date;
    this.tutorCV.eduBackground[2].edu_detail = this.tProfile.edu_3_detail;
    console.log('tutorCV: ' ,this.tutorCV);
    console.log('tutorCV edu: ' ,this.tutorCV.eduBackground);
  }

  // check education form's links ('Add the first address' or 'Add another')
  eduLinks(eduValue){
    let valueCounter = 0;
    console.log('eduValue length: ', eduValue.length);
    for (let i=0; i<eduValue.length; i++){
      if (eduValue[i] != null){ valueCounter += 1; }
    }
    console.log('eduValCounter: ', valueCounter);
    if (valueCounter > 0){
      this.addNewEdu = false;
      this.addAnotherEdu = true;
    } else {
      this.addNewEdu = true;
      this.addAnotherEdu = false;
    }
  }

  // change the education forms' status when click 'add another' link
  eduFormStatus(){
  let education= this.educationInfo;
  console.log(education);
    if(education.edu_1 !=='' && education.edu_2 == null){
      console.log('education 2 is null');
      return this.eduAddStatus[1]=true;
    } else if (education.edu_2 !=='' && education.edu_3 == null){
      console.log('education 3 is null');
      this.eduAddStatus[2]=true;
    }
  }

  // Prefill education background values in form inputs
  prefillForm($event){
    let index = $event;
    let eduValue = this.tutorCV.eduBackground[index];
    console.log(this.tutorCV.eduBackground);
    let yearRange = eduValue.edu_date.split('-');
    this.eduForms[index].controls['sYear'].setValue(yearRange[0].toString());
    this.eduForms[index].controls['eYear'].setValue(yearRange[1].toString());
    this.eduForms[index].controls['edu'].setValue(eduValue.edu);
    this.eduForms[index].controls['eDetail'].setValue(eduValue.edu_detail);
    this.eduForms[index].updateValueAndValidity();
  }

  // when cancel button of Add form click, only show one link of 'add new' or 'add another'.
  cancelClick(index){
    if (index === 0){
      if (this.tutorCV.eduBackground[0].edu == null){ this.addNewEdu = true; }
    } else {
      if(this.addNewEdu){ this.addNewEdu = !this.addNewEdu; } 
      else if(!this.addAnotherEdu){ this.addAnotherEdu = !this.addAnotherEdu; }
    }
  }  

  // set education data when user edit or add information
  doneClick(y){
    this.feedbackMessage = '';
    if(y.name.valid){
      this.feedbackMessage="Your education background has been edited."
      this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
      this.setData(y.index);
      this.eduAddStatus[y.index]=false;
      if (y.index <2){
        this.addAnotherEdu = true;
      }
    } else{
      this.feedbackMessage="Sorry, you need to fill all fields."
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    }
  }

  // set the education form data (display data in Web page & save data sent to server)
  setData(index){
    let eduInput={edu:'',edu_date:'',edu_detail:''};            // save education iuput value
    let eduInputArr = [];
    for(let eduForm of this.eduForms){
      console.log('before: ', eduInputArr);
      if(eduForm.value.edu!=''){
        eduInput.edu = eduForm.value.edu;
        eduInput.edu_date = eduForm.value.sYear +' - '+ eduForm.value.eYear;
        eduInput.edu_detail = eduForm.value.eDetail;
        eduInputArr.push(eduInput);
        console.log(eduInput);
        console.log('after: ', eduInputArr);
      }
    }
    // save education input value into 'tutor' object to display value in web page
    this.tutorCV.eduBackground[index] = eduInput;
    console.log(this.tutorCV.eduBackground);
    this.eduAddStatus[index] = false;

    // add education info of data sent to server
    let edu = this.tutorCV.eduBackground;
    this.educationInfo.edu_1 = edu[0].edu;
    this.educationInfo.edu_1_date = edu[0].edu_date;
    this.educationInfo.edu_1_detail = edu[0].edu_detail;
    this.educationInfo.edu_2 = edu[1].edu;
    this.educationInfo.edu_2_date = edu[1].edu_date;
    this.educationInfo.edu_2_detail = edu[1].edu_detail;
    this.educationInfo.edu_3 = edu[2].edu;
    this.educationInfo.edu_3_date = edu[2].edu_date;
    this.educationInfo.edu_3_detail = edu[2].edu_detail;
    let eduKey = Object.keys(this.educationInfo);
    let profileKey = Object.keys(this.tProfile);
    for(let i=0; i<profileKey.length; i++){
      for (let j=0; j<eduKey.length; j++){
        if (eduKey[j] === profileKey[i]){
          this.tProfile[profileKey[i]] = this.educationInfo[eduKey[j]];
        }
      }
    }
    console.log(this.tProfile);
  }

  // delete education data when user delete it
  dlEdu(x) {
    // delete education info of web page display
    this.tutorCV.eduBackground[x].edu = null;
    this.tutorCV.eduBackground[x].edu_date = null;
    this.tutorCV.eduBackground[x].edu_detail = null;
    // delete education info of data sent to server
    console.log('Before: ', this.tProfile);
    let title = 'edu_' + (x+1);
    let detail = 'edu_' + (x+1) + '_detail';
    let year = 'edu_' + (x+1) + '_date';
    let eduObjKey = Object.keys(this.tProfile);
    let eduObjVal = Object.values(this.tProfile);
    for (let i=0; i<eduObjKey.length; i++){
      if (eduObjKey[i] === title || eduObjKey[i] === detail ||eduObjKey[i] === year){
        this.tProfile[eduObjKey[i]] = '';
        this.educationInfo[eduObjKey[i]] = null;
      }
    }
    console.log('After: ', this.tProfile);
    // when delete any education form, check education add links show
    this.eduLinks(Object.values(this.educationInfo));
    this.feedbackMessage = '';
    this.feedbackMessage = 'Your education background details has been deleted but not save yet.';
    this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
  }

  // ----------------------------------------------- Work experience -----------------------------------------------------
  // get all Work experience data from tutorProfile when Initiating to decrease repeat value
  combineWorkData(){
    // combination data is array [...] type to help show add Links
    this.workInfo.work_1 = this.tProfile.work_1;
    this.workInfo.work_1_date = this.tProfile.work_1_date;
    this.workInfo.work_1_detail = this.tProfile.work_1_detail;
    this.workInfo.work_2 = this.tProfile.work_2;
    this.workInfo.work_2_date = this.tProfile.work_2_date;
    this.workInfo.work_2_detail = this.tProfile.work_2_detail;
    this.workInfo.work_3 = this.tProfile.work_3;
    this.workInfo.work_3_date = this.tProfile.work_3_date;
    this.workInfo.work_3_detail = this.tProfile.work_3_detail;
    let workValue = Object.values(this.workInfo);
    console.log('workInfo: ', this.workInfo);
    console.log('work object Value: ', workValue);
    this.workLinks(workValue);
    // combination data is array [{},{},{}] type to display web page
    this.tutorCV.workExp[0].work = this.tProfile.work_1;
    this.tutorCV.workExp[0].work_date = this.tProfile.work_1_date;
    this.tutorCV.workExp[0].work_detail = this.tProfile.work_1_detail;
    this.tutorCV.workExp[1].work = this.tProfile.work_2;
    this.tutorCV.workExp[1].work_date = this.tProfile.work_2_date;
    this.tutorCV.workExp[1].work_detail = this.tProfile.work_2_detail;
    this.tutorCV.workExp[2].work = this.tProfile.work_3;
    this.tutorCV.workExp[2].work_date = this.tProfile.work_3_date;
    this.tutorCV.workExp[2].work_detail = this.tProfile.work_3_detail;
    console.log('tutorCV: ' ,this.tutorCV);
    console.log('tutorCV work: ' ,this.tutorCV.workExp);
  }

  // check work form's links ('Add the first address' or 'Add another')
  workLinks(workValue){
    let valueCounter = 0;
    console.log('workValue length: ', workValue.length);
    for (let i=0; i<workValue.length; i++){
      if (workValue[i] != null){ valueCounter += 1; }
    }
    console.log('workValCounter: ', valueCounter);
    if (valueCounter > 0){
      this.addNewWork = false;
      this.addAnotherWork = true;
    } else {
      this.addNewWork = true;
      this.addAnotherWork = false;
    }
  }

  // change the work forms' status when click 'add another' link
  workFormStatus(){
    let work= this.workInfo;
    console.log(work);
    if(work.work_1 !=='' && work.work_2 == null){
      console.log('work 2 is null');
      return this.workAddStatus[1]=true;
    } else if (work.work_2 !=='' && work.work_3 == null){
      console.log('work 3 is null');
      this.workAddStatus[2]=true;
    }
  }

  // Prefill work experience values in form inputs
  prefillWorkForm($event){
    let index = $event;
    let workValue = this.tutorCV.workExp[index];
    console.log(this.tutorCV.workExp);
    let yearRange = workValue.work_date.split('-');
    this.workForms[index].controls['sYear'].setValue(yearRange[0].toString());
    this.workForms[index].controls['eYear'].setValue(yearRange[1].toString());
    this.workForms[index].controls['work'].setValue(workValue.work);
    this.workForms[index].controls['wDetail'].setValue(workValue.work_detail);
    this.workForms[index].updateValueAndValidity();
  }

  // when cancel button of Add form click, only show one link of 'add new' or 'add another'.
  cancelWorkClick(index){
    if (index === 0){
      if (this.tutorCV.workExp[0].work == null){ this.addNewWork = true; }
    } else {
      if(this.addNewWork){ this.addNewWork = !this.addNewWork; } 
      else if(!this.addAnotherWork){ this.addAnotherWork = !this.addAnotherWork; }
    }
  } 

  // set work data when user edit or add information
  doneWorkClick(y){
    this.feedbackMessage = '';
    if(y.name.valid){
      this.feedbackMessage="Your work experience has been edited."
      this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
      this.setWorkData(y.index);
      this.workAddStatus[y.index]=false;
      if (y.index <2){
        this.addAnotherWork = true;
      }
    } else{
      this.feedbackMessage="Sorry, you need to fill all fields."
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    }
  }

  // set the work form data (display data in Web page & save data sent to server)
  setWorkData(index){
    let workInput={work:'',work_date:'',work_detail:''};            // save work iuput value
    for(let workForm of this.workForms){
      if(workForm.value.work!=''){
        workInput.work = workForm.value.work;
        workInput.work_date = workForm.value.sYear +' - '+ workForm.value.eYear;
        workInput.work_detail = workForm.value.wDetail;
        console.log(workInput);
      }
    }
    // save work input value into 'tutor' object to display value in web page
    this.tutorCV.workExp[index] = workInput;
    console.log(this.tutorCV.workExp);
    this.workAddStatus[index] = false;

    // add work info of data sent to server
    let wo = this.tutorCV.workExp;
    this.workInfo.work_1 = wo[0].work;
    this.workInfo.work_1_date = wo[0].work_date;
    this.workInfo.work_1_detail = wo[0].work_detail;
    this.workInfo.work_2 = wo[1].work;
    this.workInfo.work_2_date = wo[1].work_date;
    this.workInfo.work_2_detail = wo[1].work_detail;
    this.workInfo.work_3 = wo[2].work;
    this.workInfo.work_3_date = wo[2].work_date;
    this.workInfo.work_3_detail = wo[2].work_detail;
    let workKey = Object.keys(this.workInfo);
    let profileKey = Object.keys(this.tProfile);
    for(let i=0; i<profileKey.length; i++){
      for (let j=0; j<workKey.length; j++){
        if (workKey[j] === profileKey[i]){
          this.tProfile[profileKey[i]] = this.workInfo[workKey[j]];
        }
      }
    }
    console.log(this.tProfile);
  }

  // delete work data when user delete it
  dlWorkExpe(x) {
    // delete work info of web page display
    this.tutorCV.workExp[x].work = null;
    this.tutorCV.workExp[x].work_date = null;
    this.tutorCV.workExp[x].work_detail = null;
    // delete work info of data sent to server
    console.log('Before: ', this.tProfile);
    let title = 'work_' + (x+1);
    let detail = 'work_' + (x+1) + '_detail';
    let year = 'work_' + (x+1) + '_date';
    let workObjKey = Object.keys(this.tProfile);
    for (let i=0; i<workObjKey.length; i++){
      if (workObjKey[i] === title || workObjKey[i] === detail ||workObjKey[i] === year){
        this.tProfile[workObjKey[i]] = '';
        this.workInfo[workObjKey[i]] = null;
      }
    }
    console.log('After: ', this.tProfile);
    // when delete any work form, check work add links show
    this.workLinks(Object.values(this.workInfo));
    this.feedbackMessage = '';
    this.feedbackMessage = 'Your work experience details has been deleted but not save yet.';
    this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
  }


  // ----------------------------------------------- Hobbies and Interests -----------------------------------------------------
  // get all Hobbies and Interests data from tutorProfile when Initiating to decrease repeat value
  combineHobbyData(){
    // combination data is array [...] type to help show add Links
    this.hobbyInfo.hobby_1 = this.tProfile.hobby_1;
    this.hobbyInfo.hobby_1_detail = this.tProfile.hobby_1_detail;
    this.hobbyInfo.hobby_2 = this.tProfile.hobby_2;
    this.hobbyInfo.hobby_2_detail = this.tProfile.hobby_2_detail;
    let hobbyValue = Object.values(this.hobbyInfo);
    console.log('hobbyInfo: ', this.hobbyInfo);
    console.log('hobby object Value: ', hobbyValue);
    this.hobbyLinks(hobbyValue);
    // combination data is array [{},{},{}] type to display web page
    this.tutorCV.hobbyInt[0].hobby = this.tProfile.hobby_1;
    this.tutorCV.hobbyInt[0].hobby_detail = this.tProfile.hobby_1_detail;
    this.tutorCV.hobbyInt[1].hobby = this.tProfile.hobby_2;
    this.tutorCV.hobbyInt[1].hobby_detail = this.tProfile.hobby_2_detail;
    console.log('tutorCV: ' ,this.tutorCV);
    console.log('tutorCV hobby: ' ,this.tutorCV.hobbyInt);
  }

  // check hobby form's links ('Add the first address' or 'Add another')
  hobbyLinks(hobbyValue){
    let valueCounter = 0;
    console.log('hobbyValue length: ', hobbyValue.length);
    for (let i=0; i<hobbyValue.length; i++){
      if (hobbyValue[i] != null){ valueCounter += 1; }
    }
    console.log('hobbyValCounter: ', valueCounter);
    if (valueCounter > 0){
      this.addNewHobby = false;
      this.addAnotherHobby = true;
    } else {
      this.addNewHobby = true;
      this.addAnotherHobby = false;
    }
  }

  // Prefill hobby and interest values in form inputs
  prefillHobbyForm($event){
    let index = $event;
    let hobbyValue = this.tutorCV.hobbyInt[index];
    console.log(this.tutorCV.hobbyInt);
    this.hobbyForms[index].controls['hobby'].setValue(hobbyValue.hobby);
    this.hobbyForms[index].controls['hDetail'].setValue(hobbyValue.hobby_detail);
    this.hobbyForms[index].updateValueAndValidity();
  }

  // when cancel button of Add form click, only show one link of 'add new' or 'add another'.
  cancelHobbyClick(index){
    if (index === 0){
      if (this.tutorCV.hobbyInt[0].hobby == null){ this.addNewHobby = true; }
    } else {
      if(this.addNewHobby){ this.addNewHobby = !this.addNewHobby; } 
      else if(!this.addAnotherHobby){ this.addAnotherHobby = !this.addAnotherHobby; }
    }
  } 

  // set hobby data when user edit or add information
  doneHobbyClick(y){
    this.feedbackMessage = '';
    if(y.name.valid){
      this.feedbackMessage="Your hobby and interest have been edited."
      this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
      this.setHobbyData(y.index);
      this.hobbyAddStatus[y.index]=false;
      if (y.index <2){
        this.addAnotherHobby = true;
      }
    } else{
      this.feedbackMessage="Sorry, you need to fill all fields."
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    }
  }

  // set the hobby form data (display data in Web page & save data sent to server)
  setHobbyData(index){
    let hobbyInput={hobby:'',hobby_detail:''};            // save hobby iuput value
    for(let hobbyForm of this.hobbyForms){
      if(hobbyForm.value.hobby!=''){
        hobbyInput.hobby = hobbyForm.value.hobby;
        hobbyInput.hobby_detail = hobbyForm.value.hDetail;
        console.log(hobbyInput);
      }
    }
    // save hobby input value into 'tutor' object to display value in web page
    this.tutorCV.hobbyInt[index] = hobbyInput;
    console.log(this.tutorCV.hobbyInt);
    this.hobbyAddStatus[index] = false;

    // add hobby info of data sent to server
    let ho = this.tutorCV.hobbyInt;
    this.hobbyInfo.hobby_1 = ho[0].hobby;
    this.hobbyInfo.hobby_1_detail = ho[0].hobby_detail;
    this.hobbyInfo.hobby_2 = ho[1].hobby;
    this.hobbyInfo.hobby_2_detail = ho[1].hobby_detail;
    let hobbyKey = Object.keys(this.hobbyInfo);
    let profileKey = Object.keys(this.tProfile);
    for(let i=0; i<profileKey.length; i++){
      for (let j=0; j<hobbyKey.length; j++){
        if (hobbyKey[j] === profileKey[i]){
          this.tProfile[profileKey[i]] = this.hobbyInfo[hobbyKey[j]];
        }
      }
    }
    console.log(this.tProfile);
  }

  // delete hobby data when user delete it
  dlHobbyInt(x) {
    // delete hobby info of web page display
    this.tutorCV.hobbyInt[x].hobby = null;
    this.tutorCV.hobbyInt[x].hobby_detail = null;
    // delete hobby info of data sent to server
    console.log('Before: ', this.tProfile);
    let title = 'hobby_' + (x+1);
    let detail = 'hobby_' + (x+1) + '_detail';
    let hobbyObjKey = Object.keys(this.tProfile);
    for (let i=0; i<hobbyObjKey.length; i++){
      if (hobbyObjKey[i] === title || hobbyObjKey[i] === detail){
        this.tProfile[hobbyObjKey[i]] = '';
        this.hobbyInfo[hobbyObjKey[i]] = null;
      }
    }
    console.log('After: ', this.tProfile);
    // when delete any hobby form, check hobby add links show
    this.hobbyLinks(Object.values(this.hobbyInfo));
    this.feedbackMessage = '';
    this.feedbackMessage = 'Your hobby and interest details has been deleted but not save yet.';
    this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
  }  


  // ----------------------------------------------- Favorite quote -----------------------------------------------------
  // set favoriteQuote data when user edit or add information
  favoriteQuoteData(x){
    this.feedbackMessage = '';
    if(this[x.form].valid && this[x.form].dirty){
      this.Profile[x.title]=this[x.form].value.quote;
      this.Profile[x.des]=this[x.form].value.qAuthor;
      this.tProfile[x.title]=this.Profile[x.title];
      this.tProfile[x.des]=this.Profile[x.des];
      this.quoteInfo[x.title]=this.Profile[x.title];
      this.quoteInfo[x.des]=this.Profile[x.des];
      console.log('valid',this.Profile);
      console.log(this.tProfile.quote);
      console.log(this.tProfile.quote_author);
      this.feedbackMessage = 'Your favorite quote details have been changed but not save yet.';
      this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
      return this[x.status]=false;
    }else{
      console.log('not valid', this.Profile);
      this.feedbackMessage = 'Sorry, something went wrong.';
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    }
  }

  // Prefill quote values in form inputs
  prefillQuoteForm(){
    this.quoteForm.controls['quote'].setValue(this.tProfile.quote);
    this.quoteForm.controls['qAuthor'].setValue(this.tProfile.quote_author);
    this.quoteForm.updateValueAndValidity();
  }  

  // delete favoriteQuote data when user delete it
  dlFavQuote(x) {
    this.Profile[x.des]=' ';
    this.Profile[x.title]=' ';
    this.tProfile[x.title]='';
    this.tProfile[x.des]='';
    console.log('half',this.Profile);
    this.feedbackMessage = '';
    this.feedbackMessage = 'Your favorite quote details has been deleted but not save yet.';
    this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
  }


  // ----------------------------------------------- Button group -----------------------------------------------------
  submitInfo(){
    this.feedbackMessage = '';
    // If any form changes, then save the updated one. If no changes happened, then save the previous value again.
    let profileKey = Object.keys(this.Profile);
    let eduObjVal = Object.values(this.educationInfo);
    let workObjVal = Object.values(this.workInfo);
    let hobbyObjVal = Object.values(this.hobbyInfo);
    let quoteObjVal = Object.values(this.quoteInfo);
    if (eduObjVal[0] != null || workObjVal[0] != null || hobbyObjVal[0] != null || quoteObjVal[0] != null){
      this.Profile = this.tProfile;
      this.Profile['_method']='put';
    } else {
      if(this.Profile['edu_1'] || this.Profile['edu_1']=='' || this.Profile['edu_2'] || this.Profile['edu_2']=='' ||  this.Profile['edu_3'] ||  this.Profile['edu_3']=='' || this.Profile['work_1'] || this.Profile['work_1']=='' || this.Profile['work_2'] || this.Profile['work_2']=='' || 
      this.Profile['work_3'] || this.Profile['work_3']=='' || this.Profile['hobby_1'] || this.Profile['hobby_1']=='' || this.Profile['hobby_2'] || this.Profile['hobby_2']=='' || this.Profile['quote'] || this.Profile['quote']==''){
      this.Profile['_method']='put';
      Object.keys(this.Profile).forEach(k => (!this.Profile[k] && this.Profile[k] !== undefined) && delete this.Profile[k]);
      } else{
        console.log('No Values defined');
        this.feedbackMessage = 'Sorry, no value defined.';
        this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
      }
    }
    console.log(this.Profile);
    this.feedbackMessage = '';
    this.tutorService.updateTutorProfile(this.Profile).subscribe(
      (res)=>{
        console.log(res);
        this.feedbackMessage = 'Your changes have been saved.';
        this.ariseAlert(this.feedbackMessage, 'SUCCESS', 'toast-top-right', 1500);
      },
      (error)=>{
        console.log(error);
        this.feedbackMessage = 'Sorry, something went wrong.';
        this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
      }
    )
  }

  cancelInfo(){
    // this.window.location.reload();
    this.feedbackMessage = '';
    if(this.alertCounter <= 0){
      this.feedbackMessage = 'Sorry, you haven\'t updated or saved any changes.';
      this.alertCounter -= 1;
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    } else{
      this.window.location.reload();
    }
  }

  ariseAlert(message, messageType, position, duration) {
    this.alertCounter += 1;
    this.alertservice.sendAlert(message, messageType, position, duration);
  }

  mouseEnter(m) {
    this.SideHelperService.sendMessage(m);
  }

}
