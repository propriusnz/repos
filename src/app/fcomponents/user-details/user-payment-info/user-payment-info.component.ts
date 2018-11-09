import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { StripePaymentComponent } from '../../support/stripe-payment/stripe-payment.component';
import { PaymentService } from '../../../services/servercalls/payment.service';
@Component({
  selector: 'app-user-payment-info',
  templateUrl: './user-payment-info.component.html',
  styleUrls: ['./user-payment-info.component.css']
})
export class UserPaymentInfoComponent implements OnInit {
  //display error
  errorObj = {hasError:false,errMsg:''};
  // user information
  userpaymentMethods = [];
  // has payment info
  hasPaymentInfo: boolean = false;

  // dialog width and height
  dialogWidth: number = 500;
  dialogHeight: number = 420;

  constructor(
    public dialog: MatDialog,
    private paymentService: PaymentService,
  ) { }

  ngOnInit() {
    this.getData();
  }
  getData(){
    this.paymentService.Userpaymethod().subscribe(
      result => {
        console.log(result);        
        if (result['userPaymentInfo'].length===0) return ;
        //only display the default card
        this.userpaymentMethods = result['userPaymentInfo'].filter(element=>element.default===1);
        if (this.userpaymentMethods.length>=1)
          this.hasPaymentInfo = true;
      },
      error => {
        console.log(error);        
        this.errorObj = {hasError:true, errMsg:'Server or Network error occurred ,please try again or contact the administrator'};
        console.log(this.errorObj );                
      }
    );
  }
  // modify payment card, paremeter:type,1 'save', 2 'change'
  modifyPaymentCard(type) {
    console.log("Modify Card");
    this.errorObj = {hasError:false,errMsg:''};
    // convert dialog width and height
    let actionType = (type===1?'save':'change');
    let wd = this.dialogWidth.toString();
    let ht = this.dialogHeight.toString();
    let extraObject = {
      hasPaymentInfo: false,
      action: actionType
    };
    const dialogRef = this.dialog.open(StripePaymentComponent, {
      disableClose: true,
      width: wd + 'px',
      height: ht + 'px',
      data: {
        width: wd + 'px',
        height: ht + 'px',
        extraObject: extraObject
      }
    });
    this.getData();    
  }

  // delete card
  deletePaymentCard() {
    console.log("Delete card");
    this.paymentService.deletepaymethod().subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);        
        this.errorObj = {hasError:true,errMsg:'Server or Network error occurred ,please try again or contact the administrator'};
      }
    );
  }
}
