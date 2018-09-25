import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-resource-summary',
  templateUrl: './resource-summary.component.html',
  styleUrls: ['./resource-summary.component.css']
})
export class ResourceSummaryComponent implements OnInit {

  @Input() basicFormData: any;
  @Input() resourceData: object;
  @Input() resourceType: any;

  constructor() { }

  ngOnInit() {
    console.log('xcxcxcxcxcxcxcxcxxcxcxcxcxcxcxcxc');
    console.log(this.basicFormData);
    console.log(this.resourceType);
  }
}