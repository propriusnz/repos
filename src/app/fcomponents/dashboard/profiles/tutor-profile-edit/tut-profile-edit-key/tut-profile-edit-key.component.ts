import { WINDOW } from '@ng-toolkit/universal';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl, FormBuilder, FormControlName } from '@angular/forms';
import { TutorService } from '../../../../../services/servercalls/tutor.service';
import { ImageEditorDialogComponent } from '../../../../support/image-editor-dialog/image-editor-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { environment } from '../../../../../../environments/environment.prod';
import { SideHelperService } from '../../../../../services/helpers/side-helper.service';
import { CommonSupportService } from '../../../../../services/support/common-support.service';
import { UserService} from '../../../../../services/servercalls/user.service';
import { ProfileHelperService} from '../../../../../services/helpers/profile-helper.service';
import { AlertNotificationService } from '../../../../../services/support/alert-notification.service';

@Component({
  selector: 'app-tut-profile-edit-key',
  templateUrl: './tut-profile-edit-key.component.html',
  styleUrls: ['./tut-profile-edit-key.component.css']
})
export class TutProfileEditKeyComponent implements OnInit {
  // profile Img stuff
  dialogRef: MatDialogRef<ImageEditorDialogComponent>;
  profile_photo: string;
  baseImgUrl = environment.baseImgUrl+'/tutorimg/';
  // video stuff
  videoLinkForm: FormGroup;
  tutorVideo={profile_video: '', _method:'put'};    //for tutorVideo sent to server
  videoLink: SafeResourceUrl;
  linkValid = false;
  videoLinkInput = false;
  // Location stuff
  locations:any;
  LocationForm0: FormGroup;
  LocationForm1: FormGroup;
  LocationForm2: FormGroup;
  LocationForm3: FormGroup;
  locationForms=[];
  locationDataSent={teaching_locations:[], _method: 'put'};
  locationStatus=[false,false,false,false];      // locationForm status
  addNewLink = false;           // check 'Add the first address' Link shown 
  addAnotherLink = false;       // check 'Add another' Link shown
  // Introduction state stuff
  stateForm: FormGroup;
  stStatus=false;

  // Total tutor profile info
  tutorData:any;
  tutor={                          // display info in web page
    profile_photo:'',
    intro_statement:'',
    teaching_locations:[
      {city:'',suburb:'',street:'',number:''},
      {city:'',suburb:'',street:'',number:''},
      {city:'',suburb:'',street:'',number:''},
      {city:'',suburb:'',street:'',number:''}
    ]}
  formData=new FormData();
  Profile={teaching_locations:[], intro_statement:'',  _method:''}; // sent combination data of Locations and Introduction Statement to server
  public_status = false;                         // check tutorProfile is public or not
  tutorPublish={publish: 0, _method:'put'}       //for tutorPublish status sent to server

  // Alert-notification stuff
  loFeedback: string;         // feedback of location forms
  feedbackMessage: string;
  alertCounter = 0;

  constructor(
    @Inject(WINDOW) private window: Window, 
    private elem: ElementRef,
    private builder: FormBuilder,
    private tutorService: TutorService,
    private sideHelperService: SideHelperService,
    private dialog: MatDialog,
    private commonSupport: CommonSupportService,
    private userService: UserService,
    private helperService: ProfileHelperService,
    private alertservice: AlertNotificationService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.form();
    this.getTutorData();
  }

