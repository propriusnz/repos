import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-help-applicants-main',
  templateUrl: './help-applicants-main.component.html',
  styleUrls: ['./help-applicants-main.component.css']
})
export class HelpApplicantsMainComponent implements OnInit {

  currentRoutePosition: string;

  constructor(
    public router: Router,
  ) {  }

  ngOnInit() {
    this.getRoutePosition();
  }
  getRoutePosition() {
    console.log(this.router.url);
    this.currentRoutePosition = '';
    if (this.router.url === '/app/help/applicants') {
      this.currentRoutePosition = 'For Applicant';
    }
    if (this.router.url === '/app/help/teachers') {
      this.currentRoutePosition = 'For Teachers';
    }
    if (this.router.url === '/app/help/students') {
      this.currentRoutePosition = 'For Students';
    }
  }

}
