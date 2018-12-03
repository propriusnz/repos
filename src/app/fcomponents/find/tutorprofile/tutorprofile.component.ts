import { WINDOW } from '@ng-toolkit/universal';
import { Component, OnInit , Inject, PLATFORM_ID } from '@angular/core';
import { GeneralService } from '../../../services/servercalls/general.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SearchTutorModel } from '../../../models/SearchTutorModel';
import { TutorProfileModel } from '../../../models/TutorProfileModel';
import { MatDialog } from '@angular/material';
import { ContactDialogComponent } from '../../basic/contact-dialog/contact-dialog.component';
import { CalendarSupportService } from '../../../services/support/calendar-support.service';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment.prod';
import { Meta, Title, DomSanitizer } from '@angular/platform-browser';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { CommonSupportService } from '../../../services/support/common-support.service';
import { flatten } from '@angular/compiler';
import { Observable, of } from 'rxjs';
import 'rxjs/add/observable/forkJoin';
import { map } from 'rxjs-compat/operator/map';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-tutorprofile',
  templateUrl: './tutorprofile.component.html',
  styleUrls: ['./tutorprofile.component.css']
})
export class TutorprofileComponent implements OnInit {
  id: string;
  tutor: SearchTutorModel;
  tutorprofile: TutorProfileModel;
  tutorfeedback: any;
  tutorratings:any;
  tutorCourses:any;
  tutorSchedule:any;
  tutorSessions:any;  
  tutorAwards:any;
  allAwards:any;  
  firstname: string;
  cleanVideo: any;
  errorMessage: string;
  tutor_photo: string;
  productFlag=false; //for some element do not display when product run,because of no data.
  eventContainer = {
    session: [],
    free: [],
  };
  loadingFlag=false;
  // baseImgUrl = environment.baseImgUrl + '/tutorimg/';

  events: any = []; // session object
  schemaData = {
    '@context': 'http://schema.org',
    '@type': 'Product',
    'name': 'LearnspaceTutor',
    "aggregateRating": {
      "@type": "aggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "5438"
    },
    "priceRange": "25$/hr to 40$/hr",
    'description' : "good tutor.",
    'productId' : '1004'
  };  
  constructor(
    @Inject(PLATFORM_ID)
    private platformId,
    @Inject(WINDOW)
    private window: Window,
    private route: ActivatedRoute,
    public searchService: GeneralService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog,
    private calendar: CalendarSupportService,
    private router: Router,
    private meta: Meta,
    private titleService: Title,
    private commonSupport: CommonSupportService
  ) {
    // Meta Area
    
      this.meta.updateTag({ name: 'keywords', content: 'tutors, Learnspace, tutoring, tutors, wellington tutors, auckland tutors'});
      this.meta.updateTag({ name: 'description', content: 'Find the best high school tutors in Wellington and Auckland' });

      this.id = this.route.snapshot.params['id'];
      this.getTutorData(this.id);      
  }

  ngOnInit() {
    this.popoverBook();
    this.stickySideBar();
  }
  // this.searchService.showTutor(id).
  // showTutorSession
  getTutorData(id) {
    this.loadingFlag = true;

    Observable.forkJoin(
      this.searchService.showTutor(id).map(res => {
        console.log(res);
        this.setPageData(res);
        }),
      this.searchService.findTutorSchedule(id).map(res => {
        this.tutorSchedule= res['tutorSchedule'];
        this.tutorSessions=res['tutorSessions']; 
        console.log(this.tutorSchedule);                       
        console.log(this.tutorSessions);
      })      
    ).subscribe(
      data=>{
        this.loadingFlag = false; 
        this.setCalendarData();           
      },
      err=>{
        console.error(err);
        this.loadingFlag = false;        
        this.errorMessage = "Something went wrong, we cannot get any data at this time." 
      }      
    )


    // this.searchService.showTutor(id).toPromise().then(
    //   (res) => { 
    //     this.loadingFlag = false;
    //      this.setPageData(res) 
    //     },
    //   (err) => { 
    //     this.loadingFlag = false;        
    //     this.errorMessage = "Something went wrong, we cannot get any data at this time." 
    //   }
    // );
  }

