import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit, Inject } from '@angular/core';
import { GeneralService } from '../../../../services/servercalls/general.service';
import { TutorService } from '../../../../services/servercalls/tutor.service';
import { environment } from '../../../../../environments/environment.prod';
import { Meta, Title } from '@angular/platform-browser';
import { CommonSupportService } from '../../../../services/support/common-support.service';
import { ResourceSupportService } from '../../../../services/support/resource-support.service';
import { SubjectList, GradeList } from '../../../support/other/SubjectGradeList';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-posts-search',
  templateUrl: './posts-search.component.html',
  styleUrls: ['./posts-search.component.css']
})
export class PostsSearchComponent implements OnInit {
  errorMessage: string;
  // message tells navTab work
  navTabMessage: string;
  articleShow = false;
  resourceShow = false;
  questionShow = false;
  // record posts data from server
  posts:any;
  postTip = false;

  defaultImgUrl = 'http://proprius.co.nz/api/public/userimg/default-cp.jpeg';
  defaultSubImg = '../../../../../assets/postImgs/default.jpg';
  defaultSubIcon = '../../../../../assets/icons/categoryIcon.png';
  data: any='';

  // sort input default value display in web page input box
  postSubject: string;
  postGrade: string;
  postDate: string;
  // sort value with many input selections display in web page input box
  subjectObj: object[] = SubjectList;
  gradeObj: object[] = GradeList;
  subjects: string[] = [];
  grades: string[] = [];
  dates: string[] = ['Ascending', 'Descending'];
  type: any='';
  // sort value selected sent to server 
  subject: string;
  grade: string;
  date: string;
  // check sort value selected or not to help sort post with one or more conditions
  subjectChange = false;
  gradeChange = false;
  dateChange = false;
  // pagination stuff
  display: Window;
  pages=[];
  totalPosts = 0;
  perPage = 0;
  currentPage = 0;
  pageNumber = 0;



  constructor(
    @Inject(WINDOW)
    private window: Window,
    public communitySearchService: GeneralService,
    private TutorService: TutorService,
    private meta: Meta,
    private titleService: Title,
    private commonSupport: CommonSupportService,
    private resourceSupport: ResourceSupportService,
    private router: Router,
  ) {
    this.display = window;
    this.meta.addTags([
      { name: 'keywords', content: 'community, Learnspace, tutoring, articles, posts, resources'},
      { name: 'description', content: 'Learnspace posts' },
    ])
    this.titleService.setTitle('Learnspace | Posts');
   }

  ngOnInit() {
    this.getAllPost();
    this.getSortSelections();
  }

  getAllPost(){
    this.articleShow = true;
    this.resourceShow = true;
    this.questionShow = true;
    this.getPublicPost();
    this.resourceContent();
    this.questionContent();
    this.navTabMessage = '';
  }

  // import subjectList and gradeList to input box
  getSortSelections(){
    this.postSubject = 'All post subjects';
    this.postGrade = 'All grade years';
    this.postDate = 'Ascending';
    this.subjects.push(this.postSubject);
    this.grades.push(this.postGrade);
    var subName = '';
    var graName = '';
    for (let i=0; i<this.subjectObj.length; i++){
      subName = this.subjectObj[i]['name'];
      this.subjects.push(subName);
    }
    for (let j=0; j<this.gradeObj.length; j++){
      graName = this.gradeObj[j]['name'];
      this.grades.push(graName);
    }
  }

  // ----------------------------------------------------------------------Articles-----------------------------------------------------
  // Articles Content
  getArticle(){
    this.articleShow = true;
    this.resourceShow = false;
    this.questionShow = false;
    this.getPublicPost();
  }
  // get public article post
  getPublicPost(){
    this.communitySearchService.displayAllPosts().subscribe(
      (data) => {
        console.log(data);
        this.pageNum(data);
        //this.pageNumActive(1);
        console.log(this.totalPosts, this.perPage, this.pages);
        this.posts = data['data'];
        this.posts.forEach(element=>{
          if (element.post_type === 0) { element.post_type = 'Article post'; } 
          else if (element.post_type === 1) { element.post_type = 'Resource post'; } 
          else if (element.post_type === 2) { element.post_type = 'Homework post'; }
        });
      },
      (err) => {
        console.log(err);
        this.errorMessage = 'Sorry, we cannot get information for you right now.'
      }
    );
  }

