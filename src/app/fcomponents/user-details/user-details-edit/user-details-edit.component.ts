import { Component, OnInit ,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NewTutorService } from '../../../services/servercalls/new-tutor.service';
import { AuthService } from '../../../services/security/auth.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl} from '@angular/forms';
import { UserService } from '../../../services/servercalls/user.service';
import { MatInputModule, MatTableModule, MatPaginatorModule, MatSortModule } from '@angular/material';
//import { SideHelperService } from '../../../services/helpers/side-helper.service';
import * as moment from 'moment';


@Component({
  selector: 'app-user-details-edit',
  templateUrl: './user-details-edit.component.html',
  styleUrls: ['./user-details-edit.component.css']
})
export class UserDetailsEditComponent implements OnInit {

  error:string;
  minDOB = new Date(1929, 0, 1);
  maxDOB = new Date(2020, 0, 1);
  DatePopUp: any;
  appForm: FormGroup;
  formData = new FormData();
  userInfo: any;
  errorMessage: string;
  locations: string[] = ['Auckland Central', 'Auckland North', 'Auckland West', 'Auckland South', 'Auckland East', 'Christchurch', 'Dunedin', 'Hamilton', 'Tauranga', 'Wellington Central', 'Hutt Valley', 'Porirua', 'Kapiti Coast'];
  disciplines: string[] = ['Math', 'Physics', 'Chemistry', 'Biology', 'Science', 'Geography', 'Social Studies', 'Information System', 'Accounting', 'Economics', 'Finance', 'English', 'Maori', 'French', 'German', 'Spanish', 'Chinese', 'Japanese'];
  curriculums: string[] = ['(NCEA) National Certificates of Educational Achievement', '(CIE) Cambridge', '(IB) International Baccalaureate'];
  emailVerifyStatus = false;
  userUpdate={
    first_name:'',last_name:'',
    phone_num_pri:'',location:'',DOB:null
  }

  constructor(
    private userService: UserService,
    private NewTutorService: NewTutorService,
    private router: Router,
    private elem: ElementRef,
    private formBuilder: FormBuilder,    
  ) { 
  }

  ngOnInit() {
    let now = moment();
    this.formData = new FormData();
    this.createForm();
    this.getUserInfo()    
  }
  getUserInfo() {
    this.userService.showUserInfo().subscribe(
      (res) => {
        console.log(res);
        if (res['userKey'].verified === 1) {
          this.emailVerifyStatus = true;
        } else {
          this.emailVerifyStatus = false;
        }
        this.userInfo = Object.assign(res['userInfo'], res['userKey'])
        this.setFormValuesTo(this.userInfo)
      },
      (error) => { this.errorMessage = "Sorry, we can't get to your information at this time." }
    )
  }
  createForm() {
    this.appForm = this.formBuilder.group({
      first_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[a-zA-Z\s]*$')]],
      last_name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30), Validators.pattern('^[a-zA-Z\s]*$')]],
      phone_num_pri: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(12), Validators.pattern('^[0-9]*$')]],
      location: ['', Validators.required],
      DOB: ['', [Validators.required]]}
    )
  }


  setFormValuesTo(userInfoData) {
    this.appForm.controls['first_name'].setValue(userInfoData.first_name);
    this.appForm.controls['last_name'].setValue(userInfoData.last_name);
    this.appForm.controls['phone_num_pri'].setValue(userInfoData.phone_num_pri);
    this.appForm.controls['location'].setValue(userInfoData.location);
    this.appForm.controls['DOB'].setValue(userInfoData.DOB);
    this.appForm.updateValueAndValidity();
  }

  dateRange(AC: FormControl) {
    if (AC.value) {
      let year = AC.value.year();
      //parseInt(moment(AC.value.toString()).format('YYYY'));
      if (year < 1930) return { mindob: {} }
      if (year > 2019) return { maxdob: {} }
      return null;
    }
  }

  yearRange(AC: FormControl) {
    if (AC.value) {
      let year = parseInt(AC.value);
      if (year < 1950) return { min: {} }
      if (year > 2019) return { max: {} }
      return null;
    }
  }

  dateCompare(AC: AbstractControl) {
    let startYear = parseInt(AC.get('work_start').value);
    let endYear = parseInt(AC.get('work_end').value);
    return (startYear > endYear) ? { not: {} } : null
  }


  onSubmit() {
    this.onSubmitCheckValid()
  }
  onSubmitCheckValid() {
    if (this.appForm.invalid) {
      console.warn(this.appForm.invalid)
      this.errorMessage = 'Not all required fields are filled';
    } else {
      console.log(this.appForm.value);
      this.transferDataToBack();
    }
  }
  transferDataToBack() {
    this.userUpdate.first_name=this.appForm.value['first_name'];
    this.userUpdate.last_name=this.appForm.value['last_name'];
    this.userUpdate.phone_num_pri=this.appForm.value['phone_num_pri'];
    this.userUpdate.location=this.appForm.value['location'];
    this.userUpdate.DOB=this.appForm.value['DOB'];
    this.userService.updateUserInfo(this.userUpdate).subscribe(
      (res) => {console.log(res)
        // this.localStorage.setItem('lsaWho', res['dataCon'].xUr);
        // this.router.navigate(['/app/apply/manager']);
         //window.location.reload();
         this.getUserInfo();
      },
      (err) => {
        console.log(err),
        // this.errorMessage = 'Sorry, Something went wrong. '+ err['error'].error;
        this.errorMessage = 'Sorry, Something went wrong. ';
      }
    )
  }

}
