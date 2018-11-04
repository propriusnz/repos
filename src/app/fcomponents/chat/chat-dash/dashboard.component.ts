import { Component, OnInit, ViewChild } from '@angular/core';
import {NgbDropdownConfig, NgbModule, NgbDropdown} from '@ng-bootstrap/ng-bootstrap';
import { MessengerHelperService } from '../../../services/helpers/messenger-helper.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  @ViewChild('myDrop') trigger: NgbDropdown;
  count = 0;
  trigger_messenger = null;
  hasLoggedin = false; // check if user has logged in or not

  constructor(config: NgbDropdownConfig,
  private messengerHelperService: MessengerHelperService
  ) {

    config.placement = 'top-right';
    config.autoClose = false;
  }

  ngOnInit() {
    if (localStorage.getItem('lsaWho') !== null) {
      this.hasLoggedin = true;
      console.log(this.hasLoggedin);
    }
    // subscribe messenger helper
    this.messengerHelperService.trigger.subscribe(value => {
      this.trigger_messenger = value;
      if (this.trigger_messenger === 'no') {
        console.log('i am no');
        //this.trigger.close();
      
        //this.trigger.open();
      } else {
        console.log(value);
        this.trigger.open();
      }
    });
  }


  handleUnreadCount(count){
    this.count = count;
  }


}
