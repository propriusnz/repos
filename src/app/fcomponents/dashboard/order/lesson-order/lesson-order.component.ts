import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import {OrderDetailsComponent} from '../order-details/order-details.component';
import {MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-lesson-order',
  templateUrl: './lesson-order.component.html',
  styleUrls: ['./lesson-order.component.css']
})
export class LessonOrderComponent implements OnInit {
  orders = [
    {tutor: 'ABC', class: 'English', amount: 2, price: 12, tutor_img: '././assets/tutorpics/front1.jpg', status: 'Paid', order_time: '2018-06-06', paid_time: '2018-06-06', classed: 1, booking: 1},
    {tutor: 'DFG', class: 'Maths', amount: 3, price: 1, tutor_img: '././assets/tutorpics/front2.jpg', status: 'Refund', order_time: '2018-08-28', paid_time: '2018-08-28', classed: 1, booking: 0},
    {tutor: 'XYZ', class: 'Chinese', amount: 1, price: 10, tutor_img: '././assets/tutorpics/front3.jpg', status: 'Unpaid', order_time: '2018-03-21', paid_time: null, classed: 0, booking: 0},
    {tutor: 'City', class: 'Maths', amount: 5, price: 101, tutor_img: '././assets/tutorpics/front4.jpg', status: 'Paid', order_time: '2018-07-12', paid_time: '2018-07-12', classed: 2, booking: 2},
    {tutor: 'Manu', class: 'Maths', amount: 12, price: 200, tutor_img: '././assets/tutorpics/front5.jpg', status: 'Finished', order_time: '2018-09-30', paid_time: '2018-09-30', classed: 12, booking: 0},
    {tutor: 'Hooo', class: 'English', amount: 2, price: 12, tutor_img: '././assets/tutorpics/front1.jpg', status: 'Unpaid', order_time: '2018-04-25', paid_time: null, classed: 0, booking: 0}
  ]
  displayedColumns: string[] = ['tutor', 'lessons', 'amount', 'price', 'status', 'apply'];
  all = this.orders;
  progressing = this.orders.filter(value => value.status === 'Paid');
  unpaid = this.orders.filter(value => value.status === 'Unpaid');
  refund = this.orders.filter(value => value.status === 'Refund');
  finished = this.orders.filter(value => value.status === 'Finished');
  order_time = 'all';

  dialogRef: MatDialogRef<OrderDetailsComponent>;

  constructor(
    public dialog: MatDialog
    ) {
  }

  ngOnInit() {

  }

  showDetail(order) {
    const dialogRef = this.dialog.open(OrderDetailsComponent, {
      width: '900px',
      data: {tutor: order.tutor, class: order.class, amount: order.amount, price: order.price, image: order.tutor_img, status: order.status, orderTime: order.order_time, paidTime: order.paid_time, finished: order.classed, booking: order.booking}
      });
  }
}


