import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent implements OnInit {

  systemTab: boolean = true;
  sessionTab: boolean = false;
  replyTab: boolean = false;
  announcementTab: boolean = false;

  notis: any;
  unreadNotisNumber: number = 0;

  systemNotis: any = [];
  sessionNotis: any = [];
  replyNotis: any = [];
  announceNotis: any = [];

  systemNotisNum : number;
  sessionNotisNum: number;
  replyNotisNum: number;
  announceNotisNum: number;

  constructor(
    public dialModalRef: MatDialogRef<any>
  ) {
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
    ];
    for (let i = 0; i < this.notis.length; i++) {
      if (this.notis[i].read_status == 'unread') {
        this.unreadNotisNumber += 1;
      }
    }
  }

  ngOnInit() {
    this.dialModalRef.updatePosition({ top: '50px', right: '50px' });
    this.dialModalRef.updateSize('500px', 'auto') ;

    

    for (let i = 0; i < this.notis.length; i++) {
      if (this.notis[i].notification_type == 'system' && this.notis[i].read_status == 'unread') {
        this.systemNotis.push(this.notis[i]);
      } else if (this.notis[i].notification_type == 'session' && this.notis[i].read_status == 'unread') {
        this.sessionNotis.push(this.notis[i]);
      } else if (this.notis[i].notification_type == 'reply' && this.notis[i].read_status == 'unread') {
        this.replyNotis.push(this.notis[i]);
      } else if (this.notis[i].notification_type == 'announcement' && this.notis[i].read_status == 'unread') {
        this.announceNotis.push(this.notis[i]);
      }
    }

    this.systemNotisNum=this.systemNotis.length;
    this.sessionNotisNum=this.sessionNotis.length;
    this.replyNotisNum=this.replyNotis.length;
    this.announceNotisNum=this.announceNotis.length;
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

  read(i, type) {
    if (type == 'system') {
      if (this.systemNotis[i].read_status == 'unread') {
        this.systemNotis[i].read_status = 'read'
      }
    } else if (type == 'session') {
      if (this.sessionNotis[i].read_status == 'unread') {
        this.sessionNotis[i].read_status = 'read'
      }
    } else if (type == 'reply') {
      if (this.replyNotis[i].read_status == 'unread') {
        this.replyNotis[i].read_status = 'read'
      }
    } else if (type == 'announcement') {
      if (this.announceNotis[i].read_status == 'unread') {
        this.announceNotis[i].read_status = 'read'
      }
    }
  }

}
