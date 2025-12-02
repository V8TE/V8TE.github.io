import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vc-poll-info',
    templateUrl: 'poll-info.component.html',
    styleUrls: ['./poll-info.component.css', '../../shared/common.less'],
    standalone: false
})

export class PollInfoComponent implements OnInit {
  @Input() startDate!: String
  @Input() endDate!: String
  @Input() startHour!: String
  @Input() endHour!: String
  isMobile: boolean = false

  ngOnInit(): void {
    this.checkIfMobile()
  }

  ngOnChanges(): void {
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