  setCalendarData() {
    this.eventContainer = this.calendar.getEvent(this.tutorSchedule, this.tutorSessions);
    if (this.eventContainer.free.length > 0) 
       this.tutorScheduleInit(this.eventContainer);
  }
  setPageData(res) {
    console.log(res)
    this.tutor = res['tutorKey'];
    // Meta area
    // this.meta.addTags([{name: 'keywords', content: this.tutor.discipline+' tutor, '+this.tutor.curriculum+' tutor'}])
    // this.titleService.setTitle(this.tutor.discipline+' '+this.tutor.curriculum+' tutor in '+this.tutor['location']);
    this.setTagTitle();
    this.tutorprofile = res['tutorProfile'];
    this.tutorfeedback = res['tutorReferences'];
    this.tutorratings = res['tutorratings'];
    this.tutorCourses = res['tutorCourses'];

    this.tutorAwards =  res['tutorAwards'];
    this.allAwards =  res['allAwards']; 
    this.mapAwards();   
    // this.tutor['profile_photo'] = this.baseImgUrl + this.tutor['profile_photo']
    this.tutor['profile_photo'] = this.commonSupport.findUserImg(this.tutor['tutor_id']) + "?ver=" + this.commonSupport.getTime();

    this.cleanVideo = this.sanitizer.bypassSecurityTrustResourceUrl(this.tutor.profile_video)
  }
  mapAwards(){
    let tutorAwards = this.tutorAwards;
    let allAwards = this.allAwards;
    if (tutorAwards===null||tutorAwards.length===0) return;
    
    tutorAwards.map((eleTutor)=>{
      eleTutor.title = allAwards.find(eleAll=> {
        return eleAll.award_id===eleTutor.award_id;
      }).title;
    })
  }
  setTagTitle(){
    this.titleService.setTitle(this.tutor.discipline+' '+this.tutor.curriculum+' tutor in '+this.tutor['location']);
    this.meta.updateTag({name: 'keywords', content: this.tutor.discipline+' tutor, '+this.tutor.curriculum+' tutor,'
      +this.tutor['location']+' tutor ,'+this.tutor.discipline+' tutoring ,'+this.tutor.discipline+' tuition'});    
  }
  tutorScheduleInit(eventContainer) {
    // Client Only Codes
    if (isPlatformBrowser(this.platformId)) {
      this.eventContainer = eventContainer
      $('#calendar1').css({ 'display': 'block' });
      this.events = this.eventContainer.free;
      for (let i = 0; i < this.events.length; i++) {
        // delete the free time that before current time
        let eve = this.events[i];
        if (moment(eve.end).isBefore(moment())) {
          delete this.events[i];
          this.events.splice(i, 1);
          i = i - 1;
        }
      }
      this.processMethod();
    }
  }

  // book button
  bookNow($event) {
    if (this.eventContainer.free.length > 0) {//if tutor has free time
      //this.router.navigate(['./app/find-tutor/profile/' + this.tutor.tutor_id + '/book']);
      this.router.navigate(['./app/dashboard/learner/order/' + this.tutor.tutor_id]);
    } else {// if tutor didn't edit hir free time
      //this.router.navigate(['./app/dashboard/learner/order/' + this.tutor.tutor_id]);
       let dialogRef = this.dialog.open(ContactDialogComponent, {
        width: '700px',
        data: this.tutor.first_name
      }); 
    }
  }
  // book button
  bookFree($event) {
    if (this.eventContainer.free.length > 0) {//if tutor has free time
      this.router.navigate(['./app/find-tutor/profile/' + this.tutor.tutor_id + '/book']);
    } 
    else {
      let dialogRef = this.dialog.open(ContactDialogComponent, {
        width: '700px',
        data: this.tutor.first_name
      });       
    }
  }  
  // routerlink to book sessions via popover
  popoverBook() {
    if (isPlatformBrowser(this.platformId)) {
      $(() => {
        $(document).on('click', '#button', () => {
          let startTime = $('#popoverTime').html().substr(23, 5);
          let tempDate = $('#popoverDate').html().substr(23, 11);
          let stTime = tempDate + 'T' + startTime + ':00';
          console.log(stTime);
          this.router.navigate(['./app/find-tutor/profile/' + this.tutor.tutor_id + '/book'], { queryParams: { dTime: stTime } });
        });
      });
    }
  }
  // make sidebar sticky on top
  stickySideBar() {
    $(document).ready(function () {
      $('#sideBar').addClass('fixed');
    });
    // Client only code.
    if (isPlatformBrowser(this.platformId)) {
        $(this.window).scroll(function () {
          let scrollTop = $(this.window).scrollTop();
          let footer_top = $("app-footer").offset().top;
          let div_height = $("#sideBar").height();
            if (84 > footer_top - scrollTop - div_height && footer_top - scrollTop - div_height < 24) {
              $('#sideBar').addClass('absolute');
              $('#sideBar').removeClass('fixed');
            } else {
              $('#sideBar').addClass('fixed');
              $('#sideBar').removeClass('absolute');
            }
        });
    }
  }

