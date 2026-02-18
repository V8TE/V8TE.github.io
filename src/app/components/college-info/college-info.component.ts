import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vc-college-info',
    templateUrl: 'college-info.component.html',
    styleUrls: ['./college-info.component.css', '../../shared/common.less'],
    standalone: false
})

export class CollegeInfoComponent implements OnInit {
  @Input() title!: String
  @Input() pollName!: String
  @Input() subjects!: any[]
  @Input() totalVoters!: String
  @Input() voters!: String
  @Input() status!: String
  displayedStatus!: String
  isMobile: boolean = false
  isPanelExpanded: boolean = true;

  ngOnInit(): void {
    this.checkIfMobile()
  }

  ngOnChanges(): void {
    if (this.status === 'OPEN') {
      this.displayedStatus = "EN COURS...";
    } else {
      this.displayedStatus = "TERMINÉ";
    }
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
