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

  getFormattedDateTime(): string {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    return `le ${day}/${month}/${year} à ${hours}h${minutes}`;
  }
  
}
