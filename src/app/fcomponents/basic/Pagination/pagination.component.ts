import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { WINDOW } from '@ng-toolkit/universal';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage = 0;
  @Input() pageNumber = 0;
  @Input() pages = [];
  @Input() totalPosts = 0;
  @Input() perPage = 0;

  @Output() getthePage: EventEmitter<number> = new EventEmitter<number>();

  display: Window;
  prevBtnDisable = false;
  nextBtnDisable = false;
  pageActive: boolean[] = [];
  indexBtnLimit = 5;



  // array for head display buttons
  headBtnArray: number[] = [];
  // array for tail display buttons
  tailBtnArray: number[] = [];



  constructor(
    @Inject(WINDOW)
    private window: Window,
  ) {
    this.display = window;

  }

  //

  ngOnInit() {
    this.prepareBtnDisplayArray();
    this.btnValid();
    //console.log(this.pageNumber)
  }

  ngOnChanges() {
    //console.log("changed");
    //console.log(this.pages);

    this.btnValid();
    this.pageNumActive(this.currentPage);

  }

  // check 'prevBtn' and 'nextBtn' valid
  btnValid() {
    this.prevBtnDisable = false;
    this.nextBtnDisable = false;
    //console.log(this.currentPage)
    if (this.currentPage <= 1 && this.pageNumber > 1) { this.prevBtnDisable = true; }
    else if (this.currentPage <= 1 && this.pageNumber <= 1) { this.prevBtnDisable = true; this.nextBtnDisable = true; }
    else if (this.currentPage >= this.pageNumber) { this.nextBtnDisable = true; }
  }
  // check pageNum is active with blue background color or not
  pageNumActive(page) {
    for (let i = 0; i <= this.pageNumber; i++) {
      if (page != i) {
        this.pageActive[i] = false;
      } else {
        this.pageActive[i] = true;
      }
    }

    console.log(this.pageActive)
  }

  // make website turn to this specific page
  getPage(page: number) {
    //console.log(page);
    this.window.scroll(0, 0);
    // this.router.navigate(['/app/community/posts'], {queryParams: {page}} );
    this.getthePage.emit(page)
    this.pageNumActive(page);
    this.btnValid();
    this.prepareBtnDisplayArray();
  }

  // when 'prev' or 'next' button click of mat-paginator (small screen)
  changed($event) {
    console.log('getPage function works!!!!');
    console.log($event);
    let index = $event.pageIndex;
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
        } else if (this.currentPage / this.indexBtnLimit == 1) {
          this.headBtnArray = [];
          for (let i = 1; i <= this.indexBtnLimit + 2; i++) {
            this.headBtnArray.push(i);
          }
          this.tailBtnArray = [];
        } else {
          this.headBtnArray = [1, 2];
          this.tailBtnArray = [];
          let startBtn = this.currentPage - 2;
          let endBtn = this.currentPage + 2;
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

  goFirst() {
    if (this.currentPage > 1) {
      console.log('turn to page ', 1);
      this.getPage(1);
    }
    this.btnValid();
    this.prepareBtnDisplayArray();
  }

  goEnd() {
    if (this.currentPage < this.pageNumber) {
      console.log('turn to page ', this.pages.length);
      this.getPage(this.pages.length);
    }
    this.btnValid();
    this.prepareBtnDisplayArray();
  }
}
