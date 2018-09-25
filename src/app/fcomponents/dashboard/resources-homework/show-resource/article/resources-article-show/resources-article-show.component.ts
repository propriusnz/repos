
// Display article content

import { 
  Component, 
  OnInit,
  Input,
} from '@angular/core';

import { CommonSupportService } from '../../../../../../services/support/common-support.service';

@Component({
  selector: 'app-resources-article-show',
  templateUrl: './resources-article-show.component.html',
  styleUrls: ['./resources-article-show.component.css']
})
export class ResourcesArticleShowComponent implements OnInit {

  defaultImgUrl = 'http://proprius.co.nz/api/public/userimg/default-cp.jpeg';
  defaultSubImg = '../../../../../assets/postImgs/default.jpg';
  defaultSubIcon = '../../../../../assets/icons/categoryIcon.png';

  @Input() data: any;

  constructor(
    private commonSupport: CommonSupportService
  ) { }

  ngOnInit() {

    console.log('Show article....');

    console.log('Received data is:');
    console.log(this.data);

  }

  // when user Profile img not being edited, put default img into it.
  defaultUserImg(e){
    e.target.src=this.defaultImgUrl;
  }

  // when subjectIcon cannot match to subject name, put default subIcon into it.
  subjectIcon(e){
    e.target.src = this.defaultSubIcon;
  }

  // If user does not insert img into post, add default img instead of null
  subjectImg(e) {
    e.target.src = this.defaultSubImg;
  }

}
