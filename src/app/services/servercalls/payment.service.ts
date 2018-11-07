import { LOCAL_STORAGE } from '@ng-toolkit/universal';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  id:string;
  baseUrl = environment.baseUrl;
  headers1: HttpHeaders;
  
  constructor(
    @Inject(LOCAL_STORAGE)
    private localStorage: any, 
    private http:HttpClient
  ) {
    this.id = localStorage.getItem('lsaUserId');
    this.headers1= new HttpHeaders({'Authorization': "Bearer "+localStorage.getItem('lsaToken_access')});}

  // Pass only the stripeToken 

  storePaymentInfo(aaa:Object ){
    console.log(aaa);
    return this.http.post(this.baseUrl+'/users/'+this.id+'/paymethod', aaa, {headers: this.headers1});
  }

  updatePaymentInfo(aaa:Object){
    console.log('now updating credit card');
    return this.http.put(this.baseUrl+'/users/' + this.id+'/paymethod', aaa, {headers: this.headers1});
  }

  deletepaymethod(){
    return this.http.delete(this.baseUrl+'/users/'+this.id+'/paymethod', {headers: this.headers1});
  }
 //new method 11/2/2018
  Userpaymethod(){
    return this.http.get(this.baseUrl+'/users/'+this.id+'/paymethod', {headers: this.headers1});
  } 
}
