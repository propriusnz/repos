import { Component, OnInit, ViewChildren,ViewChild } from '@angular/core';
import { GeneralService } from '../../../../services/servercalls/general.service';
import { LearnerService } from '../../../../services/servercalls/learner.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonSupportService } from '../../../../services/support/common-support.service';
import { AlertNotificationService } from '../../../../services/support/alert-notification.service';
import { UserPaymentInfoComponent}  from '../../../../fcomponents/user-details/user-payment-info/user-payment-info.component'; 


@Component({
  selector: 'app-order-confirm-component',
  templateUrl: './order-confirm-component.component.html',
  styleUrls: ['./order-confirm-component.component.css']
})


export class OrderConfirmComponentComponent implements OnInit {
  @ViewChild(UserPaymentInfoComponent) userPaymentInfo:UserPaymentInfoComponent;  
  tutor:any;
  courses:any;
  order=[]; //for bind the html page 
  id:string;//tutor id ,get from url parameter
  errorMessage:string;
  feerate:number;
  wallet:number;
  tutorProfile:any;
  tutorCourses:any;
  selectedCourseId:string;
  userOrder:any;//successed order, return by backend;


  constructor(
    public searchService: GeneralService,
    public learnerService: LearnerService,
    private route: ActivatedRoute,
    private commonSupport: CommonSupportService  ,
    private alertservice: AlertNotificationService ,
    private router:Router,
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getTutorData(this.id);
  }
  getFeeRate(){
    //need change get form service, just for test
    this.feerate= 0.029;
  }
  //get tutor data from the service
  getTutorData(id) {
    
    this.searchService.showTutor(id).subscribe(
      (res) => { 
        console.log(res);        
        this.setTutorData(res);
        this.setCourseData();
        this.getFeeRate();
        this.getWallet();
        this.initOrderData();
      },
      (err) => { 
        console.log(err);        
        this.errorMessage = "Something went wrong, we cannot get any data at this time." 
        this.alertservice.sendAlert(this.errorMessage, 'ERROR', 'toast-top-right', 3000);      }
    )
  }
 //set tutor data to local variable
  setTutorData(res){
    this.tutor = res['tutorKey'];
    this.tutorProfile = res['tutorProfile'];
    this.tutorCourses = res['tutorCourses'];
    this.tutor['profile_photo'] = this.commonSupport.findUserImg(this.tutor['tutor_id']) + "?ver=" + this.commonSupport.getTime();    
  }
  //set course data from service
  setCourseData(){
    if (this.tutorCourses.length >0){
      this.tutorCourses[0].checked=true;
      this.selectedCourseId=this.tutorCourses[0].id;
    }
  }
  getWallet(){
    //subscribe
    this.wallet=0;
  }
  calculateFee(fee){
    return  Math.round((fee*this.feerate+0.3)*100)/100;
  }
  //initial local order data variable, set defaut user choose a single course
  initOrderData(){
    let i=1;
    this.order.push({
      id:0,
      sequence:i,
      item:this.tutor.first_name+':'+this.tutorCourses[0].course_title,
      price:this.tutorCourses[0].course_price*1
    });
    i++
    if (this.feerate!=0){
        this.order.push({
          id:1,          
          sequence:i,
          item:'Fee',
          price:this.calculateFee(this.tutorCourses[0].course_price*1)
        });
     }
     i++;
     if (this.wallet!=0){
      this.order.push({
        id:2,        
        sequence:i,
        item:'wallet Balance',
        price:this.wallet
      });
    }
     this.order.push({
      id:3,       
      sequence:'',
      item:'Total',
      price:this.order[0].price+this.order[1].price -this.wallet
    });
  }
  //on radio change event, to change order data
  radioChange(event){
    console.log(event);
    this.selectedCourseId=event.value.id;

    //recalculate the number of checkout table
    let indBaseItem = this.order.findIndex(e=>{return e.id===0})
    let basePrice = event.value.course_price*1;  

    let indFeeItem = this.order.findIndex(e=>{return e.id===1})    
    let feePrice = (indFeeItem !=-1)?this.calculateFee(event.value.course_price*1):0;

    let indwalletItem = this.order.findIndex(e=>{return e.id===2})
    let walletPrice = (indwalletItem!=-1)?this.order[indwalletItem].price:0;

    let indTotalItem = this.order.findIndex(e=>{return e.id===3})
    let totalPrice = basePrice + feePrice - walletPrice;

    this.order[indBaseItem].price=basePrice;
    this.order[indBaseItem].item=this.tutor.first_name+':'+event.value.course_title;
    this.order[indFeeItem].price=feePrice;
    this.order[indTotalItem].price= totalPrice;  
  }
  //check out
  checkOut(){
    if (this.verify()===false ) return;
    $('#confirmModal').modal('show');
  }
  //verify input data 
  verify() {
    if (this.hasPaymentInfo() === false) {
      this.errorMessage = "You havn't provided any payment information, Please fill out a payment method informantion, before you check out!"
      this.alertservice.sendAlert(this.errorMessage, 'ERROR', 'toast-top-right', 3000);
      return false;
    }
    return true;
  }
  //get if the user has a Payment method Information
  hasPaymentInfo(){
    return this.userPaymentInfo.hasPaymentInfo;
  }
  callPayment(){
    this.learnerService.bookPackageOrder(this.selectedCourseId,this.order[0].price).subscribe(
      (res) => { 
        console.log(res);  
        this.userOrder = res['userOrder'];
        this.alertservice.sendAlert("Booking successed!", 'SUCCESS', 'toast-top-right', 3000);
        $('#confirmModal').modal('hide');
        $('#successModal').modal('show');
      },
      (err) => { 
        console.log(err);        
        this.errorMessage = "Something went wrong, we can not book at this time." 
        this.alertservice.sendAlert(this.errorMessage, 'ERROR', 'toast-top-right', 3000);      }
    )
  }
  goMyOrder(){
    $('#successModal').modal('hide');    
    this.router.navigate(['/app/dashboard/myorders']);
  }

  goSchedule(){
    $('#successModal').modal('hide');
    this.router.navigate(['/app/dashboard/learner/schedule/'+this.userOrder.order_id+'/'+this.id]);
  }
}
