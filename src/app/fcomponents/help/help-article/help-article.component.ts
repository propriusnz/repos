import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-help-article',
  templateUrl: './help-article.component.html',
  styleUrls: ['./help-article.component.css']
})
export class HelpArticleComponent implements OnInit {


  errorMessage: string;
  currentarticletype: string;
  id: number;
  pathname: any;
  articleID: number;
  articleTitle: string;
  articleText: string;
  articletype: any;


  JSONdata: any;
  objectData: {};
  objKey: any;
  objVal: string;
  url: any;




  constructor(
    private http: HttpClient,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private location: Location

  ) { }

  ngOnInit() {
    this.articletype = this.activatedRoute.snapshot.params['articletype'];
    this.pathname = this.activatedRoute.snapshot.params['id'];
    console.log(this.pathname);
    console.log(this.articletype);
    this.matchJsonFile();
    this.getArticleType();
  }


  getJson() {
    return this.http.get('../../../../assets/help-content/articles/' + this.articletype + '.json');
  }

  matchJsonFile() {
    this.getJson().subscribe(
      (data) => {
        console.log(data);   // The type of data is array.
        this.JSONdata = data;
        this.JSONdata.forEach(element => {
          this.objectData = element;
          this.objKey = Object.keys(this.objectData);
          this.getArticleID();
        });
      },
      (err) => {console.log(err), this.errorMessage = 'Sorry, but something went wrong.'; }
    );
  }


  // get value of ArticleID key from JSON file
  getArticleID() {
    const articleIDkey = this.objKey[0];
    console.log('key: ', articleIDkey);
    for (this.objKey in this.objectData) {
      if (this.objectData.hasOwnProperty(articleIDkey)) {
        const articleIDValue = this.objectData[articleIDkey];
        console.log('articleIDValue: ', articleIDValue);
        this.matchArticleID(articleIDValue);
        break;
      } else { console.log('not found key ----- articleID!'); }
    }
  }

  // match ID value of JSON file and router pathname, and set articleID innerHTML
  matchArticleID(jsonID) {
    this.id = this.pathname;
    console.log('id: ', this.id);
    if (jsonID === this.id) {
      console.log('The id values are the same!');
      this.articleID = this.id;
      this.getAndSetTitle(this.id, this.objectData);
      this.getAndSetText(this.id, this.objectData);
    }
  }

  // get value of articleTitle key from JSON file
  getAndSetTitle(articleID, objectData) {
    const titleKey = 'articleTitle';
    if (objectData.hasOwnProperty(titleKey)) {
      const titleValue = objectData[titleKey];
      console.log('titleValue: ', titleValue);
      this.articleTitle = titleValue;
    }
  }

  // get articleText value of articleID key from JSON object, and set articleText innerHTML
  getAndSetText(articleID, objectData) {
    const textKey = 'articleText';
    if (objectData.hasOwnProperty(textKey)) {
      const textValue = objectData[textKey];
      console.log('textValue: ', textValue);
      this.articleText = textValue;
    }
  }
// show current articletype
  getArticleType() {
    console.log(this.articletype);
    this.currentarticletype = '';
    if (this.articletype === 'applicants') {
      this.currentarticletype = 'For Applicant';
    }
    if (this.articletype === 'teachers') {
      this.currentarticletype = 'For Teachers';
    }
    if (this.articletype === 'students') {
      this.currentarticletype = 'For Students';
    }
  }

// previous last page
  previous() {
    this.location.back(); // <-- go back to previous location on cancel
  }



}