  // Articles Img & Icon
  // when user Profile img not being edited, put default img into it.
  defaultUserImg(e){ 
    // e.target.src=this.defaultImgUrl; 
  }
  // when subjectIcon cannot match to subject name, put default subIcon into it.
  subjectIcon(e){ e.target.src = this.defaultSubIcon; }
  // If user does not insert img into post, add default img instead of null
  subjectImg(e) { e.target.src = this.defaultSubImg; }

  // Article sorting ways
  // get postArticle information when searching by type, subject, grade, and date
  sortArticleInfo(){
    this.postTip = false;
    this.communitySearchService.indexAllPosts(this.type, this.subject, this.grade).subscribe(
      (data)=>{
        console.log(data);
        if (data['data'].length === 0){this.postTip = true;}
        this.posts = data['data'];
      },
      (error)=>{
        this.errorMessage="Something went horribly wrong.";
        console.log(error);
      }
    )
  }

  // Search by subject way when the specific subject selected changes
  subjectSelectChange(value:any) {
    this.subjectChange = true;
    for (let i=0; i < value['subjects'].length; i++) {
      if (value['subjects'][i] === this.data) {
        console.log(value['subjects'][i]);
        this.subject = value['subjects'][i];
        if (this.subject === 'All post subjects'){ this.subject = ''; }
        if (!this.dateChange){this.date = ''; }
        if (!this.gradeChange){this.grade = ''; }
        this.type='';
        this.sortArticleInfo();
        break;
      }
    }
  }
  // Search by grade way when the specific grade selected changes
  gradeSelectChange(value:any) {
    this.gradeChange = true;
    for (let i=0; i < value['grades'].length; i++) {
      if (value['grades'][i] === this.data) {
        this.grade = value['grades'][i];
        if (this.grade === 'All grade years'){ this.grade = ''; }
        if (!this.dateChange){this.date = ''; }
        if (!this.subjectChange){this.subject = ''; }
        this.type='';
        this.sortArticleInfo();
        break;
      }
    }
  }
  // Search by date way when the descending or ascending order selected changes
  dateSelectChange(value:any) {
    this.dateChange = true;
    for (let i=0; i < value['dates'].length; i++) {
      if (value['dates'][i] === this.data) {
        this.date = value['dates'][i];
        if (this.date === 'Descending'){
          this.posts = this.posts.reverse();
        } else {
          if (!this.subject){this.subject = ''; }
          if (!this.dateChange){this.date = ''; }
          if (!this.gradeChange){this.grade = ''; }
          this.sortArticleInfo();
        }
        break;
      }
    }
  }

  // Send extra data to resource show component
  sendExtraDataForShow(postId: string) {
    console.log('sending extra data....');
    console.log('sending post id from community: ' + postId);
    let extraData = {
      postId: postId
    };
    this.resourceSupport.sendExtraOpProperty('community', extraData);
  }


  // ----------------------------------------------------------------------Resources----------------------------------------------------------
  getResource(){
    this.articleShow = false;
    this.resourceShow = true;
    this.questionShow = false;
    this.resourceContent();
  }
  resourceContent(){
    this.navTabMessage = 'Resources part works!!!';
  }


  // ----------------------------------------------------------------------Questions----------------------------------------------------------
  getQuestion(){
    this.articleShow = false;
    this.resourceShow = false;
    this.questionShow = true;
    this.questionContent();
  }
  questionContent(){
    this.navTabMessage = 'Questions part works!!!';
  }


  // ----------------------------------------------------------------------Pagination-----------------------------------------------------
  // find how many pages does post have and display pageNum to help specific clicking when web page initiating
  pageNum(data){
    this.pages = [];
    this.totalPosts = data['total'];
    this.perPage = data['per_page'];
    this.currentPage = data['current_page'];
    this.pageNumber = Math.ceil(this.totalPosts/this.perPage);
    if (this.pageNumber > 1){
      for (let i=1; i<this.pageNumber+1; i++){
        this.pages.push(i);
      }
      console.log(this.pages);
    }else{
      this.pages.push(1);
    }
    //this.btnValid();
    //this.prepareBtnDisplayArray();
  }

