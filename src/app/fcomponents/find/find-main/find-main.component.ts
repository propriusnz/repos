import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { GeneralService } from '../../../services/servercalls/general.service';
import { SearchTutorModel } from '../../../models/SearchTutorModel';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../../environments/environment.prod';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { CommonSupportService } from '../../../services/support/common-support.service';

@Component({
  selector: 'app-find-main',
  templateUrl: './find-main.component.html',
  styleUrls: ['./find-main.component.css']
})

export class FindMainComponent implements OnInit {
  tutors: SearchTutorModel;
  searchInfo = 'We are getting your data now . . .'
  default_discipline: string;
  default_location = '';
  discipline: string;
  location = this.default_location;
  f: string;
  isBrowser = false;
  loadingFlag = false;

  baseImgUrl = environment.baseImgUrl + '/tutorimg/';

  //Pagination needed
  currentPage = 0;
  pageNumber = 0;
  pages = [];
  totalPosts = 0;
  perPage = 0;

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
    public searchService: GeneralService,
    public route: ActivatedRoute,
    private meta: Meta,
    private titleService: Title,
    private commonSupport: CommonSupportService
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true
    }
    if (this.route.snapshot.url[1]) {
      this.default_discipline = this.route.snapshot.url[1].path;
      this.discipline = this.default_discipline
    } else {
      this.discipline = ''
    }
    this.setTags();
    this.setTitle();    
  }

  ngOnInit() {
    this.searchTutor(this.discipline, this.location);
  }

  setTags(){
    let keywordsCont,DescCont;
      DescCont = 'Learnspace Home, find the best high school tutors in Wellington and Auckland';
    if (this.discipline === '')
      keywordsCont = 'high school tutor, NCEA tutors, best maths tutors, IB tutors,Cambridge tutors';
    else if (this.discipline === 'Maths')
      keywordsCont = 'Maths tutors,Math tutors,Maths tuition,Maths lesson,high school tutor, NCEA tutors, best maths tutors, IB tutors,Cambridge tutors';
    else if (this.discipline === 'Physics')
      keywordsCont = 'Physics tutors,Physics tutoring,Physics tuition, NCEA tutors, IB tutors,Cambridge tutors';
    else 
      keywordsCont = this.discipline+' tutors,'+ this.discipline+' tutoring,'+ this.discipline+ this.discipline+' lesson, NCEA tutors, IB tutors,Cambridge tutors';

    //   this.meta.addTags([
    //   { name: 'keywords', content: keywordsCont},
    //   { name: 'description', content: DescCont }
    //  ])   
    this.meta.updateTag({ name: 'keywords', content: keywordsCont});   
    this.meta.updateTag( { name: 'description', content: DescCont });       
  }
  setTitle(){
    let title ;
    if (this.location==='auckland'){
      title='High School '+this.discipline+' Tutors in '+this.location;
    }
    else if (this.location==='wellington'){
      title='High School '+this.discipline+' Tutors in '+this.location;
    }
    else {
      title=this.discipline+' Tutors in Wellington, Auckland';
    }
    let temp;
    temp=this.titleService.getTitle();
    console.log(temp)
    this.titleService.setTitle(title);
    temp=this.titleService.getTitle();
    console.log(temp)
  }
  searchTutor(f, e) {
    console.log(this.discipline, this.location)
    this.loadingFlag=true;
    this.searchService.indexTutors([this.discipline, this.location]).subscribe(
      (data) => {
        this.loadingFlag=false;
        this.dataLoop(data);
        if (this.currentPage == 0) {
          this.currentPage = data['current_page'];
          this.totalPosts = data['total'];
          this.perPage = data['per_page'];
          this.pageNumber = Math.ceil(this.totalPosts / this.perPage);
          if (this.pageNumber > 1) {
            for (let i = 1; i < this.pageNumber + 1; i++) {
              this.pages.push(i);
            }
            console.log(this.pages);
          }else{
            this.pages.push(1);
          }
        } else {
          this.currentPage = data['current_page'];
        }
      },
      (error) => { this.loadingFlag=false;  this.searchInfo = "Something went wrong. We'll be fixing it right away . . " }
    )
  }

  dataLoop(data) {
    console.log(data)
    this.tutors = data['data'];
    if (!this.tutors.first_name) {
      this.searchInfo = "There are no tutors yet for this subject."
    }
  }
}
