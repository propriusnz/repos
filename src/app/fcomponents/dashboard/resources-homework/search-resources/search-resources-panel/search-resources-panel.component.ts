import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, Pipe, Inject } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

import { TutorService } from './../../../../../services/servercalls/tutor.service';
import { LearnerService } from './../../../../../services/servercalls/learner.service';
import { ResourceRepositoryService } from '../../../../../services/repositories/resource-repository.service';

import { environment } from '../../../../../../environments/environment.prod';

@Component({
  selector: 'app-search-resource',
  templateUrl: './search-resources-panel.component.html',
  styleUrls: ['./search-resources-panel.component.css']
})
export class SearchResourcesPanelComponent implements OnInit {
  //fetch all data
  allData: any;
  // sarch property
  searchProperty: any[];
  // returned resources
  resources: any;
  // total number of page
  totalPage: number;
  // total number of resource items
  totalResNum: number;
  // array for each page index
  pageArray: number[] = [];
  // array for head display buttons
  headBtnArray: number[] = [];
  // array for tail display buttons
  tailBtnArray: number[] = [];
  // current view index
  currentViewIndex: number = 0;
  // number of resources can be viewed in one page
  pageSize: number = 10;
  // number of page buttons to display
  indexBtnLimit = 5;
  // button highlight array
  highlightArray: boolean[] = [];
  // MatPaginator Output
  pageEvent: PageEvent;
  // current resource view
  currentViewResource: any[] = [];
  // all resources
  allResourcesCollection: object[] = [];
  // filtered resources
  filteredResourceCollection: object[] = [];
  // filter status
  isFilter: boolean = false;
  // ***** viewer type ******
  viewerType: string;
  // search option array
  searchOptionArray: any[] = [];
  // search options
  searchOptions: any;
  // subject option array
  subjectArray: any[] = [];
  // grade option array
  gradeArray: any[] = [];
  // type option array
  typeArray: any[] = [];

  imgBaseUrl: string = environment.baseImgUrl + "/resources/imgs/";
  // resourceImage: string;
  authorImage: string = environment.baseUserImgUrl;

  // base router link for each resource card
  resourceCardRouterLink: string;
  display: Window;

  //tags array
  tagsArray = [];


  constructor(
    @Inject(WINDOW)
    private window: Window,
    @Inject(LOCAL_STORAGE)
    private localStorage: any,
    private router: Router,
    private route: ActivatedRoute,
    private tutorService: TutorService,
    private learnerService: LearnerService,
    private resourceCtrlService: ResourceRepositoryService
  ) {
    this.display = window
  }


  ngOnInit() {
    this.defineViewerType();
    if (this.viewerType == "tutor") {
      this.resourceCardRouterLink = "/app/dashboard/tutor/resources/view/resources";
    } else if (this.viewerType == "learner") {
      this.resourceCardRouterLink = "/app/dashboard/learner/homework/view/hw";
    }
    this.route.queryParams.subscribe(
      params => {
        console.log(params);
        this.currentViewIndex = params['page'];
      }
    );
    this.getResourceSearchInfo();
  }

  // Get resource index Information from Database
  getResourceSearchInfo() {
    if (this.viewerType == "tutor") {
      this.tutorService.indexTutorResourcesWithPage(this.currentViewIndex).subscribe(
        (res) => {
          this.allData = res;
          this.currentViewResource = Object.assign(res)['data']
          console.log(this.currentViewResource);
          this.totalPage = Object.assign(res)['last_page'];
          this.totalResNum = res['total'];
          this.prepareBtnDisplayArray();
          this.populatePageIndexArray(this.totalPage);
          this.populatePageHighlightArray(this.totalPage);
          this.transferStoA();
        },
        (err) => { "Sorry, we can't get to your information at this time."; }
      );
    } else if (this.viewerType == "learner") {
      console.log("this is link to learner service!!!");
    }
  }


  // // define viewer type (tutor or learner)
  defineViewerType() {
    if (this.localStorage.getItem('lsaWho') == '3') {
      this.viewerType = "tutor";
    } else if (this.localStorage.getItem('lsaWho') == '1' || this.localStorage.getItem('lsaWho') == '2') {
      this.viewerType = "learner";
    }
  }

  // // populate page index array
  populatePageIndexArray(totalPage) {
    this.pageArray = [];
    for (let i = 0; i < totalPage; i++) {
      this.pageArray.push(i + 1);
    }
  }

  // // populate button highlight arrayviewerType
  populatePageHighlightArray(totalPage) {
    for (let i = 0; i < totalPage; i++) {
      if (i == 0) {
        this.highlightArray.push(true);
      } else {
        this.highlightArray.push(false);
      }
    }
  }

