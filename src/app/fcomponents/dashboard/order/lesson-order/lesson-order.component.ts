import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { OrderDetailsComponent } from '../order-details/order-details.component';
import { MatDialog, MatDialogRef } from '@angular/material';
import { LearnerService } from '../../../../services/servercalls/learner.service';
import { CommonSupportService } from '../../../../services/support/common-support.service';
import { Router } from '@angular/router';
import { PaginationComponent } from '../../../basic/Pagination/pagination.component';
import { all } from 'q';

@Component({
  selector: 'app-lesson-order',
  templateUrl: './lesson-order.component.html',
  styleUrls: ['./lesson-order.component.css']
})
export class LessonOrderComponent implements OnInit {
  
  loading = true;
  buyerOrders: any;
  pageOrders: any;
  errorMessage: string;
  currentPage: number;
  pageNumber: number;
  totalPosts: number;
  pages = [];
  perPage = 10;
  currentTab:any;
  tabs = [{
    name: 'All', filter: 'all', orders: [], pagenation: {
      currentPage: this.currentPage,
      pageNumber: this.pageNumber,
      totalPosts: this.totalPosts,
      pages: this.pages,
    }
  },
  {
    name: 'Completed', filter: 'completed', orders: [], pagenation: {
      currentPage: this.currentPage,
      pageNumber: this.pageNumber,
      totalPosts: this.totalPosts,
      pages: this.pages,
    }
  },
  {
    name: 'Processing', filter: 'processing', orders: [], pagenation: {
      currentPage: this.currentPage,
      pageNumber: this.pageNumber,
      totalPosts: this.totalPosts,
      pages: this.pages,
    }
  },
  {
    name: 'Cancel', filter: 'cancel', orders: [], pagenation: {
      currentPage: this.currentPage,
      pageNumber: this.pageNumber,
      totalPosts: this.totalPosts,
      pages: this.pages,
    }
  }
  ];


  dialogRef: MatDialogRef<OrderDetailsComponent>;

  constructor(
    public dialog: MatDialog,
    private learnerServive: LearnerService,
    private commonSupport: CommonSupportService,
    private router: Router,

  ) {
  }

  ngOnInit() {
    console.log(typeof (this.tabs))
    this.currentTab = 'all';
    this.buyerOrders = { 'all': [], 'completed': [], 'processing': [], 'cancel': [] }
    this.learnerServive.userOrder().subscribe(
      (res) => {
        this.loading = false;        
        console.log(res);

        if (res['allOrders'].length) {
          this.buyerOrders['all'] = this.getAllOrders(res['allOrders']);
          console.log(this.buyerOrders)

          this.getPage(1);
          //console.log(this.buyerOrders);
          //this.getFilterOrder();
          console.log(this.tabs)
          console.log(this.tabs[0].pagenation)
        } else {
          this.buyerOrders = null;
        }

      },
      (err) => { console.log(err), this.errorMessage = "Sorry, but something went wrong." }
    )

    //this.buyerOrders = this.orders;
  }

  //init tabs at the first page
  getFilterOrder() {
    let filterOrders;

    for (let i in this.tabs) {
      //console.log(this.tabs[i])

      if (this.tabs[i].filter === 'all') {
        filterOrders = this.buyerOrders[this.tabs[i].filter]
        console.log(this.tabs[i].filter, filterOrders)
      } else {
        filterOrders = this.buyerOrders['all'].filter(e => e.order_status === this.tabs[i].filter)
        this.buyerOrders[this.tabs[i].filter] = filterOrders;
        console.log(this.tabs[i].filter, filterOrders)
      }

      this.totalPosts = filterOrders.length;
      console.log(this.totalPosts)
      //this.currentPage = page;
      this.pageNumber = Math.ceil(this.totalPosts / this.perPage);
      this.pages = [];
      if (this.pageNumber > 1) {
        for (let i = 1; i < this.pageNumber + 1; i++) {
          this.pages.push(i);
        }
      } else {
        this.pages.push(1);
      }
      console.log(this.currentPage, this.totalPosts, this.pages, this.pageNumber);

      this.tabs[i].pagenation.currentPage = this.currentPage;
      this.tabs[i].pagenation.totalPosts = this.totalPosts;
      this.tabs[i].pagenation.pageNumber = this.pageNumber;
      this.tabs[i].pagenation.pages = this.pages;

      this.tabs[i].orders = filterOrders.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
    }
    console.log(this.buyerOrders, this.tabs)

  }
  // make website turn to this specific page
  getPage(page: number) {
    this.currentPage = page;

    this.getFilterOrder();

    // for (let i in this.tabs) {
    //   this.totalPosts = this.buyerOrders[i].length;
    //   this.pageNumber = Math.ceil(this.totalPosts / this.perPage);
    //   this.pages = [];
    //   if (this.pageNumber > 1) {
    //     for (let i = 1; i < this.pageNumber + 1; i++) {
    //       this.pages.push(i);
    //     }
    //     console.log(this.pages);
    //   } else {
    //     this.pages.push(1);
    //   }
    // }
  }

  getAllOrders(ordersList: any) {
    let orderList = ordersList.map(e => {
      let order = e.order;
      let tutor = e.tutor_key;
      let lesson = e.course_keys;
      let newObj = {};

      let orderId = order.order_id;
      let orderTime = order.created_at;
      let orderPrice = order.order_price;
      let orderQuantity = order.order_quantity;
      let orderCancelTime = order.canceled_time;
      let orderRemain = order.order_quantity_left;
      let coursePrice = tutor.price_1;
      let orderStatus: any;
      if (orderCancelTime != null) {
        orderStatus = "cancel";
      } else if (orderRemain == '0') {
        orderStatus = "completed";
      } else {
        orderStatus = "processing"
      }

      let tutorId = tutor.id;
      let tutorName = tutor.first_name;
      let tutorImg = this.commonSupport.findUserImg(tutorId);

      let lessonName = lesson.course_title;

      newObj = {
        order_id: orderId,
        order_time: orderTime,
        order_price: orderPrice,
        order_quantity: orderQuantity,
        order_remain: orderRemain,
        order_status: orderStatus,
        tutor_id: tutorId,
        tutor_name: tutorName,
        tutor_img: tutorImg,
        lesson_name: lessonName,
        course_price: coursePrice,
      }
      return newObj;
    })
    return orderList;
  }

  showDetail(order) {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      width: '900px',
      data: { order }
    });
  }
  goSchedule(idx) {
    //this.router.navigate(['/app/']);
    this.router.navigate(['/app/dashboard/learner/schedule/' + this.buyerOrders[idx].order_id + '/' + this.buyerOrders[idx].tutor_id]);
  }

}


