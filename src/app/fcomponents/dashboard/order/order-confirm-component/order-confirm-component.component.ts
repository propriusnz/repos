import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../services/servercalls/general.service';
import { LearnerService } from '../../../../services/servercalls/learner.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommonSupportService } from '../../../../services/support/common-support.service';
import { AlertNotificationService } from '../../../../services/support/alert-notification.service';


@Component({
  selector: 'app-order-confirm-component',
  templateUrl: './order-confirm-component.component.html',
  styleUrls: ['./order-confirm-component.component.css']
})


export class OrderConfirmComponentComponent implements OnInit {
  tutor:any;
  courses:any;
  order=[];
  id:string;
  errorMessage:string;
  feerate:number;
  wallet:number;
  tutorProfile:any;
  tutorCourses:any;
  selectedCourseId:string;


  constructor(
    public searchService: GeneralService,
    public learnerService: LearnerService,
    private route: ActivatedRoute,
    private commonSupport: CommonSupportService  ,
    private alertservice: AlertNotificationService 
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getTutorData(this.id);
  }
  getFeeRate(){
    //need change get form service, just for test
    this.feerate= 0.29;
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
    this.wallet=10.3;
  }
  CalculateFee(fee){
    return  fee*this.feerate+0.3;
  }
  //initial local order data variable, set defaut user choose a single course
  initOrderData(){
    let i=1;
    this.order.push({
      sequence:i,
      item:this.tutor.first_name+':'+this.tutorCourses[0].course_description,
      price:this.tutorCourses[0].course_price*1
    });
    i++
    if (this.feerate!=0){
        this.order.push({
          sequence:i,
          item:'Fee',
          price:this.CalculateFee(this.tutorCourses[0].course_price)
        });
     }
     i++;
     if (this.wallet!=0){
      this.order.push({
        sequence:i,
        item:'wallet Balance',
        price:this.wallet
      });
    }
     this.order.push({
      sequence:'',
      item:'Total',
      price:this.order[0].price+this.order[1].price -this.wallet
    });
  }
  //on radio change event, to change order data
  radioChange(event){
    console.log(event);
    this.selectedCourseId=event.value.id;
    this.order[0].item=this.tutor.first_name+':'+event.value.course_description;
    this.order[0].price=event.value.course_price;
    if (this.feerate!=0){
      this.order[1].price=this.CalculateFee(this.tutorCourses[0].course_price) ;
      this.order[2].price=this.tutorCourses[0].course_price+this.tutorCourses[1].price;
    }
  }
  callPayment(){
    this.learnerService.bookPackageOrder(this.selectedCourseId,this.order[0].price).subscribe(
      (res) => { 
        console.log(res);        
        this.alertservice.sendAlert("Booking successed!", 'SUCCESS', 'toast-top-right', 3000);
        $('#confirmModal').modal('hide')
      },
      (err) => { 
        console.log(err);        
        this.errorMessage = "Something went wrong, we can not book at this time." 
        this.alertservice.sendAlert(this.errorMessage, 'ERROR', 'toast-top-right', 3000);      }
    )
  }
}