  // // prepare page display button array
  prepareBtnDisplayArray() {
    this.headBtnArray = [];
    this.tailBtnArray = [];

    if (this.totalPage <= this.indexBtnLimit) {
      this.headBtnArray = [];
      for (let i = 1; i <= this.totalPage; i++) {
        this.headBtnArray.push(i);
      }
      this.tailBtnArray = [];
    } else {
      if (this.totalPage - this.indexBtnLimit <= 2) {
        this.headBtnArray = [];
        for (let i = 1; i <= this.totalPage; i++) {
          this.headBtnArray.push(i);
        }
        this.tailBtnArray = [];
      } else {
        if (this.currentViewIndex / this.indexBtnLimit < 1) {
          if (this.indexBtnLimit - this.currentViewIndex % this.indexBtnLimit >= 2) {
            this.headBtnArray = [];
            for (let i = 1; i <= this.indexBtnLimit; i++) {
              this.headBtnArray.push(i);
            }
            this.tailBtnArray = [];
          } else {
            this.headBtnArray = [];
            for (let i = 1; i <= this.indexBtnLimit + 1; i++) {
              this.headBtnArray.push(i);
            }
            this.tailBtnArray = [];
          }
        } else if (this.currentViewIndex / this.indexBtnLimit == 1) {
          this.headBtnArray = [];
          for (let i = 1; i <= this.indexBtnLimit + 2; i++) {
            this.headBtnArray.push(i);
          }
          this.tailBtnArray = [];
        } else {
          this.headBtnArray = [1, 2];
          this.tailBtnArray = [];
          let startBtn = this.currentViewIndex - 2;
          let endBtn = this.currentViewIndex + 2;
          if (endBtn > this.pageArray.length) {
            this.tailBtnArray = this.pageArray.slice(
              this.pageArray.length - this.indexBtnLimit, this.pageArray.length);
          } else {
            this.tailBtnArray = this.pageArray.slice(startBtn - 1, endBtn);
          }
        }
      }
    }
  }

  // // update page button highlight array
  updatePageHighlightArray(index) {
    let a = this.highlightArray.indexOf(true);
    this.highlightArray[a] = false;
    this.highlightArray[index - 1] = true;
  }

  // // get value from page index input
  getIndexInput(eleId) {
    let inputValue = Number(document.getElementById(eleId)['value']);
    if (isNaN(inputValue)) {
      console.log("Please type number!!!");
    } else {
      if (inputValue === 0 || inputValue === 1) {
        this.currentViewIndex = 1;
      } else {
        if (inputValue * this.pageSize - this.totalResNum < this.pageSize) {
          this.currentViewIndex = inputValue;
        } else {
          this.currentViewIndex = this.totalResNum % this.pageSize + 1;
        }
      }
      this.goPage(this.currentViewIndex);
    }
  }

  // // go to clicked page
  goPage(index) {
    this.updatePageHighlightArray(index);
    this.window.scroll(0, 0);
    console.log(this.highlightArray);
    if (this.viewerType == "tutor") {
      this.router.navigate(['/app/dashboard/tutor/resources/view'], { queryParams: { page: index } });
      this.tutorService.indexTutorResourcesWithPage(index).subscribe(
        res => {
          this.currentViewResource = Object.assign(res)['data'];
          this.transferStoA();
        }
      )

    } else if (this.viewerType == "learner") {
      this.router.navigate(['/app/dashboard/learner/homework/view'], { queryParams: { page: index } });
    }

  }

  // // get page size from MatPaginator
  changed(event: PageEvent) {
    this.currentViewIndex = event.pageIndex + 1;
    this.goPage(this.currentViewIndex);
  }

  // // go to previous page
  goPrevious() {
    if (this.currentViewIndex > 1) {
      this.currentViewIndex--;
      this.prepareBtnDisplayArray();
      this.goPage(this.currentViewIndex);
    }
  }

  // // go to next page
  goNext() {
    if (this.currentViewIndex < this.totalPage) {
      this.currentViewIndex++;
      this.prepareBtnDisplayArray();
      this.goPage(this.currentViewIndex);
    }
  }

  //transfer string tags to tags array
  transferStoA() {
    for (let i = 0; i < this.currentViewResource.length; i++) {
      if (typeof this.currentViewResource[i].post_tags == 'string') {
        let tagArry = this.currentViewResource[i].post_tags.split(',');
        console.log(tagArry);
        this.currentViewResource[i].post_tags = tagArry;
        console.log(this.currentViewResource[i].post_tags);

      }

    }
  }
}
