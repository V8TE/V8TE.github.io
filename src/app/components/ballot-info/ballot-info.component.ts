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
  @Input() votesSha: Array<String> = []
  @Input() votesShaF: Array<{vote: String}> = [
    "0BBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg=",
    "1BBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg=",
    "2BBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg=",
    "3BBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg=",
    "4BBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg=",
    "5BBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg=",
    "6BBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg=",
    "7BBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg=",
    "8BBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg=",
    "9BBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg=",
    "ABBc3yb4fTTMg6MFloUsRET3UZP7e45UoZBcPdoSBzf2BGzVw185fYGUU60TY4MiBd0A8vwKoobD5RYLrou4Zrg="
  ].map(vote => ({ vote }))
  @Input() tallySha: String | undefined;
  @Input() txTallyId: String | undefined;
  @Input() totalVoters!: String
  @Input() voters!: String
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

    const index = this.votesShaF.findIndex(item => 
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
