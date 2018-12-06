import { Component, OnInit ,Input, PLATFORM_ID, Injectable, Inject } from '@angular/core';
// import * as jsPDF from 'jspdf';
import { setStyles } from '../../../../node_modules/@angular/animations/browser/src/util';
import * as moment from 'moment';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { LOCAL_STORAGE , WINDOW } from '@ng-toolkit/universal';

@Injectable({
  providedIn: 'root'
})

export class PdfCreationService {
  titleHTML:string;
  contentHTML:string;
  paper: any;
  isBrowser=false

  constructor(
    @Inject(PLATFORM_ID) private platformId,
    @Inject(WINDOW) private window: Window,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.isBrowser = true
    }
    if(this.isBrowser = false){
      return;
    }
   }

   // this is for transaction invoice pdf creator

  // template html code:
  // <div class="container-fluid" id="template_paper"></div>
  // template ts code:
  //let sourceDom = document.getElementById("template_paper");
  //this.pdfCreation.createTransPdf(sourceDom, this.billInfo, this.originalData);

  public createTransPdf(sourceDom,user, trans) {
    if(!this.isBrowser){
      var doc = new jsPDF("p", "pt", "letter"),
      source = sourceDom,
          margins = {
            top: 40,
            bottom: 60,
            left: 40,
            width: 522
          };

      doc.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top +150,
        {
          // y coord
          width: margins.width // max width of content on PDF
        },
        function(dispose) {
          // dispose: object with X, Y of the last line add to the PDF
          //          this allow the insertion of new lines after html
          // some variables
            var logo = {
              src: 'assets/logo/learnspace_logo_white.bmp',
              w: 800,
              h: 285}
            var lineHeight;
          function setToTitle(){
            //Header1 big and bold
            doc.setFontSize(28);
            doc.setTextColor(0,0,0);
            doc.setFontStyle("bold");
            lineHeight =50;
          }
          function setToSubTitle(){
            //Sub-header bold
            doc.setFontSize(12);
            doc.setTextColor(0,0,0);
            doc.setFontStyle("bold");
            lineHeight = 25;
          }
          function setToContent(){
            // Context
            doc.setFontStyle("");
            doc.setFontSize(11);
            lineHeight =18;
            doc.setTextColor(0,0,0);
          }
          function setToPageHead(){
            // top of page 页眉
            doc.setFontStyle("");
            doc.setFontSize(12);
            lineHeight =35;
            doc.setTextColor(0,0,0);

          }

          function setToTableHead(){
            doc.setFontStyle("bold");
            doc.setFontSize(12);
            lineHeight =35;
            setColorTo("gray");
          }

          function setToTableContent(){
            doc.setFontSize(10);
            doc.setFontStyle("");
            lineHeight=35;
            setColorTo("black");
          }
          function setColorTo(param:string){
            switch (param){
              case "blue": {
                doc.setDrawColor(0,128,255);
                doc.setTextColor(0,128,255);
                break;
              }
              case "gray":{
                doc.setDrawColor(102,102,102);
                doc.setTextColor(102,102,102);
                break;
              }
              case "black":{
                doc.setDrawColor(0,0,0);
                doc.setTextColor(0,0,0);
                break;
              }
              default:{
                doc.setDrawColor(0,0,0);
                doc.setTextColor(0,0,0);
                break;
              }
            }
          }
          
          //var logo_sizes = imgSizes(agency_logo.w, agency_logo.h, 60);
          let mainHeight = 0;
          doc.setPage(1); 
          doc.addImage(logo.src, 'PNG', 25, 50, 150, 55);
          
          

          setToSubTitle();
          let base= 125;
          let left2=580;
          doc.setFont("helvetica");
          doc.setFontSize(25);
          doc.setFontType("italic");
          setColorTo("blue");
          //doc.setFontStyle("italic");
          doc.text("Invoice",left2, base-lineHeight*2,'right');
          // setToContent();
          // doc.setFontType("italic");
          // doc.text('Produced by Proprius Ltd.', left2, base-lineHeight*1.5,'right');
          // doc.text('15 stock street', left2, base-lineHeight,'right'); 
          // doc.text('New Lynn', left2, base,'right');        
          // doc.text('Auckland', left2, base+lineHeight,'right');    
          // doc.text('New Lynn, Auckland, New Zealand', left2, base,'right');  
          // doc.text('Business number: 1213123123', left2, base+lineHeight*3,'right');        
          

          // set bill inifo
          let billBase= 225;
          let leftBase1 = 30;
          let rightBase1 = leftBase1+200;
          setToSubTitle();
          doc.text('Summary', leftBase1, billBase-lineHeight*0.5,'left');
          setToContent();
          doc.line(leftBase1,billBase-lineHeight/2,leftBase1+300,billBase-lineHeight/2);
          doc.text('Bill to:', leftBase1, billBase+lineHeight/2,'left');
          doc.text(user.name, rightBase1+70, billBase+lineHeight/2,'left');
          doc.text('Total amount:', leftBase1, billBase+lineHeight*1.5,'left');
          doc.text("$"+user.allAmount, rightBase1+70, billBase+lineHeight*1.5,'left');
          doc.text('Date:', leftBase1, billBase+lineHeight*2.5,'left');
          doc.text(moment().format('ll h:mm A'), rightBase1, billBase+lineHeight*2.5,'left');
          // doc.text(user.street, leftBase1, billBase+lineHeight*2,'left');
          // doc.text(user.suburban, leftBase1, billBase+lineHeight*3,'left');
          // doc.text(user.city, leftBase1, billBase+lineHeight*4,'left');
          // doc.text(user.country, leftBase1, billBase+lineHeight*5,'left');
          
          //details
          // setToSubTitle();
          // doc.text('Details', leftBase1, billBase+lineHeight*6,'left');
          // setToContent();
          // doc.line(leftBase1,billBase+lineHeight*8+lineHeight/2,leftBase1+230,billBase+lineHeight*8+lineHeight/2);
          // doc.text('Invoice number    ...........', leftBase1, billBase+lineHeight*10,'left');       
          // doc.text(user.invoiceNumber, rightBase1, billBase+lineHeight*10,'left');
          // doc.text('Invoice date    .................', leftBase1, billBase+lineHeight*11,'left');
          // doc.text(user.invoiceDate, rightBase1, billBase+lineHeight*11,'left');
          // doc.text('Bill ID    .........................', leftBase1, billBase+lineHeight*12,'left');
          // doc.text(user.billId, rightBase1, billBase+lineHeight*12,'left');
          // doc.text('Account ID    ..................', leftBase1, billBase+lineHeight*13,'left');
          // doc.text(user.accountId, rightBase1, billBase+lineHeight*13,'left');

          // overAll
          // let centerLine = 350;
          // setToSubTitle();
          // doc.text('Bill summary', centerLine, billBase+lineHeight*6,'left');
          // setToContent();
          // doc.line(centerLine,billBase+lineHeight*8+lineHeight/2,centerLine+230,billBase+lineHeight*8+lineHeight/2);
          // doc.text('Total amount:'+user.allAmount, centerLine, billBase+lineHeight*10,'left');
          // doc.text('Total hour:'+user.allHour, centerLine, billBase+lineHeight*11,'left');
          // doc.text('GST:'+user.tax, centerLine, billBase+lineHeight*12,'left');
          // doc.text('Date:'+user.invoiceDate, centerLine, billBase+lineHeight*13,'left');


          setToTableHead();
          let tableBase = 390;
          let leftLine = 30;
          let colWidth = 30;
          setToSubTitle();
          doc.text('Transaction detail', leftBase1, tableBase-lineHeight*1.5,'left');
          setToPageHead();
          setColorTo("gray"); // draw gray lines
          doc.setLineWidth(0.3);
          let halfCol =colWidth/4; //To make title centered
          
          setToTableContent();
          //table top line
          doc.line(30,tableBase-lineHeight+6,580,tableBase-lineHeight+6);
          doc.text('Date', leftLine+colWidth, tableBase,'left');
          // doc.text('Status', leftLine+colWidth*4+halfCol, tableBase,'left');
          doc.text('Subject', leftLine+colWidth*5, tableBase,'left');
          // doc.text('Student', leftLine+colWidth*9+halfCol*3, tableBase,'left');
          doc.text('Tutor', leftLine+colWidth*8+halfCol, tableBase,'left');
          doc.text('Unit price($)', leftLine+colWidth*11+halfCol, tableBase,'left');
          doc.text('QTY', leftLine+colWidth*15+halfCol, tableBase,'left');
          // doc.text('Amount($)', leftLine+colWidth*16+halfCol, tableBase,'left');
          
          doc.line(30, tableBase+6, 580, tableBase+6);
          for(let i=0; i<trans.length; i++){
            console.log(trans[i])
            let data = trans[i];
            if(tableBase+lineHeight*(i+1)>=700){// to chaeck ned set new page or not
              doc.addPage();
              mainHeight +=700;  //16 row is a main page
              tableBase = 0-lineHeight*(i-1-(mainHeight/700-1)*19);
            }
            doc.text(data['order'].created_at, leftLine, tableBase+lineHeight*(i+1),'left');
            // doc.text(data.session_status, leftLine+colWidth*3.2+halfCol, tableBase+lineHeight*(i+1),'left');
            doc.text(data['tutor_key'].discipline, leftLine+colWidth*5, tableBase+lineHeight*(i+1),'left');
            // doc.text(data.student, leftLine+colWidth*9+halfCol*3, tableBase+lineHeight*(i+1),'left');
            doc.text(data['tutor_key'].first_name, leftLine+colWidth*8+halfCol, tableBase+lineHeight*(i+1),'left');
            // doc.text(''+data.hourly_rate, leftLine+colWidth*13+halfCol*2, tableBase+lineHeight*(i+1),'left');

            doc.text(''+data['order'].order_price, leftLine+colWidth*12, tableBase+lineHeight*(i+1),'left');

            doc.text(''+data['order'].order_quantity, leftLine+colWidth*15+halfCol*2, tableBase+lineHeight*(i+1),'left');
            doc.line(30, tableBase+lineHeight*(i+1)+6, 580, tableBase+lineHeight*(i+1)+6);
          }

          let tableFinishBase =tableBase+lineHeight*(trans.length+2)-20;
          let tableFinishRow = lineHeight/2;
          setToSubTitle();
          // doc.text('Total Hours:', 450, tableFinishBase,'left');
          // doc.text(user.allHour+"", 550, tableFinishBase,'left');
          // doc.text('GST:', 450, tableFinishBase+tableFinishRow,'left');
          // doc.text(user.tax+"", 550, tableFinishBase+tableFinishRow,'left');
          doc.text('Total Amount:', 450, tableFinishBase+tableFinishRow*2,'left');
          doc.text('$'+user.allAmount, 550, tableFinishBase+tableFinishRow*2,'left');
          
          //table end

          // final contact info
          
          let contactLine = tableFinishBase+tableFinishRow*6;
          if(contactLine>=650){// to chaeck ned set new page or not
            doc.addPage();
            contactLine = 140;
          }
          setToSubTitle();
          doc.text('If you have any questions about this invoice, please contact:', leftBase1, contactLine-lineHeight*0.5,'left');
          setToContent();
          doc.line(leftBase1,contactLine-lineHeight/2,leftBase1+300,contactLine-lineHeight/2);
          // doc.text('Mike Lee', leftBase1, contactLine+lineHeight*0.5,'left');
          doc.text('Phone: 021-02264770', leftBase1, contactLine+lineHeight*0.5,'left');
          doc.text('Email: tutoring@learnspace.co.nz', leftBase1, contactLine+lineHeight*1.5,'left');
          doc.text('Our website: www.learnspace.co.nz', leftBase1, contactLine+lineHeight*2.5,'left');
          doc.text('Thank you', leftBase1, contactLine+lineHeight*3.5,'left');

          var pageCount = doc.internal.getNumberOfPages();
          for(let i = 0; i < pageCount; i++) { 
              doc.setPage(i); 
              doc.text(450,750, "" +doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);
            }
          // this.window.open(doc.output('bloburl'), '_blank');
          window.open(doc.output('bloburl'), '_blank');
        },
        margins
      );
    }
  }
  // this is for exam result pdf creator

  // tempalte html code:
  // <div class="container-fluid" id="template_paper">
  //         <div id="paper_title"></div>
  //         <div id="paper_content"></div>
  // </div>
  // template ts code:
  // let paperTitleDom=document.getElementById('paper_title');
  // let paperContentDom=document.getElementById('paper_content');
  // let sourceDom = document.getElementById("template_paper");
  // this.pdfCreation.createExamPdf(paperTitleDom, paperContentDom, sourceDom);


  public createExamPdf(paperTitleDom, paperContentDom,sourceDom){
    if(this.isBrowser){

      this.setPaper();// to set the paper object

      this.contentHTML=this.paper.content;
      this.titleHTML=this.paper.title;
      console.log(this.paper);
      this.createTitleHtml(paperTitleDom);
      this.createQuestionHtml(paperContentDom);
      this.imgComplie(this.paper);
      this.createStyle(this.paper);
      var doc = new jsPDF("p", "pt", "letter"),
      source = sourceDom,
          margins = {
            top: 40,
            bottom: 60,
            left: 40,
            width: 522
          };

      
      doc.fromHTML(
        source, // HTML string or DOM elem ref.
        margins.left, // x coord
        margins.top+150,
        {
          // y coord
          width: margins.width // max width of content on PDF
        },
        function(dispose) {
          // dispose: object with X, Y of the last line add to the PDF
          //          this allow the insertion of new lines after html
          // some variables
            var logo = {
              src: 'assets/tutorpics/front1.jpg',
              w: 800,
              h: 285
          }

          //var logo_sizes = imgSizes(agency_logo.w, agency_logo.h, 60);
          doc.setPage(1); 
          doc.addImage(logo.src, 'PNG', 50, 30, 120, 110);
          doc.setFontSize(20);
          doc.setFontType("italic");
          doc.setTextColor(0,128,255);
          doc.text(60,170, "Learnspace"); 
          doc.setTextColor(0,0,0);
          doc.setFontSize(16); 

          //doc.text(350,50, "Final Examination");
          doc.text("Final Examination", 390, 50, 'center');
          //doc.text(350,70, "Semester 1,2017");        
          doc.text("Semester 1,2017", 390, 70, 'center');        
  //        doc.text(300,80, "ISCG6413 Testing and Quality Assurance in ICT");  
          doc.setFontSize(14);                       
          var strArr = doc.splitTextToSize("ISCG6413 Testing and Quality Assurance in ICT",350)
          doc.text(strArr, 390, 90,'center');
          doc.setFontSize(12);
          let base= 115;
          let rowheight =15;
          let left1=220;
          let left2=390
          doc.text('Date:', left1, base,'left');
          doc.text('20th June 2017', left2, base,'left');        
          doc.text('Commencement:', left1, base+rowheight,'left');
          doc.text('1:00PM', left2, base+rowheight,'left');        
          doc.text('Time Allowed:', left1, base+rowheight*2,'left');
          doc.text('2 hours plus 10 minutes read time', left2, base+rowheight*2,'left');        
          doc.text('Weighting:', left1, base+rowheight*3,'left');
          doc.text('50%', left2, base+rowheight*3,'left');        
          doc.text('Marks:', left1, base+rowheight*4,'left');
          doc.text('100', left2, base+rowheight*4,'left');        
          
          doc.setLineWidth(0.3);
          doc.line(40, 185, 570, 185);
          doc.line(200, 20, 200, 185);

          var pageCount = doc.internal.getNumberOfPages();
            for(let i = 0; i < pageCount; i++) { 
              doc.setPage(i); 
              doc.text(450,750, ""+doc.internal.getCurrentPageInfo().pageNumber + "/" + pageCount);
            }
          this.window.open(doc.output('bloburl'), '_blank');
        },
        margins
      );
    }
  }

  createTitleHtml(paperTitleDom){
    let title = document.createElement('p');
    title.innerHTML=this.titleHTML;
    paperTitleDom.appendChild(title);
  }
  createQuestionHtml(paperContentDom){
    let content = document.createElement('p');
    content.innerHTML=this.contentHTML;
    paperContentDom.appendChild(content); 
  }
  //replace {img} to base64 imagine
  imgComplie(paper){
    console.log(this.contentHTML);
    paper.img.forEach(element => {
      let reg=new RegExp('{'+element.name+'}','g');
      this.titleHTML=this.titleHTML.replace(reg,element.value);
      console.log(this.titleHTML);
      this.contentHTML=this.contentHTML.replace(reg,element.value);
      console.log(this.contentHTML);      
    });
  }

  createStyle(paper){
    let css = paper.style.map(obj=>{return obj.name+obj.text}).join(';')
    let head = document.head || document.getElementsByTagName('head')[0];
    let style = document.createElement('style');

    style.type = 'text/css';
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);  
  }

  setTable(trans){
    console.log(trans);
  };

  // set the paper object of exam result
  setPaper(){
    let localpaper={title:'',content:'',style:[],img:[]};

    localpaper.title='';

    localpaper.title=localpaper.title+'\
    <table id="tab_customers" class="table table-striped">\
         <colgroup>\
             <col width="20%">\
                 <col width="20%">\
                     <col width="20%">\
                         <col width="20%">\
         </colgroup>\
         <thead>\
             <tr class="warning">\
                 <th>Country</th>\
                 <th>Population</th>\
                 <th>Date</th>\
                 <th>Age</th>\
             </tr>\
         </thead>\
         <tbody>\
             <tr>\
                 <td>China</td>\
                 <td>1,363,480,000</td>\
                 <td>March 24, 2014</td>\
                 <td>19.1</td>\
             </tr>\
             <tr>\
                 <td>India</td>\
                 <td>1,241,900,000</td>\
                 <td>March 24, 2014</td>\
                 <td>17.4</td>\
             </tr>\
             <tr>\
                 <td>United States</td>\
                 <td>317,746,000</td>\
                 <td>March 24, 2014</td>\
                 <td>4.44</td>\
             </tr>\
             <tr>\
                 <td>Indonesia</td>\
                 <td>249,866,000</td>\
                 <td>July 1, 2013</td>\
                 <td>3.49</td>\
             </tr>\
             <tr>\
                 <td>Brazil</td>\
                 <td>201,032,714</td>\
                 <td>July 1, 2013</td>\
                 <td>2.81</td>\
             </tr>\
         </tbody>\
     </table>';
 
    localpaper.title='\
    <div class="row">\
    <div class="col-4">\
      <div class="invoice-title">\
        <h2>Invoice</h2>\
      </div>\
    </div>\
    <div class="col-4">\
      <p class="lead">Order # 12345</p>\
    </div>\
  </div>\
  <hr>\
  <div class="row">\
    <div class="col-6">\
      <address>\
    		<strong>Billed To:</strong><br>\
    		John Smith<br>\
    		1234 Main<br>\
    		Apt. 4B<br>\
    		Springfield, ST 54321\
    	</address>\
    </div>\
    <div class="col-6 text-right">\
      <address>\
        <strong>Shipped To:</strong><br>\
    		Jane Smith<br>\
    		1234 Main<br>\
    		Apt. 4B<br>\
    		Springfield, ST 54321\
    	</address>\
    </div>\
  </div>\
    ';
    localpaper.content='\
    <div class=j1>Waat I am able to generate pdf using jsPDF lib from html table, but i am getting problem of overlapping columns. Because I want to display 20 columns in the sheet. I have changed the options portrait to landscape and set the width 5000 in exporting script options as well as html table width.</div>\
    <br><br>\
    <div>Waat I am able to generate pdf using jsPDF lib from html table, but i am getting problem of overlapping columns. Because I want to display 20 columns in the sheet. I have changed the options portrait to landscape and set the width 5000 in exporting script options as well as html table width.</div>\
    <img class="col-4" src={img1}> <img class="col-4" src={img2}> <img class="col-4" src={img1}> <img class="col-4" src={img2}>';
  let style_ele=
    {name:'.j1',
    text:
      '{\
      font-size:20px;\
      font-weight: bold;\
      color;black\
      }'
    };
  localpaper.style.push(style_ele);
  style_ele=
    {name:'.j2',
    text:
      '{\
      font-size:30px;\
      font-weight: bold;\
      color;black\
      }'
    };
  localpaper.style.push(style_ele);

  let img1='data:image/png;base64,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';
  let img2='data:image/png;base64,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';
  let img_ele1={name:'img1',value:img1};
  localpaper.img.push(img_ele1);
  let img_ele2={name:'img2',value:img2};
  localpaper.img.push(img_ele2);
  
  this.paper=Object.assign({},localpaper);    
  }
}