  processMethod() {
    console.log(this.eventContainer.free);
    let fcSources = { events2: this.eventContainer.free };
    let today = moment().day();
    $('#calendar').fullCalendar({
      header: {
        left: '',
        center: 'prev title next',
        right: 'today',
      },
      themeSystem: 'bootstrap3',
      defaultView: 'agendaWeek',
      firstDay: today,
      contentHeight:"auto",
      aspectRatio: 1.2,
      navLinks: true,
      displayEventTime: false,
      eventSources: [fcSources.events2],
      allDaySlot: false,
      height: 'parent',
      minTime: moment.duration('08:00:00'),
      maxTime: moment.duration('21:00:00'),
      viewRender: function(view, element) {//set the button in header
        $('.fc-today-button').css({ 'position': 'relative', 'bottom': '65px', 'font-size': '15px', 'background-color': '#0099FF', 'color': 'white', 'font-weight': 'bold' });
        $('.fc-prev-button').css({ 'position': 'absolute', 'top': '13%', 'left': '5%', 'height': '30px', 'width': '30px', 'border-radius': '100%', 'font-size': '15px', 'color': '#0099FF', 'font-weight': 'bold', 'border': '2px solid #0099FF', 'background-color': 'white' });//
        $('.fc-prev-button').text('<');
        $('.fc-center h2').css({ 'font-size': '25px', 'color': '#525252', 'font-weight': 'bold' });
        $('.fc-next-button').css({ 'position': 'absolute', 'top': '13%', 'right': '5%', 'height': '30px', 'width': '30px', 'border-radius': '100%', 'font-size': '15px', 'color': '#0099FF', 'font-weight': 'bold', 'border': '2px solid #0099FF', 'background-color': 'white' });
        $('.fc-next-button').text('>');
        if (moment(view.start).isBefore(moment().add(1, 'days'))) {
          $(".fc-prev-button").prop('disabled', true);
          $(".fc-prev-button").addClass('fc-state-disabled');
        } else {
          $(".fc-prev-button").removeClass('fc-state-disabled');
          $(".fc-prev-button").prop('disabled', false);
        }
      },
      eventAfterRender: function(event, element, view) {
        $(element).css({ 'font-size': '13px', 'border-radius': '0px', 'border': '0.1px solid white', 'margin': '0px' });// 'margin-top':'0.5px'
      },
      eventRender: function(event, element, view) {   //render how event look like
        let x = event.start as moment.Moment;
        let y = event.end as moment.Moment;
        let startTime = x.format().substr(11, 5);
        let endTime = y.format().substr(11, 5);
        let date = x.format().substr(0, 10);
        console.log(date);
        if (event.color === '#00ad2b') {
          (element as any).popover({
            title: event.title,
            selector: '.popover',
            container: '#calendar', // the popover now is one part of the element, append the popover on the element
            html: true, // allow the content to be html
            content: '<p id="popoverDate"><strong>Date: </strong>' + date + '</p>' + '<p id="popoverTime"><strong>Time: </strong>' + startTime + ' - ' + endTime + '</p>' + '<button id="button" class="btn btn-primary btn-block">Book Session</button>',
            trigger: 'manual',
            placement: 'left'
          }).on('mouseenter', function() {
            let this1 = this;
            ($(this) as any).popover('show');
            $('.popover').on('mouseleave', function() {
              ($(this1) as any).popover('hide');
            });
          }).on('mouseleave', function() {
            let this2 = this;
            setTimeout(function() {
              if (!$('.popover:hover').length) {
                ($(this2) as any).popover('hide');
              }
            }, 1);
          });
        }
        $('.fc-body .fc-row').css({ 'min-height': '25px' });// calendar minimum height
        $('span').css({ 'font-size': '13px', 'color': '#525252' });//global grid text size
        $('span.fc-day-number').css({ 'font-size': '12px', 'color': '#525252' });//calendar date number
      },
    });
  }
}
