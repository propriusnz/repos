import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tutor-ratings',
  templateUrl: './tutor-ratings.component.html',
  styleUrls: ['./tutor-ratings.component.css']
})
export class TutorRatingsComponent implements OnInit {
  rate: number;
  bages = [
    {name: 'fun', capacity: 12, src: '././assets/images/Fun.svg', color: 'badge-yellow'},
    {name: 'accent', capacity: 42, src: '././assets/images/Accent.svg', color: 'badge-blue'},
    {name: 'advanced', capacity: 15, src: '././assets/images/Advanced.svg', color: 'badge-pink'},
    {name: 'beginner', capacity: 66, src: '././assets/images/Beginners.svg', color: 'badge-dark-green'},
    {name: 'coach', capacity: 27, src: '././assets/images/Coach.svg', color: 'badge-purple'},
    {name: 'conver', capacity: 0, src: '././assets/images/Conversation.svg', color: 'badge-dark-blue'},
    {name: 'expert', capacity: 8, src: '././assets/images/Expert.svg', color: 'badge-brown'},
    {name: 'grammer', capacity: 1, src: '././assets/images/Grammar.svg', color: 'badge-blue'},
    {name: 'kids', capacity: 2, src: '././assets/images/Kids.svg', color: 'badge-light-red'},
    {name: 'material', capacity: 0, src: '././assets/images/Materials.svg', color: 'badge-blue'},
    {name: 'motivation', capacity: 0, src: '././assets/images/Motivation.svg', color: 'badge-orange'},
    {name: 'tech', capacity: 0, src: '././assets/images/Tech.svg', color: 'badge-light-green'},
    {name: 'writing', capacity: 0, src: '././assets/images/Writing.svg', color: 'badge-yellow'}
    ];


  constructor() { }

  ngOnInit() {
    this.rate = 2;
    if ($('#comment').height() > 90) {
      $('#comment').addClass('overRead');
      $('#read-more').css('display', 'block');
    }
  }

  readMore() {
    $('#comment').removeClass('overRead');
    $('#read-more').css('display', 'none');
  }
}
