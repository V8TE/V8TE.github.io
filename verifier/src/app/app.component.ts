import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SHA256, enc } from "crypto-js"
import { ApiService } from "src/app/shared/app.services";
import { Election } from './Models/Election';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'verifier';
  electionSha!: any;
  votes!: String;
  votesLenght!: String;
  voters!: String;
  votersLenght!: String;
  txPollId!: string;
  txVotersId!: string;
  txVotesId!: string;
  txTallyId!: string;
  // election = {
  //   "name": "", 
  //   "start":"", 
  //   "end":"", 
  //   "question":"", 
  //   "answers": []}
  questions: Array<String> = [];
  election: Election = new Election("", "", "", [], "");
  txs!: Object;
  timer = {};
  API_URL = `http:0.0.0.0:8080`;
  voterSha: string | undefined;
  tallySha: string | undefined;
  pollId!: string;

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
  }

// API

getDatas() {
  this.fetchElection(this.pollId)
  this.fetchVotes(this.pollId)
  this.fetchVoters(this.pollId)
  this.fetchTally(this.pollId)
  this.fetchDatas(this.pollId)
}

async fetchVotes(id: string) {
  await this.apiService.getVotes(id).subscribe((res: any) => {
  });
}

async fetchDatas(id: string) {
  await this.apiService.getDatas(id).subscribe((res: any) => {
    console.log(res.txs);
    
    this.txPollId = res.txs.poll
    this.txVotersId = res.txs.voters
    this.votes = res.tally
    this.votesLenght = res.tally.length
    console.log(this.votes);
    
    this.tallySha = this.sha(res.tally)
    this.txTallyId = res.txs.tally
  });
}

async fetchVoters(id: string) {
  await this.apiService.getVoters(id).subscribe((res: any) => {
    this.voterSha = this.sha(res)
    this.voters = res
    this.votersLenght = this.voters.length.toString()
  });
}

async fetchElection(id: string) {
  this.apiService.getElection(id).subscribe((res: any) => {
    this.election.name = res.name;
    this.election = res
    let questionsLength = res.questions.length;
    for (let i = 1; i < questionsLength ; i++) {
      this.questions.push(this.election.questions[i].question);
    }
  });
}

async fetchTally(id: string) {
  this.apiService.getTally(id).subscribe((res: any) => {
  });
}

// END API

  tx(hash: string) {
    //return "https://goerli.etherscan.io/tx/" + this.txs[hash]
  }

  formatDate(v: string) {
    return new Date(v).toLocaleString()
  }

  sha(v: any) {
    let s = JSON.stringify(v)
    return SHA256(s).toString(enc.Hex)
  }

  ngOnInit() {
    this.pollId = this.router.url.split('/')[1];
    if (this.pollId.length > 0)
    this.getDatas()
  }
}