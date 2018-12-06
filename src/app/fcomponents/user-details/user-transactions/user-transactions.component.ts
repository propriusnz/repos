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
  minDate:any;
  maxDate:any;
  timeMes = false;
  range = [];

  content: { ber; date_of_session: string; session_status: string; student: string; quantity: number; hourly_rate: number;description: string; amount: number; };
  dateValidator:boolean;
  transactions:any;
  totalHour = 0;// total session hour for invoice
  totalAmount:number = 0; // total session dollars for invoice
  dateStatus = false;
  descriptionIndex=[];// used for description collapse drop down button
  dropIndex=[];// for the overall loop number
  originalData = [];
  trans = [];
  searchNumber:number
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
    // allHour: this.totalHour
  };
  singlePrice=[]
  // for invoice print
  title = 'app';
  inputData: string;
  paper: any;
  // for invoice print end
  role: number;
  showPdfButton = false;
  showWarningMes = false;
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
    this.maxDate = moment().format();
    // this.start = moment().subtract(1, 'months');
    // this.startDate = new FormControl(this.start.format());
    // this.range = [this.start.format().substr(0, 19), moment().format().substr(0, 19)];
    // this.startDate = new FormControl(this.minDate);
    this.startDate = new FormControl();
    this.role = Number(localStorage.getItem('lsaWho'));
    this.billInfo['name'] = localStorage.getItem('lsaUserName')
  }

  ngOnInit() {
  // if (this.isBrowser) {
  //       Client only code.

  //     console.log(this.range);
  //     // set billinfo
  //     let userFirstName = JSON.parse(sessionStorage.getItem('lsaSpTutorInfo')).first_name;
  //     learner or applicant role
  //     if (this.role == 1 || this.role == 2) {
  //     this.getLearnerTransactions();
  //     }
  //     tutor role
  //     if (this.role === 3) {
  //       console.log(this.role);
  //       this.getTutorTransactions();
  //     }
  //           console.log("role:"+this.role)
  //   }
      if (this.role == 1 || this.role == 2) {
        this.getLearnerTransactions();
        console.log("role:"+this.role)
        }
    // this.learnerService.showLearnerPayment().subscribe((res) => {
    //   console.log(res)
    // });
    
  }
  // get transactions and put in originalData variable
  // learner role or applicant role
  getLearnerTransactions() {
    // showLearnerPayment
    this.learnerService.userOrder().subscribe((res) => {
      // console.log(res)
      // let transactions = res['dataCon'];
      this.transactions = res['allOrders'];
      // this.startDate = new FormControl(this.minDate);
      this.start = this.transactions[0]['order'].created_at;
      this.minDate = moment(this.start).format();
      this.startDate.setValue(this.minDate)
      this.range = [this.start.substr(0, 19), moment().format().substr(0, 19)];
      // console.log("minDate:")  
      // console.log(this.minDate)    
      console.log("range:"+this.range)

      if (this.transactions.length !== 0) {
        this.showTable = true;
        this.showWarningMes = false;
        // this.originalData = this.mapData(transactions);
        console.log(this.originalData);
        // calculate data
        let initialStart = this.range[0];
        let initialEnd = this.range[1];
        this.calculateData(initialStart, initialEnd);
        // this.calculateData();
        // show generate pdf invoice button
        this.showPdfButton = true;
      }else{
        this.showWarningMes = true;
      }
    });
  }
  // map data
  // mapData(transactions: any[]) {
  //   console.log(transactions);
  //   let data = transactions.map(e => {
  //     return {
  //       date_of_session: e['order'].created_at,
  //       // hourly_rate: e.payment_amount,
  //       // course_name:e.discipline,
  //     };
  //   });
  //   return data;
  // }
  calculateData(start,end) {
    // calculate the original data basing on the selected input start and end date
    this.dropIndex = [];
    this.trans = [];
    this.singlePrice = [];
    this.totalHour = 0;
    this.totalAmount= 0;
    // this.transaction = this.originalData;
    for(let i =0; i < this.transactions.length; i++) {
      let startStatus = moment(this.transactions[i]['order'].created_at).isSameOrAfter(start,'days');
      let endStatus = moment(this.transactions[i]['order'].created_at).isSameOrBefore(end,'days');
      console.log(startStatus,endStatus);
      if(startStatus && endStatus) {
        // change date format
        // let x = this.transaction[i].date_of_session;
        // x = moment(x).format('lll');
        // console.log(x);
        // this.transaction[i].date_of_session = x;
        // add into new trans array
        this.trans.push(this.transactions[i]);
        // this.totalHour += this.transaction[i].quantity;
        this.singlePrice.push(Number(this.transactions[i]['order'].order_price)*Number(this.transactions[i]['order'].order_quantity))
      }
    }
    if (this.trans.length == 0){
      this.showWarningMes = true;
      this.showTable = false;
    }else{
      this.showTable = true;
      this.showWarningMes = false;

    }
    for ( let i = 0; i < this.singlePrice.length; i++){
      this.totalAmount+=Number(this.singlePrice[i])
    }
    this.billInfo['allAmount'] = this.totalAmount;
    for ( let i = 0; i < this.trans.length; i++) {
      this.dropIndex.push(i); // is for front page table row loop
    }
    console.log("trans:",this.trans)
  }

  resetTransactions() {
    this.showWarningMes = false;
    this.showTable = false;
    let start = this.startDate.value;
    let end = this.endDate.value;
    // console.log(start);
    // if (moment(end).isSameOrBefore(moment(start))) {
    //   this.timeMes = true;
    // } else {
      // hide warning message
      // this.timeMes = false;
      let s_time = moment(start).format('YYYY-MM-DD h:mm:ss').substr(0, 19);
      let e_time = moment(end).format().substr(0, 19);
      // console.log("s_time e_time:",s_time,e_time)
      this.range[0] = s_time;
      this.range[1] = e_time;
      console.log("range:"+this.range)
      this.calculateData(s_time,e_time);
      // update this.range

      // update sessions
      // this.ngOnInit();
    // }
  }

  showAll(){
    this.ngOnInit();
  }
  // dispute(event) {
  //   // get transaction id
  //   let trans_id = event.srcElement.id.slice(3);
  //   // dispute action
  //   let sessionID = Number(event.srcElement.id.slice(3));
  //   let dialogRef = this.dialog.open(UserTransactionsActionsDialogComponent,
  //     {
  //       panelClass: 'dialog1',
  //       data: sessionID,
  //     });
  //   dialogRef.afterClosed().subscribe(
  //     (res) => {
  //       console.log(res);
  //       if (res) {
  //         this.sendDisputeToServer(trans_id, res);
  //         // this.sendReport(sessionID, res);
  //       }
  //     },
  //     (err) => console.warn(err)
  //   );
  // }
  // MakePayment(x){
  //   // x is the session id
  //   let transid = this.originalData[x].transaction_id;
  //   this.learnerService.updateLearnerPayment(transid).subscribe(res=>{
  //     console.log(res);
  //   });
  //   console.log(transid);
  // }
  createPdf() {
    let sourceDom = document.getElementById('template_paper');
    // console.log(sourceDom, this.billInfo, this.trans);
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
