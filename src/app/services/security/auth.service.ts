import { LOCAL_STORAGE, WINDOW } from '@ng-toolkit/universal';
import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.prod';

@Injectable()
export class AuthService {
  xtExpire: string;
  a = new Date();
  currentTime = this.a.getTime();
  abc:number;
  baseUrl = environment.baseUrl;

  constructor(
    @Inject(WINDOW)
    private window: Window,
    @Inject(LOCAL_STORAGE)
    private localStorage: any,
    private http:HttpClient,
    private router:Router,
  ) { }

    register(regiUser):Promise<any> {
      return this.http.post(this.baseUrl+'/register', regiUser).toPromise().then(
        (data)=>{this.setTokens(data)},
      );
    }

    login(loginUser){
      return  new Promise((resolve, reject) => {
        console.log(loginUser); 
        this.http.post(this.baseUrl+'/login', loginUser).toPromise().then(
          (userData)=>{ resolve(userData),
            console.log(userData); 
            this.setTokens(userData)},
          (err) => {reject(err),console.log(err)} );
      });
    }

    forgotPassword(ea){
      console.log(ea)
      return this.http.post(this.baseUrl+'/password/email', ea)
    }

    setTokens(user){
      console.log(user);
      this.xtExpire =  String(this.currentTime + 43200000)

      this.localStorage.setItem('lsaToken_access', user.dataCon.xT.access_token);
      this.localStorage.setItem('lsaToken_expires', this.xtExpire);
      this.localStorage.setItem('lsaUserId', user.dataCon.xUi);
      this.localStorage.setItem('lsaUserName', user.dataCon.userBasic.first_name);
      this.localStorage.setItem('lsaWho', user.dataCon.xUr);//user.dataCon.userBasic.user_applicant
      this.localStorage.setItem('lsaAppicant', user.dataCon.userBasic.user_applicant===1?1:0);//

      sessionStorage.setItem('lsaUserskeys', JSON.stringify(user.dataCon.userBasic));
      sessionStorage.setItem('lsaUsersInfo', JSON.stringify(user.dataCon.userInfo));

      if(user.dataCon.xUr==1){

      }
      // if(user.dataCon.userBasic.user_applicant===1){
      //   sessionStorage.setItem('lsaSpApplicantInfo', JSON.stringify(user.dataCon.applyInfo));
      // }
      if(user.dataCon.xUr==3){
        sessionStorage.setItem('lsaSpTutorInfo', JSON.stringify(user.dataCon.tutorInfo));     
        sessionStorage.setItem('lsaSpTutorProfile', JSON.stringify(user.dataCon.tutorProfile));        
      }
    }

    getAuth(){
      let token = this.localStorage.getItem('lsaToken_access')
      if(token){
        var eT = Number(this.localStorage.getItem('lsaToken_expires'))
        console.log('now:'+this.currentTime)
        console.log('exp:'+eT)
       if(eT > this.currentTime){
         return true
       }
       else{
        return false
       }
      }
      else{
        return false
      }
    }

    getUserRole(){
      let role = this.localStorage.getItem('lsaWho');
      if(role == '3'){
        return 3
      }
      return 1
    }
    getAppicant(){
      return this.localStorage.getItem('lsaAppicant');
    }

    loggingOut(){
      this.localStorage.clear();
      sessionStorage.clear();
      this.router.navigate(['index']);
    }

}