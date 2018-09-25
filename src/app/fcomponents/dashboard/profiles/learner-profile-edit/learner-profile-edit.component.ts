import { Component, OnInit } from '@angular/core';
import { LearnerService } from '../../../../services/servercalls/learner.service'
import { UserService } from '../../../../services/servercalls/user.service'

import { Router, ActivatedRoute } from '@angular/router';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators, AbstractControl, NgControl } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-learner-profile-edit',
  templateUrl: './learner-profile-edit.component.html',
  styleUrls: ['./learner-profile-edit.component.css']
})
export class LearnerProfileEditComponent implements OnInit {
  private profiles: any;
  private isParent = false;
  public isEdit = false;
  private addALearner = false;
  private hasProfile = false;  
  private multiProfile=false;  //for invisible is parent checkbox

  learnersForm: FormGroup;
  submitted = false;
  errorMessage: string;
  minDOB = new Date(1929, 0, 1);
  maxDOB = new Date(2020, 0, 1);
  learnerInfo: any;
  learnerID: any;
  curriculum_list: string[] = ['(NCEA) National Certificates of Educational', '(CIE) Cambridge', '(IB) International Baccalaureate'];
  subject_list: string[] = ['Math', 'Physics', 'Chemistry', 'Biology', 'Science', 'Geography', 'Social Studies', 'Information System', 'Accounting', 'Economics', 'Finance', 'English', 'Maori', 'French', 'German', 'Spanish', 'Chinese', 'Japanese'];
  grade_list: string[] = ['7', '8', '9', '10', '11', '12', '13'];
  userBasic:any;
  userSecondary:any;

  learnerProfile: any;




  constructor(
    private learnerService: LearnerService,
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
  ) { }

  onSubmit() {
    //console.log(this.learnersForm.value);

    if (this.learnersForm.value.learner_DOB != "") {
      let transferDOB = moment(this.learnersForm.value.learner_DOB).format().substr(0, 10);
      this.learnersForm.controls['learner_DOB'].setValue(transferDOB);
    } else {
      delete this.learnersForm.value.learner_DOB
      //this.learnersForm.controls['learner_DOB'].setValue(null);
    }

    let formData = this.learnersForm.value;
    //if (this.isParent ===true)
    if (formData.learner_first_name != "" && formData.learner_last_name != "" && formData.grade != "" && formData.subject != "") {
      if (this.submitted == false) {
        if (this.addALearner) {
          this.storeLearnerData(formData);
        } else {
           this.updateLearnerData(this.learnerID, formData);

        }
      }
    }
  }

  cencel() {
    this.isEdit = false;
    this.submitted = false;
    this.addALearner = false;
    this.ngOnInit();
  }

  ngOnInit() {
    
    this.createForm();

    this.userService.showUserInfo().subscribe(
      (res)=>{
        this.userBasic=res['dataCon']['userBasic'];  
        this.userSecondary=res['dataCon']['userSecondary'];   
        if (this.userSecondary.user_type===1) this.isParent=true;             
        console.log(res)
      },
      (error)=>{console.log(error)}
    );

    this.learnerService.indexLearnerProfile().subscribe(
      (res) => {
        this.profiles = res['dataCon']['learnerProfile'];
        console.log(res)
        if (this.profiles.length > 0) {
          this.hasProfile = true;
        }
        if (this.profiles.length > 1) {
          this.multiProfile = true;
        }
        
      },
      (error) => { console.log(error) }

    );


  }

  storeLearnerData(data) {
    this.learnerService.storeLearnerProfile(data).subscribe((res) => {
      console.log(res);
      this.submitted = true;  
      this.hasProfile = true;
    }, (err) => {
      console.log(err);
    });
  }

  updateLearnerData(id, data) {
    //console.log(data);
    this.learnerService.updateLearnerProfile(id, data).subscribe((res) => {
      console.log(res);
      this.submitted = true;      
    }, (err) => {
      console.log(err);
    });
  }

  createForm() {
    this.learnersForm = this.fb.group({
      learner_first_name: ['', [Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Z ]*$")]],
      learner_last_name: ['', [Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Z ]*$")]],
      learner_DOB: [''],
      subject: ['', Validators.required],
      grade: ['', Validators.required],
      curriculum: [''],
      aspiration: [''],
      sp_need: [''],
    });
  }

  createEditForm(id) {
    let profile = this.profiles.find(ele=>ele.learner_id===id)
    console.log(profile);
    this.learnersForm = this.fb.group({
      learner_first_name: [profile.learner_first_name, [Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Z ]*$")]],
      learner_last_name: [profile.learner_last_name, [Validators.required, Validators.minLength(1), Validators.pattern("^[a-zA-Z ]*$")]],
      learner_DOB: [profile.learner_DOB],
      subject: [profile.subject, Validators.required],
      grade: [profile.grade, Validators.required],
      curriculum: [profile.curriculum],
      aspiration: [profile.aspiration],
      sp_need: [profile.sp_need],
    });
  }
  isParentClick() {
    console.log(this.isParent);
  }

  editProfile(id) {
    this.isEdit = true;
    this.learnerID = id;
    this.createEditForm(id);    
  }

  addLearner() {
    this.isEdit = true;
    this.addALearner = true;
    this.createForm();      
  }
}
