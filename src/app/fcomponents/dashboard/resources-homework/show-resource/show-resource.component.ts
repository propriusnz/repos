import {
  LOCAL_STORAGE
} from '@ng-toolkit/universal';
import {
  Component,
  OnInit,
  OnDestroy,
  Inject
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Subscription
} from 'rxjs';
import {
  Location
} from '@angular/common';

import {
  TutorService
} from '../../../../services/servercalls/tutor.service';
import {
  LearnerService
} from '../../../../services/servercalls/learner.service';
import {
  ResourceRepositoryService
} from '../../../../services/repositories/resource-repository.service';
import {
  ResourceDetails
} from '../../../../models/HomeworkResourceModel';

import {
  environment
} from '../../../../../environments/environment.prod';

import {
  GeneralService
} from '../../../../services/servercalls/general.service';
import {
  ResourceSupportService
} from '../../../../services/support/resource-support.service';

@Component({
  selector: 'app-show-resource',
  templateUrl: './show-resource.component.html',
  styleUrls: ['./show-resource.component.css']
})
export class ShowResourceComponent implements OnInit, OnDestroy {


  // resource data passed to show component
  resourceData: any;
  // resource type
  resourceType: number;
  // from dashboard
  isFromDashboard: boolean = false;


  resourcePageSubscription: Subscription;
  tutorResourceSubscription: Subscription;
  learnerResourceSubscription: Subscription;
  // viewer type
  viewerType: string;
  // resource page number
  resourcePage: number;
  resource: object;
  // resource content
  resourceContent: object;
  // resource type
  // resourceType: string;
  // resource owner id
  resourceOwnerId: string;
  // resource owner
  isOwner: boolean;
  // resource public (1) or private (0)
  resourcePrivacy: number;
  imgBaseUrl: string = environment.baseImgUrl + "/resources/imgs/";
  resourceImage: string;
  authorImage: string = environment.baseUserImgUrl;

  constructor(@Inject(LOCAL_STORAGE) private localStorage: any,
    private router: Router,
    private route: ActivatedRoute,
    private _location: Location,
    private tutorService: TutorService,
    private learnerService: LearnerService,
    private resourceRepositoryService: ResourceRepositoryService,

    private generalService: GeneralService,
    private resourceSupport: ResourceSupportService
  ) {}

  ngOnInit() {
    this.defineViewerType();
    // this.route.queryParams.subscribe(
    //   params => {
    //     let resourceId = params['id'];
    //     if(this.viewerType == "tutor") {
    //       this.tutorResourceSubscription = this.tutorService.showTutorResource(resourceId).subscribe(
    //         (res) => {
    //           this.resource = res['dataCon'].tutorStudyResource;
    //           this.resourcePrivacy = this.resource['isPublic'];
    //           this.resourceContent = JSON.parse(JSON.parse(this.resource['resource_body']));
    //           this.resourceOwnerId = this.resource['tutor_id'];
    //           this.defineResourceOwner();
    //           this.parseResourceContentType(this.resourceContent);
    //           // change image path
    //           this.resourceImage = this.imgBaseUrl + this.resource['resource_image'];
    //         },
    //         (err) => { console.log(err) }
    //       );
    //     } else if(this.viewerType == "learner") {
    //       this.learnerResourceSubscription = this.learnerService.showLearnerResource(resourceId).subscribe(
    //         (res) => {
    //           this.resource = res['dataCon'].thisLearnerStudyResource;
    //           this.resourcePrivacy = this.resource['isPublic'];
    //           this.resourceContent = JSON.parse(JSON.parse(this.resource['resource_body']));
    //           this.resourceOwnerId = this.resource['tutor_id'];
    //           this.parseResourceContentType(this.resourceContent);
    //           // change image path
    //           this.resourceImage = this.imgBaseUrl + this.resource['resource_image'];
    //         },
    //         (err) => { console.log(err) }
    //       );
    //     }
    //     // change image path
    //     this.resourcePageSubscription = this.resourceCtrlService.resourcePageProperty.subscribe(
    //       msg => {
    //         this.resourcePage = msg['resourcePage'];
    //       }
    //     );
    //   }
    // );




    // this.resourceSupport.extraOpProperty.subscribe(
    //   res => {
    //     if (Object.keys(res).length != 0) {
    //       console.log('Received resource extra object...');
    //       console.log(res);
    //       let from  = res['from'];
    //       if(from == 'community') {
    //         // processing extra data sent from community section
    //         let postId = res['extra']['postId'];

    //         console.log('Post Id is: ' + postId);
    //       }
    //     }
    //   }
    // );

    this.processUrlInfo();

  }


  // process url information
  processUrlInfo(): void {
    let currentRoute = this.router.url;
    console.log('URL: ' + currentRoute);
    if (currentRoute.indexOf('community') != -1) {
      this.processCommunityInfo(currentRoute);
    } else if (currentRoute.indexOf('dashboard') != -1) {
      this.processDashBoardInfo();
    }
  }

