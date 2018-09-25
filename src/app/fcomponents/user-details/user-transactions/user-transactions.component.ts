import { Component, OnInit, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { LOCAL_STORAGE , WINDOW } from '@ng-toolkit/universal';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { FormControl, FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { UserTransactionsActionsDialogComponent } from '../user-transactions-actions-dialog/user-transactions-actions-dialog.component';
import * as moment from 'moment';
// import * as jsPDF from 'jspdf';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PdfCreationService } from '../../../services/support/pdf-creation.service';
import { LearnerService } from '../../../services/servercalls/learner.service';
import { TutorService } from '../../../services/servercalls/tutor.service';

@Component({
  selector: 'app-user-transactions',
  templateUrl: './user-transactions.component.html',
  styleUrls: ['./user-transactions.component.css']
})
export class UserTransactionsComponent implements OnInit {
  isBrowser=false
  // user can choose the transaction times
  startDate: any;
  start: any;
  endDate: any;
  timeMes = false;
  range = [];

  content: { ber; date_of_session: string; session_status: string; student: string; quantity: number; hourly_rate: number;description: string; amount: number; };
  transaction=[]; 
  trans=[]; // for data display
  totalHour = 0;// total session hour for invoice
  totalAmount = 0; // total session dollars for invoice
  dateStatus = false;
  descriptionIndex=[];// used for description collapse drop down button
  dropIndex=[];// for the overall loop number
  originalData = [];
  billInfo= {
    // company: '',
    // street: '',
    // suburban: '',
    // city: '',
    // country: '',
    // invoiceNumber: '',
    // invoiceDate: '',
    // billId: '',
    // accountId: '',
    // tax: 0,
    name: '',
    allAmount: 0,
    allHour: 0
  };
  // for invoice print
  title = 'app';
  inputData: string;
  paper: any;
  // for invoice print end
  role: number;
  showPdfButton = false;
  showWarningMes = true;
  showTable = false;
  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(WINDOW) private window: Window,
    @Inject(LOCAL_STORAGE) private localStorage: any,
    private dialog: MatDialog,
    private elem: ElementRef,
    private pdfCreation: PdfCreationService,
    private learnerService: LearnerService,
    private tutorService: TutorService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true
    }
    if(this.isBrowser = false ){
      return;
    }
    this.endDate = new FormControl(moment().format());
    this.start = moment().subtract(30, 'days');
    this.startDate = new FormControl(this.start.format());
    
    this.range = [this.start.format().substr(0, 19), moment().format().substr(0, 19)];
    this.role = Number(localStorage.getItem('lsaWho'));

  }

  ngOnInit() {
    if (this.isBrowser) {
        // Client only code.

      // console.log(this.range);
      // // set billinfo
      // let userFirstName = JSON.parse(sessionStorage.getItem('lsaSpTutorInfo')).first_name;
      // this.billInfo['name'] = userFirstName;
      // learner or applicant role
      if (this.role === 1 || this.role === 2) {
      this.getLearnerTransactions();
      }
      // tutor role
      // if (this.role === 3) {
      //   console.log(this.role);
      //   this.getTutorTransactions();
      // }
    }
  }
  // get transactions and put in originalData variable
  // learner role or applicant role
  getLearnerTransactions() {
    this.learnerService.indexLearnerTransactions(this.range).subscribe(res => {
      let transactions = res['dataCon'];
      console.log(transactions);
      if (transactions.length !== 0) {
        this.showTable = true;
        this.showWarningMes = false;
        this.originalData = this.mapData(transactions);
        console.log(this.originalData);
        // calculate data
        let initialStart = this.range[0];
        let initialEnd = this.range[1];
        this.calculateData(initialStart, initialEnd);
        // show generate pdf invoice button
        this.showPdfButton = true;
      }
    });
  }
  // tutor role
  getTutorTransactions() {
    this.tutorService.indexTutorTransactions(this.range).subscribe(res => {
      let transactions = res['dataCon'];
      console.log(transactions);
      if (transactions.length !== 0) {
        this.showTable = true;
        this.showWarningMes = false;
        this.originalData = this.mapData(transactions);
        console.log(this.originalData);
        // calculate data
        let initialStart = this.range[0];
        let initialEnd = this.range[1];
        this.calculateData(initialStart, initialEnd);
        // show generate pdf invoice button
        this.showPdfButton = true;
      }
    });
  }

  setStatus(e){
    let status = '';
    switch(e) {
      case 'before-unconfirmed':  status = 'not-paid, yet to confirm';  break;
      case 'before-canceled':   status = 'not paid, canceled';  break;
      case 'before-confirmed-payfail':   status = 'Confirmed, pay failed';  break;
      case 'before-confirmed-payfail-cancel':   status = 'Canceled as Not paid';  break;
      case 'before-confirmed-normal':   status = 'Paid';  break;
      case 'before-confirmed-cancel-early':   status = 'Canceled, refunded';  break;
      case 'before-confirmed-cancel-late':   status = 'Canceled, partial refund';  break;

      case 'after-normal':   status = 'Paid';  break;
      case 'after-dispute-refund-total':   status = 'Dispute, total refund';  break;
      case 'after-dispute-refund-partial':   status = 'Dispute, partial refund';  break;
      case 'after-dispute-declined':   status = 'Dispute, declined';  break;
      default:  status = 'not-paid, yet to confirm';
    }
    return status;
  }
  // map data
  mapData(transactions: any[]) {
    console.log(transactions);
    let data = transactions.map(e => {
      return {
        date_of_session: e.transaction_date,
        session_status: this.setStatus(e.payment_status),// transfer status
        student: e.buyer_name,
        tutor: e.seller_name,
        quantity: e.quantity,
        hourly_rate: e.unit_price,
        description: e.description,
        transaction_id: e.transaction_id,
        amount: Number((e.unit_price * e.quantity).toFixed(2))
      };
    });
    return data;
  }
  calculateData(start, end) {
    // calculate the original data basing on the selected input start and end date
    this.trans = [];
    this.dropIndex = [];
    this.totalHour = 0;
    this.totalAmount = 0;
    this.transaction = this.originalData;
    for(let i =0; i < this.transaction.length; i++) {
      let startStatus = moment(this.transaction[i].date_of_session).isAfter(start);
      let endStatus = moment(this.transaction[i].date_of_session).isBefore(end);
      console.log(startStatus,endStatus);
      if(startStatus && endStatus) {
        // change date format
        let x = this.transaction[i].date_of_session;
        x = moment(x).format('lll');
        console.log(x);
        this.transaction[i].date_of_session = x;
        // add into new trans array
        this.trans.push(this.transaction[i]);
        this.totalHour += this.transaction[i].quantity;
        this.totalAmount += Number(this.transaction[i].amount);
      }
    }
    for ( let i = 0; i < this.trans.length; i++) {
      this.dropIndex.push(i); // is for front page table row loop
      let index ='desciption' + i;
      this.descriptionIndex.push(index); // is for the collapse id number
    }
    console.log(this.trans, this.dropIndex, this.transaction, this.originalData);
    // update bill info
    this.billInfo['allAmount'] = this.totalAmount;
    this.billInfo['allHour'] = this.totalHour;
    this.billInfo['name'] = this.originalData[0].student;
  }

  resetTransactions() {
    let start = this.startDate.value;
    let end = this.endDate.value;
    console.log(start);
    if (moment(end).isSameOrBefore(moment(start))) {
      this.timeMes = true;
    } else {
      // hide warning message
      this.timeMes = false;
      let s_time = moment(start).format().substr(0, 19);
      let e_time = moment(end).format().substr(0, 19);
      // console.log('234');
      // this.calculateData(start,end);
      // update this.range
      this.range[0] = s_time;
      this.range[1] = e_time;
      console.log(this.range);
      // update sessions
      this.ngOnInit();
    }
  }
  dispute(event) {
    // get transaction id
    let trans_id = event.srcElement.id.slice(3);
    // dispute action
    let sessionID = Number(event.srcElement.id.slice(3));
    let dialogRef = this.dialog.open(UserTransactionsActionsDialogComponent,
      {
        panelClass: 'dialog1',
        data: sessionID,
      });
    dialogRef.afterClosed().subscribe(
      (res) => {
        console.log(res);
        if (res) {
          this.sendDisputeToServer(trans_id, res);
          // this.sendReport(sessionID, res);
        }
      },
      (err) => console.warn(err)
    );
  }
  MakePayment(x){
    // x is the session id
    let transid = this.originalData[x].transaction_id;
    this.learnerService.updateLearnerPayment(transid).subscribe(res=>{
      console.log(res);
    });
    console.log(transid);
  }
  createPdf() {
    let sourceDom = document.getElementById('template_paper');
    console.log(sourceDom, this.billInfo, this.trans);
    this.pdfCreation.createTransPdf(sourceDom, this.billInfo, this.trans);
  }

   // send to server
   sendDisputeToServer(transactionId, reportData) {
    this.learnerService.updateLearnerDispute(transactionId, reportData).subscribe(res => {
      console.log(res);
    }, err => {
      console.warn(err);
    });
  }
  // this is the final exam
  // create(){
  //   let paperTitleDom=document.getElementById('paper_title');
  //   let paperContentDom=document.getElementById('paper_content');
  //   let sourceDom = document.getElementById("template_paper");
  //   this.pdfCreation.createExamPdf(paperTitleDom, paperContentDom, sourceDom);
  // }
}
