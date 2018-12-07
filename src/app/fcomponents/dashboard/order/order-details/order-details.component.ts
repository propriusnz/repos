import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { OrderCancelDialogComponent } from '../order-cancel-dialog/order-cancel-dialog.component'


@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  constructor(
    private dialog: MatDialog,

    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.data = this.data.order;
    console.log(this.data);
  }

  refund() {
    let dialogRef = this.dialog.open(OrderCancelDialogComponent,
      {
        panelClass: 'dialog1',
        data: {
          data: this.data,
          //here should pass the order id to dialog component.
        },
      });
  }
}
