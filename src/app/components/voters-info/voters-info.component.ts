import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vc-voters-info',
    templateUrl: 'voters-info.component.html',
    styleUrls: ['./voters-info.component.css', '../../shared/common.less'],
    standalone: false
})

export class VotersInfoComponent implements OnInit {
  @Input() totalVoters!: String
  @Input() voters!: String
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
