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
      sYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2018)]], 
      eYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2020)]],});
    this.edu2Form=this.builder.group({
      edu :['',[Validators.required,Validators.minLength(2)]],
      eDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2018)]],
      eYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2020)]],});
    this.edu3Form=this.builder.group({
      edu :['',[Validators.required,Validators.minLength(2)]],
      eDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2018)]],
      eYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2020)]],});
    this.work1Form= this.builder.group({
      work :['',[Validators.required,Validators.minLength(2)]], 
      wDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2018)]],
      eYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2020)]],});
    this.work2Form= this.builder.group({
      work :['',[Validators.required,Validators.minLength(2)]],
      wDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2018)]],
      eYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2020)]],});
    this.work3Form= this.builder.group({
      work :['',[Validators.required,Validators.minLength(2)]],
      wDetail :['',[Validators.required,Validators.minLength(3)]],
      sYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2018)]],
      eYear :['',[Validators.required,Validators.pattern("^[0-9]*$"),Validators.min(1950),Validators.max(2020)]],});
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
    this.workForms.push(this.work1Form,this.work2Form,this.work3Form);
    this.hobbyForms.push(this.hobby1Form,this.hobby2Form);
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
    let valueCounter = 0,neweduValue = [];
    console.log('eduValue length: ', eduValue.length);

    while(eduValue.length)  //1D to 2D 
    neweduValue.push(eduValue.splice(0,3));
    //get number of the array
    valueCounter=neweduValue.filter(element=>element[0]!=null||
        element[1]!=null||element[2]!=null).length;

    console.log('eduValCounter: ', valueCounter);
    if (valueCounter > 0&&valueCounter <3){
      this.addNewEdu = false;
      this.addAnotherEdu = true;
    } else if (valueCounter >=3){
      this.addNewEdu = false;
      this.addAnotherEdu = false;
    }else {
      this.addNewEdu = true;
      this.addAnotherEdu = false;
    }
  }

  // change the education forms status when click 'add another' link
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
    try {//if no '-' then set to '';
      let yearRange = eduValue.edu_date.split('-');
      this.eduForms[index].controls['sYear'].setValue(yearRange[0].toString());
      this.eduForms[index].controls['eYear'].setValue(yearRange[1].toString());  
      this.eduForms[index].controls['edu'].setValue(eduValue.edu);
      this.eduForms[index].controls['eDetail'].setValue(eduValue.edu_detail);          
    }
    catch{
      this.eduForms[index].controls['sYear'].setValue('');
      this.eduForms[index].controls['eYear'].setValue(''); 
      this.eduForms[index].controls['edu'].setValue('');
      this.eduForms[index].controls['eDetail'].setValue('');      
    }


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
      this.setData(y.index);
      this.submitInfo(process=>this.doneClickCallback(y));
    } else{
      this.feedbackMessage="Sorry, you need to fill all fields."
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    }
  }
  //after service submit successed, this will be called 
  doneClickCallback(y){
    this.eduAddStatus[y.index]=false;
    if (y.index <2){
      this.addAnotherEdu = true;
    }
    this.eduLinks(Object.values(this.educationInfo));    
  }
  
  // set the education form data (display data in Web page & save data sent to server)
  setData(index){
    let eduInput={edu:'',edu_date:'',edu_detail:''};            // save education iuput value
    console.log('before: ', this.eduForms);    


    eduInput.edu = this.eduForms[index].value.edu;
    eduInput.edu_date = this.eduForms[index].value.sYear +'-'+ this.eduForms[index].value.eYear;
    eduInput.edu_detail = this.eduForms[index].value.eDetail;

    console.log('after: ', eduInput);
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
      let title , detail , year;
      let eduBackground = this.tutorCV.eduBackground.slice();
      console.log(eduBackground);      
      eduBackground = this.delEduBackgroundArr(eduBackground,x);
      console.log(eduBackground);
      console.log('before: ', this.tProfile);
      //change the data in educationInfo and tProfile
      for (let i  = 0 ;i<eduBackground.length;i++){
        title = 'edu_' + (i+1);
        detail = 'edu_' + (i+1) + '_detail';
        year = 'edu_' + (i+1) + '_date';   
        this.educationInfo[title]=eduBackground[i].edu;
        this.educationInfo[detail]=eduBackground[i].edu_detail;
        this.educationInfo[year]=eduBackground[i].edu_date;        

        if (eduBackground[i].edu ===null){
          this.tProfile[title]='';
          this.tProfile[detail]='';
          this.tProfile[year]='';        
        }else{
          this.tProfile[title]=eduBackground[i].edu;
          this.tProfile[detail]=eduBackground[i].edu_detail;
          this.tProfile[year]=eduBackground[i].edu_date;        
        }
      }
      console.log('After: ', this.tProfile);

    this.submitInfo(process=>this.dlEduCallback(x));
  }
  delEduBackgroundArr(eduArr,index){
    console.log(index);
    console.log(eduArr[index].edu);    
    eduArr=eduArr.
    filter(e=>e!=eduArr[index]||
      e.edu_date!=eduArr[index].edu_date||
      e.edu_detail!=eduArr[index].edu_detail).
    filter(e=>e.edu!=null&&e.edu_date!=null&&e.edu_detail!=null);
      
    console.log(eduArr);
    //because of deleted a row and add a null row
    for (let i=0;i<3;i++)
      eduArr.push({edu:null, edu_date:null, edu_detail:null});
    return eduArr.slice(0 ,3);
  }
  dlEduCallback(index){
   // delete education info of web page display
  //if delete a row in the middle,need reform the row of this.tutorCV.eduBackground
   //remove the row been delete
   this.tutorCV.eduBackground = this.delEduBackgroundArr(this.tutorCV.eduBackground,index);
   this.tutorCV.eduBackground.forEach((item,ind)=>{this.prefillForm(ind)});
    // when delete any education form, check education add links show
   this.eduLinks(Object.values(this.educationInfo));

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
    let newWorkValue = [];
    console.log('workValue: ', workValue);
    // for (let i=0; i<workValue.length; i++){
    //   if (workValue[i] != null){ valueCounter += 1; }
    // }
    while(workValue.length)  //1D to 2D 
      newWorkValue.push(workValue.splice(0,3));
    //get number of the array
    valueCounter=newWorkValue.
          filter(element=>element[0]!=null||
            element[1]!=null||element[2]!=null).length;

    console.log('workValCounter: ', valueCounter);
    if (valueCounter > 0&&valueCounter < 3){
      this.addNewWork = false;
      this.addAnotherWork = true;
    } else if (valueCounter >= 3){
      this.addNewWork = false;
      this.addAnotherWork = false;
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

    try {//if no '-' then set to '';
      let yearRange = workValue.work_date.split('-');
      this.workForms[index].controls['sYear'].setValue(yearRange[0].toString());
      this.workForms[index].controls['eYear'].setValue(yearRange[1].toString());
      this.workForms[index].controls['work'].setValue(workValue.work);
      this.workForms[index].controls['wDetail'].setValue(workValue.work_detail);
      this.workForms[index].updateValueAndValidity();      
    }
    catch{
      this.workForms[index].controls['sYear'].setValue('');
      this.workForms[index].controls['eYear'].setValue('');
      this.workForms[index].controls['work'].setValue('');
      this.workForms[index].controls['wDetail'].setValue('');
    }
    console.log('workForms',this.workForms);    
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
      this.setWorkData(y.index);
      this.submitInfo(process=>this.doneWorkClickCallback(y));
    } else{
      this.feedbackMessage="Sorry, you need to fill all fields."
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    }
  }

  //after service submit successed, this will be called 
  doneWorkClickCallback(y){
    this.workAddStatus[y.index]=false;
    if (y.index <2){
      this.addAnotherWork = true;
    }
    this.workLinks(Object.values(this.workInfo));    
  }

  // set the work form data (display data in Web page & save data sent to server)
  setWorkData(index){
    let workInput={work:'',work_date:'',work_detail:''};            // save work iuput value
    workInput.work = this.workForms[index].value.work;
    workInput.work_date = this.workForms[index].value.sYear +'-'+ this.workForms[index].value.eYear;
    workInput.work_detail = this.workForms[index].value.wDetail;

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
    let title , detail , year;
    let workExp = this.tutorCV.workExp.slice();
    workExp = this.delWorkExpeArr(workExp,x);
    console.log('workExp: ', workExp);    
    console.log('before: ', this.tProfile);
    //change the data in educationInfo and tProfile
    for (let i  = 0 ;i<workExp.length;i++){
      title = 'work_' + (i+1);
      detail = 'work_' + (i+1) + '_detail';
      year = 'work_' + (i+1) + '_date';   
      this.workInfo[title]=workExp[i].work;
      this.workInfo[detail]=workExp[i].work_detail;
      this.workInfo[year]=workExp[i].work_date;        

      if (workExp[i].work ===null){
        this.tProfile[title]='';
        this.tProfile[detail]='';
        this.tProfile[year]='';        
      }else{
        this.tProfile[title]=workExp[i].work;
        this.tProfile[detail]=workExp[i].work_detail;
        this.tProfile[year]=workExp[i].work_date;        
      }
    }
    console.log('After: ', this.tProfile);
    this.submitInfo(process=>this.dlWorkExpeCallback(x));
  }
  delWorkExpeArr(arr,index){
    console.log(index);
    console.log(arr[index].edu);    
    arr=arr.
    filter(e=>e.work!=arr[index].work||
      e.work_date!=arr[index].work_date||
      e.work_detail!=arr[index].work_detail).
    filter(e=>e.work!=null&&e.work_date!=null&&e.work_detail!=null);
      
    console.log(arr);
    //because of deleted a row and add a null row
    for (let i=0;i<3;i++)
        arr.push({work:null, work_date:null, work_detail:null});
    return arr.slice(0 ,3);
  }
  dlWorkExpeCallback(x){
    this.tutorCV.workExp =  this.delWorkExpeArr(this.tutorCV.workExp,x);
    this.tutorCV.workExp.forEach((item,ind)=>{this.prefillWorkForm(ind)});    
    // when delete any work form, check work add links show
    this.workLinks(Object.values(this.workInfo));
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
    let valueCounter = 0,newHobbyValue = [];
    while(hobbyValue.length)  //1D to 2D 
    newHobbyValue.push(hobbyValue.splice(0,2));
    //get number of the array
    valueCounter=newHobbyValue.filter(
        element=>element[0]!=null||element[1]!=null).length;

    console.log('hobbyValue length: ', hobbyValue.length);
  
    console.log('hobbyValCounter: ', valueCounter);
    if (valueCounter > 0 &&valueCounter <2){
      this.addNewHobby = false;
      this.addAnotherHobby = true;
    }
    else if(valueCounter >=2){
      this.addNewHobby = false;
      this.addAnotherHobby = false;
    }
    else {
      this.addNewHobby = true;
      this.addAnotherHobby = false;
    }
  }

  // Prefill hobby and interest values in form inputs
  prefillHobbyForm($event){
    let index = $event;
    let hobbyValue = this.tutorCV.hobbyInt[index];
    console.log(this.tutorCV.hobbyInt);
    if (hobbyValue.hobby!=null){
      this.hobbyForms[index].controls['hobby'].setValue(hobbyValue.hobby);
      this.hobbyForms[index].controls['hDetail'].setValue(hobbyValue.hobby_detail);
      this.hobbyForms[index].updateValueAndValidity();
    }else{
      this.hobbyForms[index].controls['hobby'].setValue('');
      this.hobbyForms[index].controls['hDetail'].setValue('');
    }

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
      // this.feedbackMessage="Your hobby and interest have been edited."
      // this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
      this.setHobbyData(y.index);      
      this.submitInfo(process=>this.doneHobbyClickCallback(y));      
    } else{
      this.feedbackMessage="Sorry, you need to fill all fields."
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    }
  }
  //after service submit successed, this will be called 
  doneHobbyClickCallback(y){
    this.hobbyAddStatus[y.index]=false;
    if (y.index <2){
      this.addAnotherHobby = true;
    }
    this.hobbyLinks(Object.values(this.hobbyInfo));    
}

  // set the hobby form data (display data in Web page & save data sent to server)
  setHobbyData(index){
    let hobbyInput={hobby:'',hobby_detail:''};            // save hobby iuput value
    hobbyInput.hobby = this.hobbyForms[index].value.hobby;
    hobbyInput.hobby_detail = this.hobbyForms[index].value.hDetail;

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
    // this.feedbackMessage = '';
    // this.feedbackMessage = 'Your hobby and interest details has been deleted but not save yet.';
    // this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
    // delete hobby info of web page display
    let title , detail ;
    let hobbyInt = this.tutorCV.hobbyInt.slice();
    hobbyInt = this.dlHobbyIntArr(hobbyInt,x);
    //
    for (let i  = 0 ;i<hobbyInt.length;i++){
      title = 'hobby_' + (i+1);
      detail = 'hobby_' + (i+1) + '_detail';

      this.hobbyInfo[title]=hobbyInt[i].hobby;
      this.hobbyInfo[detail]=hobbyInt[i].hobby_detail;

      if (hobbyInt[i].hobby ===null){
        this.tProfile[title]='';
        this.tProfile[detail]='';
      }else{
        this.tProfile[title]=hobbyInt[i].hobby;
        this.tProfile[detail]=hobbyInt[i].hobby_detail;
      }
    }
    console.log('After: ', this.tProfile);    
    this.submitInfo(process=>this.dlHobbyIntCallback(x));
  } 
  dlHobbyIntArr(arr,index){
    console.log(index);
    console.log(arr[index].edu);    
    arr=arr.
    filter(e=>e.hobby!=arr[index].hobby||
      e.hobby_detail!=arr[index].hobby_detail).
    filter(e=>e.hobby!=null&&e.hobby_detail!=null);
      
    console.log(arr);
    //because of deleted a row and add a null row
    for (let i=0;i<2;i++)
        arr.push({hobby:null, hobby_detail:null});
    return arr.slice(0 ,2);
  } 
  dlHobbyIntCallback(x){
    this.tutorCV.hobbyInt =  this.dlHobbyIntArr(this.tutorCV.hobbyInt,x);
    this.tutorCV.hobbyInt.forEach((item,ind)=>{this.prefillHobbyForm(ind)}); 
    this.hobbyLinks(Object.values(this.hobbyInfo));     
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
      //this.feedbackMessage = 'Your favorite quote details have been changed but not save yet.';
      //this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
      //return this[x.status]=false;
      this.submitInfo(process=>this.favoriteQuoteDataCallback(this));      
    }else{
      console.log('not valid', this.Profile);
      this.feedbackMessage = 'Sorry, something went wrong.';
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    }
  }
  //after service submit successed, this will be called ?
  favoriteQuoteDataCallback(x){
    this[x.status]=false;
    this.qStatus=false
}
  // Prefill quote values in form inputs
  prefillQuoteForm(){
    this.quoteForm.controls['quote'].setValue(this.tProfile.quote);
    this.quoteForm.controls['qAuthor'].setValue(this.tProfile.quote_author);
    this.quoteForm.updateValueAndValidity();
  }  

  // delete favoriteQuote data when user delete it
  dlFavQuote(x) {

    // this.feedbackMessage = '';
    // this.feedbackMessage = 'Your favorite quote details has been deleted but not save yet.';
    // this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
    this.Profile[x.des]=' ';
    this.Profile[x.title]=' ';
    this.tProfile[x.title]='';
    this.tProfile[x.des]='';
    console.log('half',this.Profile);    
    this.submitInfo(process=>this.dlFavQuoteCallback(x));
  }

  dlFavQuoteCallback(x){
    
  }

  // ----------------------------------------------- Button group -----------------------------------------------------
  submitInfo(callback){
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
        if (callback!=null) callback();
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
//has been canceled
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
