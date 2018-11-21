import { Component, OnInit, Inject, PLATFORM_ID ,Input} from '@angular/core';
import {WINDOW} from '@ng-toolkit/universal';
import {isPlatformBrowser} from '@angular/common';
import { CommonSupportService } from '../../../services/support/common-support.service';

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
  total: number;
  pages = [];
  currentPage = 0;
  pageNumber = 0;
  perPage = 2;
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
    this.getPage(1);
      }
  ngOnChanges(){
    // this.rate={ratings: 300,  rates: 1200};
    let tutorAwards = this.tutorAwards;  
    let tutorFeedback = this.tutorFeedback;
    if (!this.tutorKey) return;

    this.rate.ratings = this.tutorKey['num_customer_rated'];
    this.rate.rates = this.tutorKey['ratings']; 
    tutorAwards.forEach(element => {
      element = Object.assign(element, this.bages[element.id]);     
    }); 
    tutorFeedback.map(e=>{
      e.name=e.id;
      e.img=this.commonSupport.findUserImg(e.learner_id);      
      e.content=e.comment; 
      e.comment_date=e.created_at;
    })
    this.comments=tutorFeedback;
    this.page_comments = tutorFeedback;
  }
  readMore(event) {
    const id = event.srcElement.id;
    $('#' + id).prev().removeClass('overRead');
    $('#' + id).css('display', 'none');
  }

  getPage(page) {
    this.pages = [];
    this.total = this.comments.length;
    this.currentPage = page;
    this.pageNumber = Math.ceil(this.total / this.perPage);
    if (this.pageNumber >= 1) {
      for (let i = 1; i < this.pageNumber + 1; i++) {
        this.pages.push(i);
      }
      console.log(this.pages);
    }
    this.page_comments = this.comments.slice(this.currentPage * 2 - 2, this.currentPage * 2);
    console.log(this.page_comments);
    this.pageNumActive(page);
    this.btnValid();
    this.prepareBtnDisplayArray();
    $(document).ready(function () {
      $('.read-more').each(function () {
        if ($(this).prev().height() === 90) {
          $(this).css('display', 'block');
        }
      });
    });
  }

  // check pageNum is active with blue background color or not
  pageNumActive(page) {
    for (let i = 0; i <= this.pageNumber; i++) {
      if (page !== i) {
        this.pageActive[i] = false;
      } else {
        this.pageActive[i] = true;
      }
    }
    console.log(this.pageActive);
  }

  // check 'prevBtn' and 'nextBtn' valid
  btnValid() {
    this.prevBtnDisable = false;
    this.nextBtnDisable = false;
    if (this.currentPage <= 1) {
      this.prevBtnDisable = true;
    }
    else if (this.currentPage >= this.pageNumber) {
      this.nextBtnDisable = true;
    }
  }

  // when 'prev' or 'next' button click of mat-paginator (small screen)
  changed($event) {
    console.log('getPage function works!!!!');
    console.log($event);
    const index = $event.pageIndex;
    this.getPage(index + 1);
  }
  // prepare page display button array to limit how many pageNumber button shown
  prepareBtnDisplayArray() {
    this.headBtnArray = [];
    this.tailBtnArray = [];

    if (this.pageNumber <= this.indexBtnLimit) {
      this.headBtnArray = [];
      for (let i = 1; i <= this.pageNumber; i++) {
        this.headBtnArray.push(i);
      }
      this.tailBtnArray = [];
    } else {
      if (this.pageNumber - this.indexBtnLimit <= 2) {
        this.headBtnArray = [];
        for (let i = 1; i <= this.pageNumber; i++) {
          this.headBtnArray.push(i);
        }
        this.tailBtnArray = [];
      } else {
        if (this.currentPage / this.indexBtnLimit < 1) {
          if (this.indexBtnLimit - this.currentPage % this.indexBtnLimit >= 2) {
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
        } else if (this.currentPage / this.indexBtnLimit === 1) {
          this.headBtnArray = [];
          for (let i = 1; i <= this.indexBtnLimit + 2; i++) {
            this.headBtnArray.push(i);
          }
          this.tailBtnArray = [];
        } else {
          this.headBtnArray = [1, 2];
          this.tailBtnArray = [];
          const startBtn = this.currentPage - 2;
          const endBtn = this.currentPage + 2;
          if (endBtn > this.pages.length) {
            this.tailBtnArray = this.pages.slice(
              this.pages.length - this.indexBtnLimit, this.pages.length);
          } else {
            this.tailBtnArray = this.pages.slice(startBtn - 1, endBtn);
          }
        }
      }
    }
  }

  goPrevious() {
    if (this.currentPage > 1) {
      console.log('turn to page ', this.currentPage - 1);
      this.getPage(this.currentPage - 1);
    }
    this.btnValid();
    this.prepareBtnDisplayArray();
  }

  goNext() {
    if (this.currentPage < this.pageNumber) {
      console.log('turn to page ', this.currentPage + 1);
      this.getPage(this.currentPage + 1);
    }
    this.btnValid();
    this.prepareBtnDisplayArray();
  }
}
