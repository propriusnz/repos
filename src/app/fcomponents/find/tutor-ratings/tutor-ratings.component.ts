import { Component, OnInit, Inject, PLATFORM_ID ,Input} from '@angular/core';
import {WINDOW} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import { CommonSupportService } from '../../../services/support/common-support.service';
import { PaginationComponent } from '../../basic/Pagination/pagination.component';

@Component({
  selector: 'app-tutor-ratings',
  templateUrl: './tutor-ratings.component.html',
  styleUrls: ['./tutor-ratings.component.css']
})
export class TutorRatingsComponent implements OnInit {
  @Input() tutorKey: object;  
  @Input() tutorFeedback: any;
  @Input() tutorAwards:any;
  isBrowser = false;

  // pagination stuff
  display: Window;
  totalPosts: number;
  pages = [];
  currentPage = 0;
  pageNumber = 0;
  perPage = 3;
  prevBtnDisable = false;
  nextBtnDisable = false;
  pageActive: boolean[] = [];
  // make pageNumber button background color
  indexBtnLimit = 5;
  // array for head display buttons
  headBtnArray: number[] = [];
  // array for tail display buttons
  tailBtnArray: number[] = [];
  rate = {ratings: 300,  rates: 1200};
  bages = [
    {name: '', capacity: 12, src: '././assets/images/rating/1.svg', color: 'badge-yellow'},
    {name: '', capacity: 42, src: '././assets/images/rating/2.svg', color: 'badge-blue'},
    {name: '', capacity: 15, src: '././assets/images/rating/3.svg', color: 'badge-pink'},
    {name: '', capacity: 66, src: '././assets/images/rating/4.svg', color: 'badge-dark-green'},
    {name: '', capacity: 27, src: '././assets/images/rating/5.svg', color: 'badge-purple'},
    {name: '', capacity: 0, src: '././assets/images/rating/6.svg', color: 'badge-dark-blue'},
    {name: '', capacity: 8, src: '././assets/images/rating/7.svg', color: 'badge-brown'},
    {name: '', capacity: 1, src: '././assets/images/rating/8.svg', color: 'badge-blue'},
    {name: '', capacity: 2, src: '././assets/images/rating/9.svg', color: 'badge-light-red'},
    {name: '', capacity: 0, src: '././assets/images/rating/11.svg', color: 'badge-blue'},
    {name: '', capacity: 0, src: '././assets/images/rating/12.svg', color: 'badge-orange'},
    {name: '', capacity: 0, src: '././assets/images/rating/13.svg', color: 'badge-light-green'},
    {name: '', capacity: 0, src: '././assets/images/rating/14.svg', color: 'badge-yellow'}
    ];
  comments= [];
    // comments = [
  //   {name: 'XXX', img: '././assets/tutorpics/front1.jpg', content: 'Florence is a very nice and friendly teacher, I enjoy talking with her a lot. She is very thoughtful to take notes on my grammar mistakes and share the notes to me after the class, and she will point out in the notes about the vocabulary that I used well and the vocabulary that I used improperly. I feel grateful for her efforts into every class and I can feel my growth every time after I talked with her.', comment_date: '2017-02-24', lessons: 5},
  //   {name: 'YYY', img: '././assets/tutorpics/front2.jpg', content: 'this session i had with her is more relaxing... she encouraged me to give my opinion on certain things, and it helped to improve my ability to answer a question spontaneously and talk what\'s inside my mind. then, at the end of the session, we discussed the mistakes that i made and some new voxabulary that i could use, and proper way of saying something. this session i had with her is more relaxing... she encouraged me to give my opinion on certain things, and it helped to improve my ability to answer a question spontaneously and talk what\'s inside my mind. then, at the end of the session, we discussed the mistakes that i made and some new voxabulary that i could use, and proper way of saying something.', comment_date: '2017-03-09', lessons: 6},
  //   {name: 'ZZZ', img: '././assets/tutorpics/front3.jpg', content: 'Hi Hi Hi', comment_date: '2017-04-28', lessons: 8},
  //   {name: 'ZZZ', img: '././assets/tutorpics/front3.jpg', content: 'Hi Hi Hi Hi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi HiHi Hi Hi,,,,,,,,,,,,,,,,,,Hi Hi HiHi Hi HiHi Hi Hi', comment_date: '2017-04-28', lessons: 8}
  // ];
  page_comments: any;


  constructor(
    @Inject(PLATFORM_ID)
    private platformId,
    @Inject(WINDOW)
    private window: Window,
    private commonSupport: CommonSupportService,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true;
    }
    this.display = window;
  }

  ngOnInit() {

  }
  ngOnChanges(){
    // this.rate={ratings: 300,  rates: 1200};
    let tutorAwards = this.tutorAwards;  
    let tutorFeedback = this.tutorFeedback;
    if (!this.tutorKey) return;
   

    this.rate.ratings = this.tutorKey['num_customer_rated'];
    this.rate.rates = this.tutorKey['ratings'];
    if (this.tutorAwards){
      tutorAwards.forEach(element => {
        element = Object.assign(element, this.bages[element.id]);     
      });
    } 
    tutorFeedback.map(e=>{
      e.name=e.id;
      e.img=this.commonSupport.findUserImg(e.learner_id);      
      e.content=e.comment; 
      e.comment_date=e.created_at;
    })
    this.comments=tutorFeedback;
    this.page_comments = tutorFeedback;
    this.getPage(1);    
  }
  readMore(event) {
    const id = event.srcElement.id;
    $('#' + id).prev().removeClass('overRead');
    $('#' + id).css('display', 'none');
  }

  getPage(page) {
    this.pages = [];
    this.totalPosts = this.comments.length;
    this.currentPage = page;
    this.pageNumber = Math.ceil(this.totalPosts / this.perPage);
    if (this.pageNumber >= 1) {
      for (let i = 1; i < this.pageNumber + 1; i++) {
        this.pages.push(i);
      }
      console.log(this.pages);
    }
    this.page_comments = this.comments.slice((this.currentPage -1)*this.perPage, this.currentPage * this.perPage);
    console.log(this.page_comments);
    //this.pageNumActive(page);
    //this.btnValid();
    //this.prepareBtnDisplayArray();
    $(document).ready(function () {
      $('.read-more').each(function () {
        if ($(this).prev().height() === 90) {
          $(this).css('display', 'block');
        }
      });
    });
  }


}
