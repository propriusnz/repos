import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../services/servercalls/general.service';
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


  constructor(
    public searchService: GeneralService,
    private route: ActivatedRoute,
    private commonSupport: CommonSupportService  ,
    private alertservice: AlertNotificationService 
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.getTutorData(this.id).subscribe(
      (res) => { 
        this.setTutorData(res);
        this.getCourseData(this.id);
        this.getFeeRate();
        this.initOrderData();
        console.log(res);
      },
      (err) => { 
        this.errorMessage = "Something went wrong, we cannot get any data at this time." 
        this.alertservice.sendAlert(this.errorMessage, 'ERROR', 'toast-top-right', 3000);
      }
    )

  }
  getFeeRate(){
    //need change get form service, just for test
    this.feerate= 0.03;
  }
  //get tutor data from the service
  getTutorData(id) {
    return  this.searchService.showTutor(id);
/*     this.searchService.showTutor(id).subscribe(
      (res) => { this.setTutorData(res) },
      (err) => { this.errorMessage = "Something went wrong, we cannot get any data at this time." }
    )
 */  }
 //set tutor data to local variable
  setTutorData(res){
    this.tutor = res['data'].thisTutorInfo;
    this.tutor['profile_photo'] = this.commonSupport.findUserImg(this.tutor['user_id']) + "?ver=" + this.commonSupport.getTime();    
  }
  //get course data from service
  getCourseData(id){
    this.courses=[
      {id:1,quantity:1,description:'1 lesson',price:25,base_price:25},
      {id:2,quantity:5,description:'5 lessons',price:120,base_price:25},
      {id:3,quantity:10,description:'10 lessons',price:240,base_price:25},
      {id:4,quantity:20,description:'20 lessons',price:480,base_price:25},
      {id:5,quantity:50,description:'50 lessons',price:1200,base_price:25},
    ];
    this.courses.map(e=>{
      e.discount=((1-e.price/(e.base_price*e.quantity))*100).toFixed(2);
    });
  }
  getwallet(){
    //subscribe
    this.wallet=10.3;
  }
  //initial local order data variable, set defaut user choose a single course
  initOrderData(){
    let i=1;
    this.order.push({
      sequence:i,
      item:this.tutor.first_name+':'+this.courses[0].description,
      price:this.courses[0].price
    });
    i++
    if (this.feerate!=0){
        this.order.push({
          sequence:i,
          item:'Fee',
          price:this.courses[0].price*this.feerate
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
      price:this.courses[0].price+this.courses[1].price -this.wallet
    });
  }
  //on radio change event, to change order data
  radioChange(event){
    console.log(event);
    this.order[0].item=this.tutor.first_name+':'+event.value.description;
    this.order[0].price=event.value.price;
    if (this.feerate!=0){
      this.order[1].price=this.courses[0].price*this.feerate;   
      this.order[2].price=this.courses[0].price+this.courses[1].price;
    }
  }
  callPayment(){
    $('#confirmModal').modal('hide')
  }
}
