// manage all collections of resources: aricles, questions, and files....

import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter
} from '@angular/core';
import {
  Router,
  ActivatedRoute
} from '@angular/router';
import {
  Subscription
} from 'rxjs';

import {
  PostBasicInfo,
  PostDetails,
  PostDetailsInfo,
  ArticleData
} from '../../../../models/HomeworkResourceModel';
import {
  ResourceSupportService
} from '../../../../services/support/resource-support.service';
import {
  GeneralService
} from '../../../../services/servercalls/general.service';

@Component({
  selector: 'app-resources-collection',
  templateUrl: './resources-collection.component.html',
  styleUrls: ['./resources-collection.component.css']
})
export class ResourcesCollectionComponent implements OnInit {
  // access mode
  @Input() mode: string;
  // resource type
  @Input() resourceType: string;
  // user type
  @Input() userType: string;
  // resources data
  @Input() resourcesData: any;

  // current route url
  currentRoute: string;

  // returned resource data
  returnedResourceData: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private resourceSupportService: ResourceSupportService,
  ) {}

  ngOnInit() {

    console.log('Resources Collection OnINIT..');
    console.log('mode is: ' + this.mode);
    console.log('userType is: ' + this.userType);
    console.log('resource type is: ' + this.resourceType);

    if(this.mode == 'edit') {
      console.log('<<ResourcesCollection edit mode....>>');
      console.log(this.resourcesData);
    }

    // this.generalService.showPost('17').subscribe(
    //   res => {
    //     console.log('PPPPPPPP');
    //     console.log(res);
    //     console.log(res['data']['thisPost']);
    //   }
    // );

    // this.currentRoute = this.router.url;

    // listen for basic op property
    // this.resourceSupportService.basicOpProperty.subscribe(
    //   msg => {
    //     if (Object.keys(msg).length != 0) {
    //       console.log('<ResourceCollection> received basic op property');
    //       console.log(msg);
    //       if (msg['user_type'].trim != '') {
    //         this.userType = msg['user_type'];
    //       }
    //       this.mode = msg['mode'];
    //       this.resourceType = msg['resource_type'];
    //     }
    //   }
    // );

    // this.resourceSupportService.extraOpProperty.subscribe(
    //   msg => {
    //     if (Object.keys(msg).length != 0) {
    //       console.log('<ResourceCollection> received extra op property');
    //       console.log(msg);
    //       if(msg['from'] == 'community') {
    //         console.log('Received extra info from community...');
    //         console.log(msg['extra']);
    //         let postId = msg['extra']['post_id'];
    //         // get post information by providing id
    //         this.generalService.showPost(postId).subscribe(
    //           res => {
    //             console.log('Post info is:');
    //             console.log(res);
    //             this.returnedResourceData = res['data']['thisPost'];
    //           }
    //         );
    //       }
    //     }
    //   }
    // );

  }

  // retrieve post details
  getPostResource() {
    let urlArray = this.currentRoute.split('/');
    // get resource id from url
    let resId = urlArray[urlArray.length - 1];
    console.log('Specific resource id is: ' + resId);
    this.generalService.showPost(resId).subscribe(
      res => {
        console.log('Received resource data is:');
        console.log(res);
        console.log(res['data']['thisPost']);
        let postInfo = res['data']['thisPost'];
        // this.resourceType = postInfo['post_type'];
        // this.mode = 'view';
        this.returnedResourceData = postInfo;
      }
    );
  }

  // process resource collection
  // processCollection() {
  //   let resType = this.resourceCollectionInfo['post_type'].toString();
  //   switch (resType) {
  //     case '0':
  //       // process article
  //       this.resourceType = resType;

  //       break;
  //     case '1':
  //       // process reference
  //       break;
  //     case '2':
  //       // process question
  //       break;
  //   }
  // }

}
