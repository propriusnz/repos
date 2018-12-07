import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { getTreeControlFunctionsMissingError } from '@angular/cdk/tree';
import { UserService } from '../../../../services/servercalls/user.service';
import { AlertNotificationService } from '../../../../services/support/alert-notification.service';


@Component({
  selector: 'app-order-cancel-dialog',
  templateUrl: './order-cancel-dialog.component.html',
  styleUrls: ['./order-cancel-dialog.component.css']
})
export class OrderCancelDialogComponent implements OnInit {

  refund_amount: any;
  total_price: any;
  total_course : any;
  course_remain: any;
  flat_rate: any;

  constructor(
    // private dialog: MatDialog,
    private dialogRef: MatDialogRef<OrderCancelDialogComponent>,    
    private userService: UserService,
    private alertService:AlertNotificationService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data['data']);
    this.data = this.data['data']
    this.total_price = this.data.order_price;
    this.total_course = this.data.order_quantity;
    this.course_remain = this.data.order_remain;
    this.flat_rate = this.data.course_price;
    this.refund_amount = this.getRefund();
  }

  getRefund(){
    this.refund_amount = this.total_price - (this.total_course - this.course_remain)*this.flat_rate;
    if(this.refund_amount>=0){
      return this.refund_amount;
    }else{
      return 0;
    }
  }

  cancelOrder(){
    let price = {
      price: this.refund_amount,
    }
    this.userService.updateOrderCancel(this.data.order_id, price).subscribe(
      (res)=>{
        console.log(res)
        this.alertService.sendSuccess('Refund successed, your money has already saved in your credit!');
        this.dialogRef.close();
      },
      (err)=>{
        console.log(err)
        this.alertService.serviceErrorAlert(err);
      }
    )
  }

}
