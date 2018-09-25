import {
  LOCAL_STORAGE,
  WINDOW
} from '@ng-toolkit/universal';
import {
  Component,
  OnInit,
  OnDestroy,
  Inject
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import { Subscription } from 'rxjs';

import {
  PostBasicInfo
} from '../../../../models/HomeworkResourceModel';
import {
  ResourceSupportService
} from '../../../../services/support/resource-support.service';
import {
  ResourceRepositoryService
} from '../../../../services/repositories/resource-repository.service';
import {
  TutorService
} from '../../../../services/servercalls/tutor.service';

// mock data only
import {
  ResourcesSubjects,
  ResourcesGrade
} from './optional/homework-prebuiltData';

import {
  SubjectList,
  GradeList,
  PrivacyList
} from '../../../support/other/SubjectGradeList';

@Component({
  selector: 'app-resource-edit',
  templateUrl: './resource-edit.component.html',
  styleUrls: ['./resource-edit.component.css']
})
export class ResourceEditComponent implements OnInit, OnDestroy {

  // create mode or edit mode
  mode: string = '';
  // resource type
  resType: string;
  // user type
  userType: string;
  // post tags
  postTags: string[] = [];
  // basic information
  basicPostInfo: PostBasicInfo;
  // resource data
  resourcesData: any;
  // post body data
  resourcesPostBody: any;
  // full post information
  fullPostInfo: any;
  // post id for edit
  postId: number;

  // basic form
  basicPostInfoForm: FormGroup;

  resourceSubjects: object[] = SubjectList;
  resourceGrade: object[] = GradeList;
  resourcePrivacy: object[] = PrivacyList;
  // initial step
  initialStep: number = 1;

  //window size
  windowWidth: number;
  windowHight: number;

  resourcesDataSubscription: Subscription;
  resourcesDataForEditSubscription: Subscription;
  resourcesNormalSignalSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private resourceSupportService: ResourceSupportService,
    private resourceRepositoryService: ResourceRepositoryService,
    private tutorService: TutorService,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    @Inject(WINDOW) 
    private window: Window,
  ) {}

  ngOnInit() {

    console.log('<<ResourceEdit OnInit>>....');

    this.windowWidth = window.innerWidth;
    this.windowHight = window.innerHeight;
    this.defineViewerType();

    // create form for basic information
    this.createBasicForm();
    // get mode
    this.mode = this.resourceSupportService.getAccessModeFromURL(this.router.url);
    // get resource type
    this.resType = this.resourceSupportService.getResourceTypeFromURL(this.route.snapshot);

    // handle resources normal signal: resource type & action
    this.resourcesNormalSignalSubscription = this.resourceRepositoryService.resourcesNormalSignal.subscribe(
      res => {
        if(Object.keys(res).length != 0) {
          console.log('<<ResourceEdit receives normal signal....>>');
          console.log(res);
          this.mode = res['action'];
          this.resType = res['type'];
        }
      }
    );

    // handle resources data sent from parent.....
    this.resourcesDataSubscription = this.resourceRepositoryService.resourcesData.subscribe(
      data => {
        if (Object.keys(data).length != 0) {
          if (data['extra']['info'] == 'success') {
            $('#stepper-2').addClass('done');
            $('#stepper-2').removeClass('active');
            $('#stepper-3').removeClass('disabled');
            $('#stepper-3').addClass('active');

            console.log(data);
            this.resourcesData = data['data'];
            this.prepareResourcesData(this.basicPostInfo, this.resourcesData, data['extra']['postType']);
          } else if (data['extra']['info'] == 'error') {
            console.log(data);
            console.log('Error for data!!!!!!!!!!!!!!!');
          }
        }
      }
    );

    // handle resources data for editing
    this.resourcesDataForEditSubscription = this.resourceRepositoryService.resourcesDataForEdit.subscribe(
      data => {
        if (Object.keys(data).length != 0) {
          console.log('Resource Edit componenet received data for editing');
          console.log(data);
          // get mode
          // this.mode = this.resourceSupportService.getAccessModeFromURL(this.router.url);
          this.mode = 'edit';
          // get resource type
          this.resType = this.resourceSupportService.getResourceTypeFromURL(this.route.snapshot);

          this.resourcesPostBody = data['post_body'];
          this.postId = data['post_id'];

          this.prefillBasicInfo(data);
          
        } else {
          
        }
      }
    );

    $(function () {
      $('[data-toggle="tooltip"]').tooltip()
    });

    // Steppers
    $(document).ready(() => {
      console.log(this.basicPostInfoForm.value);

      //header
      var navListItems = $('div.setup-panel-2 div a'),
        //content
        allWells = $('.setup-content-2'),
        //next button
        allNextBtn = $('.nextBtn-2'),
        //back button
        allPrevBtn = $('.prevBtn-2');

      allWells.hide();

      navListItems.click(function (e) {
        e.preventDefault();
        var $target = $($(this).attr('href')),
          $item = $(this);

        if (!$item.hasClass('disabled')) {
          navListItems.removeClass('btn-amber').addClass('btn-blue-grey');
          $item.addClass('btn-amber');
          allWells.hide();
          $target.show();
          $target.find('input:eq(0)').focus();
        }
      });

      allPrevBtn.click(function () {
        var curStep = $(this).closest(".setup-content-2"),
          curStepBtn = curStep.attr("id"),
          prevStepSteps = $('div.setup-panel-2 div a[href="#' + curStepBtn + '"]').parent().prev().children("a");

        prevStepSteps.removeAttr('disabled').trigger('click');
      });

      allNextBtn.click(function () {
        var curStep = $(this).closest(".setup-content-2"),
          curStepBtn = curStep.attr("id"),
          nextStepSteps = $('div.setup-panel-2 div a[href="#' + curStepBtn + '"]').parent().next().children("a"),
          curInputs = curStep.find("input[type='text'],input[type='url']"),
          isValid = true;

        $(".form-group").removeClass("has-error");
        for (var i = 0; i < curInputs.length; i++) {
          if (!curInputs[i].validity.valid) {
            isValid = false;
            $(curInputs[i]).closest(".form-group").addClass("has-error");
          }
        }

        if (isValid)
          nextStepSteps.removeAttr('disabled').trigger('click');
      });

      $('div.setup-panel-2 div a.btn-amber').trigger('click');
    });

    //small screen privacy
    $(document).ready(function () {
      $("#public").click(function () {
        $("#public-panel").slideToggle(200);
        $("#private-panel").slideUp(200);
      });
      $("#private").click(function () {
        $("#private-panel").slideToggle(200);
        $("#public-panel").slideUp(200);
      });
    });

    // textarea
    var maxLength = 120;
    $('textarea').keyup(function () {
      var length = $(this).val().length;
      length = maxLength - length;
      $('#chars').text(length);
    });
  }

  ngOnDestroy(): void {
    // clear related subject
    this.resourceRepositoryService.clearResourcesDataSignalSubject();
    this.resourceRepositoryService.clearResourcesDataSubject();
    this.resourceRepositoryService.clearResourcesEditDataSubject();
    this.resourcesDataSubscription.unsubscribe();
    this.resourcesDataForEditSubscription.unsubscribe();
  }

  // define viewer type (tutor or learner)
  defineViewerType(): void {
    if (this.localStorage.getItem('lsaWho') == '3') {
      this.userType = "tutor";
    } else if (this.localStorage.getItem('lsaWho') == '1' || this.localStorage.getItem('lsaWho') == '2') {
      this.userType = "learner";
    }
  }

  // create form for post's basic info
  createBasicForm(): void {
    this.basicPostInfoForm = this.fb.group({
      title: ['', Validators.required],
      subTitle: ['', Validators.required],
      subject: ['', Validators.required],
      grade: ['', Validators.required],
      privacy: ['', Validators.required],
      tags: [''],
      description: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(120)])],
    });
  }

  // prefill basic form data
  prefillBasicInfo(data: any): void {
    this.basicPostInfoForm.setValue({
      title: data['post_title'],
      subTitle: data['post_subTitle'],
      subject: data['post_subject'],
      privacy: data['public_status'],
      grade: data['post_grade'],
      tags: data['post_tags'].split(','),
      description: data['post_des']
    });
  }

  // prepare Step2 panel environment
  prepareStep2(): void {
    this.mode = this.resourceSupportService.getAccessModeFromURL(this.router.url);
    this.resType = this.resourceSupportService.getResourceTypeFromURL(this.route.snapshot);

    // console.log('mode is: ' + this.mode);
    // console.log('restype is: ' + this.resType);
  }

  // go to step 2
  gotoStepTwoPanel(): void {
    console.log('Go to Step Two');
    console.log(this.basicPostInfoForm.value);

    if (this.validateBasicForm()) {
      console.log('Step 1 is ok');
      $('#stepper-1').addClass('done');
      $('#stepper-1').removeClass('active');
      $('#stepper-2').removeClass('disabled');
      $('#stepper-2').addClass('active');
      
      this.processBasicInfo(this.basicPostInfoForm.value);
      this.window.scroll(0, 0);
    } else {
      console.log('Step 1 is not ok');
    }

  }

  // go to step 3
  gotoStepThreePanel(): void {
    console.log('Go to Step Three');
    // tell parent component prepare to send data
    this.resourceRepositoryService.requestResourcesData();
    $('#stepper-3').addClass('active');
    this.window.scroll(0, 0);
  }

  // validate basic info status
  validateBasicForm(): boolean {
    return this.basicPostInfoForm.status == 'VALID' ? true : false;
  }

  // process basic information form value
  processBasicInfo(basicInfo: object): void {
    console.log('Processing basic value:');
    console.log(basicInfo);
    this.basicPostInfo = new PostBasicInfo({
      post_subTitle: basicInfo['subTitle'],
      post_title: basicInfo['title'],
      post_subject: basicInfo['subject'],
      post_grade: basicInfo['grade'],
      post_tags: basicInfo['tags'],
      post_privacy: Number(basicInfo['privacy']),
      post_des: basicInfo['description'],
      post_image: ''
    });
  }

  // process resources data for saving
  prepareResourcesData(basicData: any, resData: any, resType: number) {
    console.log('Preparing resources data...');
    console.log(basicData);
    console.log(resData);
    this.fullPostInfo = basicData;
    this.fullPostInfo['post_body'] = resData;
    this.fullPostInfo['post_type'] = resType;

    // change post_privacy to public_status
    this.fullPostInfo['public_status'] = this.fullPostInfo['post_privacy'];
    delete this.fullPostInfo['post_privacy'];
    delete this.fullPostInfo['post_image'];

    this.fullPostInfo['post_file'] = [];

    console.log('Full post info is:');
    console.log(this.fullPostInfo);
  }

  // save post
  savePost() {
    console.log('Saving post...');

    console.log(this.fullPostInfo);

    let postFormData = new FormData();
    for (let key in this.fullPostInfo) {
      postFormData.append(key, this.fullPostInfo[key]);
    }

    if (this.mode == 'add') {
      console.log('Adding new post!!!');
      this._createNewPost(postFormData);
    } else if (this.mode == 'edit') {
      console.log('Editing new post!!!');
      if(this.postId) {
        this._updateSavedPost(postFormData);
      }
    }
  }

  // ************ Calling services START ************
  //
  // Create new homework
  // hwInfo: HomeworkInfo
  _createNewPost(postInfo: any) {

    console.log("Create new post!!!!");
    console.log(postInfo);

    this.tutorService.testPost(postInfo).subscribe(
      (res) => {
        alert("Pop up: Post created successful!");
        console.log(res);

        // clear related subject
        this.resourceRepositoryService.clearResourcesDataSignalSubject();
        this.resourceRepositoryService.clearResourcesDataSubject();
        this.resourceRepositoryService.clearResourcesEditDataSubject();

        // direct to resources index page
        this.router.navigate(['/app/dashboard/tutor/resources/view'], { queryParams: { page: 1} });
      },
      (error) => console.log(error)
    );
  }

  _updateSavedPost(postInfo: any) {

    postInfo['_method'] = "put";
    postInfo.append('_method', "put");
    this.tutorService.updateTutorPost(this.postId, postInfo).subscribe(
        (res) => {
          // alert("Pop up: Homework updated successful!");
          // this.router.navigate(['/app/dashboard/tutor/resources/view/resources'],
          //   { queryParams: { id: res['dataCon'].tutorStudyResource.studyResource_id } });
          console.log(res);
        },
        (error) => {
          console.log(error);
          // if (Number(error['error'].code) == 422 && error['error'].error == "You need to specify a different value to update") {
          //   // error message: "You need to specify a different value to update"
          //   alert("Pop up: Homework updated successful!");
          //   this.router.navigate(['/app/dashboard/tutor/resources/view/resources'],
          //     { queryParams: { id: this.editData['resource_desc'].studyResource_id } });
          // }
        }
      );
  }

  // Edit homework informatino
  // _method: "put"
  // _updateSavedHomework(hwInfo: any) {

  //   // hwInfo['_method'] = "put";
  //   hwInfo.append('_method', "put");
  //   this.tutorService.updateTutorResource(
  //     this.editData['resource_desc'].studyResource_id, hwInfo).subscribe(
  //       (res) => {
  //         alert("Pop up: Homework updated successful!");
  //         this.router.navigate(['/app/dashboard/tutor/resources/view/resources'],
  //           { queryParams: { id: res['dataCon'].tutorStudyResource.studyResource_id } });
  //       },
  //       (error) => {
  //         console.log(error);
  //         if (Number(error['error'].code) == 422 && error['error'].error == "You need to specify a different value to update") {
  //           // error message: "You need to specify a different value to update"
  //           alert("Pop up: Homework updated successful!");
  //           this.router.navigate(['/app/dashboard/tutor/resources/view/resources'],
  //             { queryParams: { id: this.editData['resource_desc'].studyResource_id } });
  //         }
  //       }
  //     );
  // }







  // tags related part
  tagStack: string[] = [];
  
  // handle keypress
  handleKeyPress(): void {
    alert(1);
  }

  // add tags
  addTags(): void {
    
  }

  // remove tags
  removeTags(): void {

  }

}
