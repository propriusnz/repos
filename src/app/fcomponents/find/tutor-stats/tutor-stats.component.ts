import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-stats',
  templateUrl: './tutor-stats.component.html',
  styleUrls: ['./tutor-stats.component.css']
})
export class TutorStatsComponent implements OnInit {
  response_time = 5;
  time_text = '';
  response_rate = 100;
  attend_rate = 100;
  lessons = 2020;
  average_lesson = 6.4;
  stars = 4;

  constructor() { }

  ngOnInit() {
    if (this.response_time <= 1) {
      this.time_text = 'Within one hour';
    } else {
      if (this.response_time <= 12) {
      this.time_text = 'Within a few hours';
      } else {
        if (this.response_time <= 24) {
          this.time_text = 'Within a day';
        }
      }
    }
  }

}