  getTutorData(){
    this.tutorService.showTutorProfile().subscribe(
      (res) => {
        console.log(res);
        this.tutorData = res;
        // get 'profile_video' from 'tutorInfo' data
        if(this.tutorData.tutorInfo.profile_video){
          this.linkValid = true;
          this.videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.tutorData.tutorInfo.profile_video);
        }
        // get 'publish' from 'tutorInfo' data and set publish switch button style
        this.tutorPublish.publish = this.tutorData.tutorInfo.publish;
        console.log('publish status: ', this.tutorPublish.publish);
        if (this.tutorPublish.publish == 0){
          this.public_status = false;
          $('.round').addClass('slider');
          $('.round').removeClass('slider2');
        } else {
          this.public_status = true;
          $('.round').addClass('slider2');
          $('.round').removeClass('slider');
        }
        this.setFormValues(res);
      },
      (error) => {
        console.log(error);
        this.feedbackMessage="Sorry, but we can't get your data at this time. Please try again"; 
        this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-center-center', 8000);
      }
    )
  }

  // define the reactive form
  form(){
    this.stateForm = this.builder.group({state : ['', [Validators.minLength(20), Validators.maxLength(3000)], ] });
    this.LocationForm0 = this.builder.group({
      city:['',[Validators.required,Validators.minLength(3)]],
      suburb:['',[Validators.required,Validators.minLength(3)]],
      street:['',[Validators.required,Validators.minLength(3)]],
      number:['',[Validators.required,Validators.minLength(1)]]
    });
    this.LocationForm1 = this.builder.group({
      city:['',[Validators.required,Validators.minLength(3)]],
      suburb:['',[Validators.required,Validators.minLength(3)]],
      street:['',[Validators.required,Validators.minLength(3)]],
      number:['',[Validators.required,Validators.minLength(1)]]
    });
    this.LocationForm2 = this.builder.group({
      city:['',[Validators.required,Validators.minLength(3)]],
      suburb:['',[Validators.required,Validators.minLength(3)]],
      street:['',[Validators.required,Validators.minLength(3)]],
      number:['',[Validators.required,Validators.minLength(1)]]
    });
    this.LocationForm3 = this.builder.group({
      city:['',[Validators.required,Validators.minLength(3)]],
      suburb:['',[Validators.required,Validators.minLength(3)]],
      street:['',[Validators.required,Validators.minLength(3)]],
      number:['',[Validators.required,Validators.minLength(1)]]
    });
    this.locationForms.push(this.LocationForm0,this.LocationForm1,this.LocationForm2,this.LocationForm3);
    console.log(this.locationForms[3]);
    
    this.videoLinkForm = this.builder.group({
      link:['', [Validators.required,Validators.minLength(15)]]
    })
  }

  // display web page by formValue
  setFormValues(data){
    this.tutor.profile_photo=this.commonSupport.findUserImg(data['tutorInfo'].tutor_id);
    this.tutor.intro_statement=data['tutorInfo'].intro_statement;
    this.locations=data['tutorProfile'].teaching_locations;

    console.log(this.locations);
    // display location info in web page
    if(this.locations){
      for(let i=0; i<this.locations.length; i++){
        let lo=this.tutor.teaching_locations[i];
        if (this.locations[i]){
          let temp=this.locations[i].split(',');
          if(temp[0]){lo.number=temp[0]};
          if(temp[1]){lo.street=temp[1]};
          if(temp[2]){lo.suburb=temp[2]};
          if(temp[3]){lo.city=temp[3]};
        }
      }
    }
    console.log(this.tutor.teaching_locations);
    this.locationLinks(this.locations);
    this.form();
    console.log(this.tutor);
    if(!this.tutor.profile_photo){ this.profile_photo = "../../../../assets/default_pics/default-cp.jpg"; }
    else{ this.profile_photo = this.commonSupport.prepareUserImage(this.tutor.profile_photo); }
  }

  // ----------------------------------------------- Profile image -----------------------------------------------------
  imageEditorDia() {
    let dialogRef = this.dialog.open(ImageEditorDialogComponent,
      {
        panelClass: 'dialog1',
        data: [1 / 1, this.profile_photo],
      });
    dialogRef.afterClosed().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.profile_photo = res;
          this.helperService.userImage.next(res);
          this.submitImage(res);
        }
      },
      (err) => {
        console.warn(err);
        this.feedbackMessage = 'Sorry, something went wrong. Please try again';
        this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
      }
    );
  }

  submitImage(imageString){
    console.log(imageString);
    if(imageString){
      fetch(imageString).then(
        (res)=>res.blob()).then(
          (blob)=> {
            this.formData.append('image', blob, 'a.jpeg');
            // this.formData.append('_method', 'put');
            this.sendToBackEnd(this.formData);
          }
        )
    }
    else{this.feedbackMessage = "Sorry, but something went wrong. "}
  }

  // profile img data sent to server
  sendToBackEnd(data) {
    this.userService.updateUserPhoto(data).subscribe(
      (res) => {
        console.log(res);
        this.feedbackMessage = 'Your profile image has been edited and saved';
        this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
      },
      (err) => {
        console.log(err);
        this.feedbackMessage = 'Sorry, something went wrong. Please try again';
        this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 5000);        
      }
    )
  }

  // ----------------------------------------------- Profile video -----------------------------------------------------
  addVideoLink(){
    console.log('video link!!!!');
    console.log(this.videoLinkForm.value.link);
    let linkFormat: any;
    if(this.videoLinkForm.value.link){
      this.linkValid = true;
      // change video link format from <ifram>... to 'https:...' 
      try {
        linkFormat = this.videoLinkForm.value.link;
        linkFormat = linkFormat.split(' ')[3].split('src=');
        linkFormat = linkFormat[1].toString().replace(/^"(.*)"$/, '$1');
        console.log('linkForm: ', linkFormat);
        this.videoLink = this.sanitizer.bypassSecurityTrustResourceUrl(linkFormat);
        this.tutorVideo.profile_video = linkFormat.toString();
      }
      catch(err) {
        this.feedbackMessage = 'Sorry, wrong video Link format, please check!';
        this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
        return
      }
    }
    this.feedbackMessage = '';
    this.tutorService.updateTutorProfile(this.tutorVideo).subscribe(
      (res) => {
        console.log(res);
        this.feedbackMessage = 'Your profile video has been added and saved';
        this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
      },
      (err) => {
        console.log(err);
        this.feedbackMessage = 'Sorry, something went wrong. Please try again';
        this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
      }
    )
  }
  
  // ----------------------------------------------- Teaching locations-----------------------------------------------------
  // check location form's Links ('Add the first address' or 'Add another')
  locationLinks(locationValue){
    let valueCounter = 0;
    console.log(locationValue)
    if(!locationValue){
      valueCounter=0;
    }else{
      for (let i=0; i<locationValue.length; i++){
        if (locationValue[i] != null){valueCounter += 1; }
      }
    }
  
    if (valueCounter > 0){
      this.addNewLink = false;
      this.addAnotherLink = true;
    } else {
      this.addNewLink = true;
      this.addAnotherLink = false;
    }
  }

  // change the location forms' status when 'add another' location form
  loStatus(){
    let locate= this.tutor.teaching_locations;
    for(let i=0; i<locate.length-1; i++){
      if(locate[i].city!=='' && locate[i+1].city===''){
        return this.locationStatus[i+1]=true;
      }
    }
  }

  // Prefill location values in form
  prefillForm($event){
    let index = $event;
    let locationValue = this.tutor.teaching_locations[index];
    console.log(locationValue);
    this.locationForms[index].controls['suburb'].setValue(locationValue.suburb);
    this.locationForms[index].controls['street'].setValue(locationValue.street);
    this.locationForms[index].controls['number'].setValue(locationValue.number);
    this.locationForms[index].controls['city'].setValue(locationValue.city);
  }
  // Prefill introduction values in form
  prefillIntroForm($event){
    console.log(this.stateForm);
    this.stateForm.controls['state'].setValue( this.tutor.intro_statement); 
    console.log(this.stateForm);    
  }
  // set the location form data (display data in Web page & save data sent to server)
  setData(index){
    this.tutor.teaching_locations[index]=this.locationForms[index].value;
    this.locationDataSent.teaching_locations=this.tutor.teaching_locations
            .filter(x=>x.city!='')
            .map(x=>x.number+','+x.street+','+x.suburb+','+x.city);

    this.tutorData.tutorProfile.teaching_locations=this.locationDataSent.teaching_locations;

    console.log(this.tutor.teaching_locations);
    console.log(this.locationDataSent.teaching_locations);
  }

  submitLocations(y){
    console.log(y.name);
    if(y.name.valid){
      this.setData(y.index);
      this.submitInfo(process=>this.callbackloc(y));
    } else{
      this.loFeedback="Sorry, you need to fill all fields."
      this.ariseAlert(this.loFeedback, 'ERROR', 'toast-top-right', 1500);
    }
  }
  callbackloc(y){
    this.addNewLink = false;
    this.addAnotherLink = true;
    this.locationStatus[y.index]=false;
  }
  // delete Location details 
  DeleteForm(index){
    console.log(this.locationForms[index].value);
    // delete location info of data sent to server
    console.log(this.tutorData.tutorProfile.teaching_locations);
    this.tutorData.tutorProfile.teaching_locations.splice(index,1);
    //this.tutorData.tutorProfile.teaching_locations.push(null);
    console.log(this.tutorData.tutorProfile.teaching_locations);
    this.submitInfo(process=>this.callbackDel(index));

  }
  callbackDel(index){
    // delete location form of web page display
    //console.log(this.tutor.teaching_locations);
    this.tutor.teaching_locations.splice(index,1);
    //this.tutor.teaching_locations.push({city:'',suburb:'',street:'',number:''});
    this.tutor.teaching_locations.filter(x=>x.city!=null||x.suburb!=null||x.street!=null||x.number!=null);
    console.log(this.tutor.teaching_locations);    
    //keep the form data same as the object varible 
    this.tutor.teaching_locations.forEach((item,ind)=>{this.prefillForm(ind)});
    // when delete any location form, check location links show
    this.locationLinks(this.tutorData.tutorProfile.teaching_locations);
  }
  // ----------------------------------------------- Introduction statement -----------------------------------------------------
  // check if introduction statement is valid
  defState() {
    if (this.stateForm.valid && this.stateForm.dirty){
      //this.feedbackMessage = '';
      this.Profile.intro_statement = this.stateForm.value.state;
      this.tutor.intro_statement = this.stateForm.value.state;
      this.Profile._method = 'put';
      console.log(this.Profile);
      //this.feedbackMessage="Your introduction statement has been edited."
      //this.ariseAlert(this.feedbackMessage, 'INFO', 'toast-top-right', 1500);
      this.submitInfo(this.defStateCallback());
    } else{
      this.feedbackMessage='Content is invalid';
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    }
  }
  defStateCallback(){
    this.stStatus=false;
  }
  DeleteIntroForm(){
    this.Profile.intro_statement = '';
    this.tutor.intro_statement = '';
    this.tutorData.tutorInfo.intro_statement = '';
    this.submitInfo(this.delIntroCallBack());
  }
  delIntroCallBack(){
    this.Profile.intro_statement = '';
    this.tutor.intro_statement = '';
    this.tutorData.tutorInfo.intro_statement = '';    
  }
  // ----------------------------------------------- Button group -----------------------------------------------------
  // Save all changes button
  submitInfo(fun){
    console.log(this.tutorData.tutorProfile);
    // If any form changes, then save the updated one. If no changes happened, then save the previous value again.
    if (this.locationDataSent.teaching_locations.length !== 0){ this.Profile.teaching_locations = this.locationDataSent.teaching_locations; } 
    else{ this.Profile.teaching_locations = this.tutorData.tutorProfile.teaching_locations; }
    if (this.stateForm.value.state !== ''){ this.Profile.intro_statement = this.stateForm.value.state; } 
    else{ this.Profile.intro_statement = this.tutorData.tutorInfo.intro_statement; }
    this.Profile._method='put';
    console.log(this.Profile);
    this.feedbackMessage = '';
    this.tutorService.updateTutorProfile(this.Profile).subscribe(
      (res) => {
        console.log(res);
        //callback function for changing display
        if (fun!=null)  fun();
        this.feedbackMessage = 'Your all changes have been saved.';
        this.ariseAlert(this.feedbackMessage, 'SUCCESS', 'toast-top-right', 2000);
      },
      (err) => { 
        console.log(err);
        this.feedbackMessage = 'Sorry, something went wrong.';
        this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 5000);
      }
    )
  }

  // reset all changes (only valid when any changes made)
  cancelInfo(){
    this.feedbackMessage = '';
    if(this.alertCounter <= 0){
      this.feedbackMessage = 'Sorry, you haven\'t updated or saved any changes.';
      this.alertCounter -= 1;
      this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
    } else{
      this.window.location.reload();
    }
  }

  // switch profile public status
  publishProfile(){
    console.log(this.tutorPublish.publish);
    this.feedbackMessage = '';
    // publish tutorProfile
    if (this.tutorPublish.publish == 0){
      console.log('tutorProfile publishStauts is 0!');
      this.public_status = false;
      if (confirm('Are you sure you want to publish your tutor profile?')) {
        this.tutorPublish.publish = 1;
        this.tutorService.updateTutorProfile(this.tutorPublish).subscribe(
          (res) => {
            console.log(res);
            $('.slider').css({'background-color':'#2196F3'});
            $('.slider').toggleClass('changed');
            this.feedbackMessage="Your tutorProfile is published."
            this.ariseAlert(this.feedbackMessage, 'SUCCESS', 'toast-top-right', 1500);
          },
          (err) => {
            console.log(err);
            this.feedbackMessage="Sorry, something went wrong. Please try again."
            this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
          }
        );
      } else { console.log('chosed no, do nothing.'); }
    } else{     // private tutorProfile
      console.log('tutorProfile publishStauts is 1!');
      this.public_status = true;
      if (confirm('Are you sure you want to privatize your tutor profile?')) {
        this.tutorPublish.publish = 0;
        this.tutorService.updateTutorProfile(this.tutorPublish).subscribe(
          (res) => {
            console.log(res);
            $('.slider').css({'background-color':'#ccc'});
            $('.slider').toggleClass('changed');
            this.feedbackMessage="Your tutorProfile is privatized."
            this.ariseAlert(this.feedbackMessage, 'SUCCESS', 'toast-top-right', 1500);
          },
          (err) => {
            console.log(err);
            this.feedbackMessage="Sorry, something went wrong. Please try again."
            this.ariseAlert(this.feedbackMessage, 'ERROR', 'toast-top-right', 1500);
          }
        );
      } else { console.log('chosed no, do nothing.'); }
    }
  }

  ariseAlert(message, messageType, position, duration) {
    this.alertCounter += 1;
    console.log('alertCounter: ', this.alertCounter);
    this.alertservice.sendAlert(message, messageType, position, duration);
  }

  mouseEnter(m) {
    this.sideHelperService.sendMessage(m);
  }
}
