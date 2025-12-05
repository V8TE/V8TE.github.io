import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vc-college-info',
    templateUrl: 'college-info.component.html',
    styleUrls: ['./college-info.component.css', '../../shared/common.less'],
    standalone: false
})

export class CollegeInfoComponent implements OnInit {
  @Input() title!: String
  @Input() subjects!: any[]
  @Input() displayedAnswers!: any[]
  @Input() elections: Array<String> = ["Titulaires"]
  @Input() totalVoters!: String
  @Input() voters!: String
  isMobile: boolean = false
  isPanelExpanded: boolean = true;
  description: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

  toggleDescription() {
    this.isPanelExpanded = !this.isPanelExpanded;
  }

  getTruncatedDescription(): string {
    if (!this.description) {
      return '';
    }
    if (this.description.length <= 100) {
      return this.description;
    }
    return this.description.substring(0, 100) + '...';
  }

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
