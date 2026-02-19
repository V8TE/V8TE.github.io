import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vc-ballot-info',
  templateUrl: 'ballot-info.component.html',
  styleUrls: ['./ballot-info.component.css', '../../shared/common.less'],
  standalone: false
})

export class BallotInfoComponent implements OnInit {
  @Input() title!: String
  @Input() subjects!: any[]
  @Input() displayedAnswers!: any[]
  @Input() votesSha: Array<{vote: String}> = [].map(vote => ({ vote }))
  @Input() votesShaF: Array<{vote: String}> = [
  ].map(vote => ({ vote }))
  @Input() tallySha: String | undefined;
  @Input() txTallyId: String | undefined;
  @Input() totalVoters!: String
  @Input() votes!: String
  isMobile: boolean = false
  searchSha: string = ''
  selectedCollege: string = 'college1'
  foundShaIndex: number = -1
  first: number = 0

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
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  searchForSha() {
    if (!this.searchSha.trim()) {
      this.foundShaIndex = -1;
      return;
    }

    const index = this.votesSha.findIndex(item => 
      item.vote.toString().toLowerCase() === this.searchSha.trim().toLowerCase()
    );
    
    if (index !== -1) {
      this.foundShaIndex = index;
      // Calculer la page où se trouve l'élément (5 éléments par page)
      const rowsPerPage = 5;
      this.first = Math.floor(index / rowsPerPage) * rowsPerPage;
    } else {
      this.foundShaIndex = -1;
    }
  }

  isFoundRow(rowIndex: number): boolean {
    return rowIndex === this.foundShaIndex;
  }

}