  // process info from community
  processCommunityInfo(url: string) {
    console.log('community post....');
    let urlInfo = url.split('/');
    console.log('URL array is: ' + urlInfo);
    console.log('Post id from url is: ' + urlInfo[urlInfo.length - 1]);

    let postId = urlInfo[urlInfo.length - 1];
    // get post information
    this.generalService.showPost(postId).subscribe(
      res => {
        console.log('Post Data is:');
        console.log(res);

        // this.resourceType = '';
        this.resourceData = res['data']['thisPost'];
        this.resourceType = this.resourceData['post_type'];
        // switch(this.resourceType) {
        //   case 0:
        //     console.log('Going to show Article');
        //     break;
        //   case 1:
        //     console.log('Going to show Resource');
        //     break;
        //   case 2:
        //     console.log('Going to show Questions');
        //     break;
        // }
      }
    );
  }

  // process info from dashboard
  processDashBoardInfo() {
    console.log('process dashboard show...');
    let postId = this.route.snapshot.params['id'];
    console.log(postId);
    this.generalService.showPost(postId).subscribe(
      res => {
        console.log('Post Data is:');
        console.log(res);

        this.resourceData = res['data']['thisPost'];
        this.resourceType = this.resourceData['post_type'];
        this.resourceOwnerId = this.resourceData['user_id'];
        this.defineResourceOwner();
        this.isFromDashboard = true;
      }
    );
  }

  // 


  ngOnDestroy(): void {
    // console.log("<<ShowResourceComponent>> [ngOnDestroy]");
    // if(this.viewerType == "tutor") {
    //   this.tutorResourceSubscription.unsubscribe();
    // } else if(this.viewerType == "learner") {
    //   this.learnerResourceSubscription.unsubscribe();
    // }
    // this.resourcePageSubscription.unsubscribe();
  }

  // define viewer type (tutor or learner)
  defineViewerType() {
    if (this.localStorage.getItem('lsaWho') == '3') {
      this.viewerType = "tutor";
    } else if (this.localStorage.getItem('lsaWho') == '1' || this.localStorage.getItem('lsaWho') == '2') {
      this.viewerType = "learner";
    }
  }

  // define resource owner
  defineResourceOwner() {
    if (this.localStorage.getItem('lsaUserId') == this.resourceOwnerId) {
      this.isOwner = true;
    } else {
      this.isOwner = false;
    }
  }

  // parse resource data
  // parseResourceContentType(resourceContent: object) {
  //   if (resourceContent.hasOwnProperty('questionType')) {
  //     this.resourceType = "homework";
  //     let displayMode;
  //     if (this.viewerType == "tutor") {
  //       displayMode = "overview";
  //     } else if (this.viewerType == "learner") {
  //       displayMode = "display";
  //     }
  //     this.resourceCtrlService.sendAccessProperty(this.viewerType, displayMode);
  //   } else {
  //     this.resourceType = "other";
  //   }
  // }

  // edit resource
  // editResource() {
  //   if (this.resourceType == "homework") {
  //     let resourceBrief = {};
  //     resourceBrief['resource_subject'] = this.resource['resource_subject'];
  //     resourceBrief['resource_grade'] = this.resource['resource_grade'];
  //     resourceBrief['studyResource_id'] = this.resource['studyResource_id'];
  //     resourceBrief['resource_title'] = this.resource['resource_title'];
  //     resourceBrief['resource_des'] = this.resource['resource_des'];
  //     resourceBrief['resource_image'] = this.resource['resource_image'];
  //     resourceBrief['resource_tags'] = this.resource['resource_tags'];
  //     resourceBrief['isPublic'] = this.resource['isPublic'];

  //     // prepare homework resource content
  //     let resourceObj = new ResourceDetails(
  //       this.resourceType,
  //       resourceBrief,
  //       this.resourceContent);
  //     this.resourceCtrlService.sendResourceInfo(resourceObj, "edit");

  //     // navigate to homework resource edit page
  //     this.router.navigate(['/app/dashboard/tutor/resources/edit']);
  //   }
  // }

  // edit resources
  editResource() {

    console.log('Sending data for edit...');
    console.log(this.resourceData);
    this.resourceRepositoryService.sendResourcesDataForEdit(this.resourceData);

    // console.log('Editing data....');
    // this.resourceRepositoryService.sendResourcesDataForEdit(this.resourceData);
    let resType = '';
    switch (this.resourceType) {
      case 0:
        resType = 'article';
        break;
      case 1:
        resType = 'reference';
        break;
      case 2:
        resType = 'question';
        break;
    }
    this.router.navigate(['/app/dashboard/tutor/resources/edit/', resType]);
  }

  // go back to resource page
  goBack() {
    this._location.back();
  }

  // assign resources to learners
  assignResources() {
    // console.log("Assign this resource to learners....");
  }

  // prepare author image
  prepareAuthorImage(authorId: string) {
    // let a = 1526863850931;
    return this.authorImage + authorId + '-cp.jpeg';
  }

}
