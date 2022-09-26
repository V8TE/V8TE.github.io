import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vc-poll-planned-list',
  templateUrl: 'poll-planned-list.component.html',
  styleUrls: ['./poll-planned-list.component.css']
})

export class PollPlannedList implements OnInit {
  @Input() displayedAnswers!: Array<String>
  @Input() title!: String
  @Input() subject!: String
  isMobile: boolean = false

  ngOnInit(): void {
    this.checkIfMobile()
  }

  checkIfMobile() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.isMobile =  true;
    } else {
      this.isMobile = false;
    }
  }
  
}
