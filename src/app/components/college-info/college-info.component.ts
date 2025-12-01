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

  ngOnInit(): void {
    this.checkIfMobile()
    console.log(this.title);
    console.log(this.subjects);
    console.log(this.displayedAnswers);
  }

  ngOnChanges(): void {
    console.log(this.title);
    console.log(this.subjects);
    console.log(this.displayedAnswers);
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
