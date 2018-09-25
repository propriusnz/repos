import {
  Component,
  OnInit,
  OnDestroy,
  Input,
  EventEmitter
} from '@angular/core';
import { Subscription } from 'rxjs';

import { ResourceRepositoryService } from '../../../../../services/repositories/resource-repository.service';

@Component({
  selector: 'app-article-parent',
  templateUrl: './article-parent.component.html',
  styleUrls: ['./article-parent.component.css']
})
export class ArticleParentComponent implements OnInit, OnDestroy {

  // mode
  @Input() mode: string;
  // article data
  @Input() data: any;

  // editor content
  editorContent: string;

  resourcesDataSignalSubject: Subscription;

  constructor(
    private resourceRepositoryService: ResourceRepositoryService
  ) { }

  ngOnInit() {

    if(this.mode == 'edit') {
      this.editorContent = this.data;
    }
    
    // handling signal
    this.resourcesDataSignalSubject = this.resourceRepositoryService.resourcesDataSignal.subscribe(
      res => {
        if(Object.keys(res).length != 0) {
          console.log('parent received signal...');
          console.log(res);
          let op = res['op'];
          if(op == 'request') { // is required to prepare and send data
            this.resourceRepositoryService.sendResourcesData(this.editorContent, { info: 'success', postType: 0 });
          }
        }
      }
    );
  }

  // get editor content
  handleEditorContent(data: object){
    this.editorContent = String(data);
  }

  ngOnDestroy(): void {
    // clear related subject
    // this.resourceRepositoryService.clearResourcesDataSignalSubject();
    // this.resourceRepositoryService.clearResourcesDataSubject();
    // this.resourceRepositoryService.clearResourcesEditDataSubject();
    this.resourcesDataSignalSubject.unsubscribe();
  }

}
