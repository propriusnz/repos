import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  systemTab: boolean = true;
  sessionTab: boolean = false;
  replyTab: boolean = false;
  announcementTab: boolean = false;

  notis: any;
  systemNotis :any=[];
  sessionNotis: any=[];
  replyNotis: any=[];
  announceNotis: any=[];

  display: Window;

  constructor() {
    this.notis = [
      {
        id: 1,
        date: '10/12/2018',
        message_author: 'someone',
        read_status: 'unread',
        notification_type: 'system',
        title: 'test',
        message: 'test content',
        specialLink: 'link',


      },
      {
        id: 2,
        date: '10/10/2018',
        message_author: 'someone',
        read_status: 'unread',
        notification_type: 'session',
        title: 'test1',
        message: 'test content1',
        specialLink: 'link',


      },
      {
        id: 3,
        date: '12/10/2018',
        message_author: 'someone',
        read_status: 'unread',
        notification_type: 'reply',
        title: 'test14',
        message: 'test content4',
        specialLink: 'link',


      },
      {
        id: 4,
        date: '10/10/2020',
        message_author: 'someone',
        read_status: 'read',
        notification_type: 'announcement',
        title: 'test10',
        message: 'test content7',
        specialLink: 'link',


      },
      {
        id: 5,
        date: '10/12/2018',
        message_author: 'someone',
        read_status: 'unread',
        notification_type: 'system',
        title: 'test1111',
        message: 'test content111',
        specialLink: 'link',


      },
    ]
  }

  ngOnInit() {
    console.log(
      this.systemTab,
      this.sessionTab,
      this.replyTab,
      this.announcementTab,
    );
    for(let i=0;i<this.notis.length; i++){
      if(this.notis[i].notification_type == 'system'){
        this.systemNotis.push(this.notis[i]);
      }else if(this.notis[i].notification_type == 'session'){
        this.sessionNotis.push(this.notis[i]);
      }else if(this.notis[i].notification_type == 'reply'){
        this.replyNotis.push(this.notis[i]);
      }else if(this.notis[i].notification_type == 'announcement'){
        this.announceNotis.push(this.notis[i]);
      }
    }
  }

  showSystem() {
    this.systemTab = true;
    this.sessionTab = false;
    this.replyTab = false;
    this.announcementTab = false;
  }

  showSession() {
    this.systemTab = false;
    this.sessionTab = true;
    this.replyTab = false;
    this.announcementTab = false;
  }

  showReply() {
    this.systemTab = false;
    this.sessionTab = false;
    this.replyTab = true;
    this.announcementTab = false;
  }

  showAnnouncement() {
    this.systemTab = false;
    this.sessionTab = false;
    this.replyTab = false;
    this.announcementTab = true;
  }

  read(i,type) {
    if(type == 'system'){
      if (this.systemNotis[i].read_status == 'unread') {
        this.systemNotis[i].read_status = 'read'
      }
    }else if(type == 'session'){
      if (this.sessionNotis[i].read_status == 'unread') {
        this.sessionNotis[i].read_status = 'read'
      }
    }else if(type == 'reply'){
      if (this.replyNotis[i].read_status == 'unread') {
        this.replyNotis[i].read_status = 'read'
      }
    }else if(type == 'announcement'){
      if (this.announceNotis[i].read_status == 'unread') {
        this.announceNotis[i].read_status = 'read'
      }
    }
  }

}
