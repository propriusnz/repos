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
  tabs = [{ name: 'All', filter: 'all' },
  { name: 'Completed', filter: 'completed' },
  { name: 'Processing', filter: 'processing' },
  { name: 'Cancel', filter: 'cancel' }
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

    this.learnerServive.userOrder().subscribe(
      (res) => {
        console.log(res);

        if (res['allOrders'].length) {
          this.buyerOrders = this.getAllOrders(res['allOrders']);
          this.loading = false;
          this.getPage(1);
          console.log(this.buyerOrders);
        } else {
          this.buyerOrders = null;
        }

      },
      (err) => { console.log(err), this.errorMessage = "Sorry, but something went wrong." }
    )

    //this.buyerOrders = this.orders;


  }
  getFilterOrder(status) {
  let filterOrders;
  if (status === 'all')
    filterOrders= this.buyerOrders
  else
    filterOrders = this.buyerOrders.filter(e => e.order_status === status)

    this.totalPosts = filterOrders.length;
    //this.currentPage = page;
    this.pageNumber = Math.ceil(filterOrders.length / this.perPage);
    this.pages=[];
    if (this.pageNumber > 1) {
      for (let i = 1; i < this.pageNumber + 1; i++) {
        this.pages.push(i);
      }
      console.log(this.pages);
    } else {
      this.pages.push(1);
    }
    return filterOrders.slice((this.currentPage-1) * this.perPage, this.currentPage*this.perPage);
  }
  // make website turn to this specific page
  getPage(page: number) {
    this.currentPage = page;
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
      let orderStatus: any;
      if (orderCancelTime != null) {
        orderStatus = "refund";
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
  goSchedule(orderId,tutorId) {
    //this.router.navigate(['/app/']);
    this.router.navigate(['/app/dashboard/learner/schedule/' + orderId + '/' + tutorId]);
  }

}


