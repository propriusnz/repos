import { Component, OnInit, Input } from '@angular/core';
import { CommonSupportService } from '../../../../../../services/support/common-support.service';

@Component({
  selector: 'app-resources-question-show',
  templateUrl: './resources-question-show.component.html',
  styleUrls: ['./resources-question-show.component.css']
})
export class ResourcesQuestionShowComponent implements OnInit {

  @Input() data: any;
  @Input() viewerType: string;
  questionCollection:any[]=[];

  //letter of choice
  str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  constructor(    private commonSupport: CommonSupportService
) { }

  ngOnInit() {
    console.log('Show question....');
    //console.log(this.viewerType);
    console.log('Received data is:');
    console.log(JSON.parse(this.data.post_body));
    //Convert json format to Object
    this.questionCollection= JSON.parse(this.data.post_body);
  }

}
