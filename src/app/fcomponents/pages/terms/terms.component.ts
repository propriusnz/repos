import { Component, OnInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment.prod';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {
  file1: any;
  file2:any;
  files=[];
  formData = new FormData();
  baseUrl = environment.baseUrl;
  
  constructor(
    private elem: ElementRef,
    private http:HttpClient
  ) { }

  ngOnInit() {

    
  }
  process(){
    console.log('qwer');

    this.file1 = this.elem.nativeElement.querySelector('#file1').files[0];
    this.file2 = this.elem.nativeElement.querySelector('#file2').files[0];
    
    // console.log(this.file);
    this.files = [this.file1, this.file2];
    console.log(this.files)

    // this.formData.append('postFile', this.files);
    this.send(this.files);

  }

  send(data){
    this.sender(data).subscribe(
      (res)=>{console.log(res)},
      (err)=>{console.log(err)}
    )
  }

  sender(data){
    return this.http.post(this.baseUrl+'/testing', data)
  }
}