  // check 'prevBtn' and 'nextBtn' valid
  // btnValid(){
  //   this.prevBtnDisable = false;
  //   this.nextBtnDisable = false;
  //   if(this.currentPage <= 1){  this.prevBtnDisable = true; } 
  //   else if (this.currentPage >= this.pageNumber){ this.nextBtnDisable = true; }
  // }
  // check pageNum is active with blue background color or not
  // pageNumActive(page){
  //   for (let i=0; i<=this.pageNumber; i++){
  //     if (page != i){
  //       this.pageActive[i] = false;
  //     } else {
  //       this.pageActive[i] = true;
  //     }
  //   }
  //   console.log(this.pageActive);
  // }

  // make website turn to this specific page
  getPage(page: number){
    console.log(page);
    this.window.scroll(0, 0);
    // this.router.navigate(['/app/community/posts'], {queryParams: {page}} );
    this.communitySearchService.displayPostPages(page).subscribe(
      (data) => {
        console.log(data);
        this.posts = data['data'];
        this.currentPage = data['current_page'];
        //this.pageNumActive(page);
        //this.btnValid();
        //this.prepareBtnDisplayArray();
      },
      (err) => {
        console.log(err);
      }
    )
  }

  // when 'prev' or 'next' button click of mat-paginator (small screen)
  // changed($event) {
  //   console.log('getPage function works!!!!');
  //   console.log($event);
  //   let index = $event.pageIndex;
  //   this.getPage(index+1);
  // }

  // prepare page display button array to limit how many pageNumber button shown
  // prepareBtnDisplayArray() {
  //   this.headBtnArray = [];
  //   this.tailBtnArray = [];

  //   if (this.pageNumber <= this.indexBtnLimit) {
  //     this.headBtnArray = [];
  //     for (let i = 1; i <= this.pageNumber; i++) {
  //       this.headBtnArray.push(i);
  //     }
  //     this.tailBtnArray = [];
  //   } else {
  //     if (this.pageNumber - this.indexBtnLimit <= 2) {
  //       this.headBtnArray = [];
  //       for (let i = 1; i <= this.pageNumber; i++) {
  //         this.headBtnArray.push(i);
  //       }
  //       this.tailBtnArray = [];
  //     } else {
  //       if (this.currentPage / this.indexBtnLimit < 1) {
  //         if (this.indexBtnLimit - this.currentPage % this.indexBtnLimit >= 2) {
  //           this.headBtnArray = [];
  //           for (let i = 1; i <= this.indexBtnLimit; i++) {
  //             this.headBtnArray.push(i);
  //           }
  //           this.tailBtnArray = [];
  //         } else {
  //           this.headBtnArray = [];
  //           for (let i = 1; i <= this.indexBtnLimit + 1; i++) {
  //             this.headBtnArray.push(i);
  //           }
  //           this.tailBtnArray = [];
  //         }
  //       } else if (this.currentPage / this.indexBtnLimit == 1) {
  //         this.headBtnArray = [];
  //         for (let i = 1; i <= this.indexBtnLimit + 2; i++) {
  //           this.headBtnArray.push(i);
  //         }
  //         this.tailBtnArray = [];
  //       } else {
  //         this.headBtnArray = [1, 2];
  //         this.tailBtnArray = [];
  //         let startBtn = this.currentPage - 2;
  //         let endBtn = this.currentPage + 2;
  //         if (endBtn > this.pages.length) {
  //           this.tailBtnArray = this.pages.slice(
  //             this.pages.length - this.indexBtnLimit, this.pages.length);
  //         } else {
  //           this.tailBtnArray = this.pages.slice(startBtn - 1, endBtn);
  //         }
  //       }
  //     }
  //   }
  // }

  // goPrevious(){
  //   if(this.currentPage > 1){
  //     console.log('turn to page ', this.currentPage-1);
  //     this.getPage(this.currentPage-1);
  //   }
  //   this.btnValid();
  //   this.prepareBtnDisplayArray();
  // }

  // goNext(){
  //   if(this.currentPage < this.pageNumber){
  //     console.log('turn to page ', this.currentPage+1);
  //     this.getPage(this.currentPage+1);
  //   }
  //   this.btnValid();
  //   this.prepareBtnDisplayArray();
  // }

  // goFirst(){
  //   if(this.currentPage > 1){
  //     console.log('turn to page ', 1);
  //     this.getPage(1);
  //   }
  //   this.btnValid();
  //   this.prepareBtnDisplayArray();
  // }

  // goEnd(){
  //   if(this.currentPage < this.pageNumber){
  //     console.log('turn to page ', this.pages.length);
  //     this.getPage(this.pages.length);
  //   }
  //   this.btnValid();
  //   this.prepareBtnDisplayArray();
  // }


}