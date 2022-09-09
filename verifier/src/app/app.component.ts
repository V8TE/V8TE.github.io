import { Component } from '@angular/core';
import { SHA256 } from "crypto-js"
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
  voters!: String
  // election = {
  //   "name": "", 
  //   "start":"", 
  //   "end":"", 
  //   "question":"", 
  //   "answers": []}
  questions: Array<String> = []
  election: Election = new Election("", "", "", [], "")
  txs!: Object
  timer = {}
  API_URL = `http:0.0.0.0:8080`

  constructor(
    private apiService: ApiService,
  ) {
  }

// API

fetchDatas() {
  let id = "a4711754-261f-4b51-9ab8-7b3aa4b00e5f"
  this.fetchTxs(id)
  this.fetchElection(id)
  this.fetchVotes(id)
  this.fetchVoters(id)
}
async fetchTxs(id: string) {
  this.txs = await this.apiService.getTxs(id).subscribe((res: any) => {
    console.log("res Txs");
    console.log(res);
  });
}
async fetchVotes(id: string) {
  await this.apiService.getVotes(id).subscribe((res: any) => {
    console.log("res Votes");
    console.log(res);
  });
}
async fetchVoters(id: string) {
  await this.apiService.getVoters(id).subscribe((res: any) => {
    console.log("res Voters");
    console.log(res);
  });
}
async fetchElection(id: string) {
  this.apiService.getElection(id).subscribe((res: any) => {
    console.log("res Elec");
    console.log(res);
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
    console.log("res Tally");
    console.log(res);
  });
}

// END API

  partialSha(n: number): string {
    //if (Array.isArray(this.votes))
      //return this.sha(JSON.stringify(this.votes.slice(0, n + 1)))
    //else return ""
    return ""
  }
  tx(hash: string) {
    //return "https://goerli.etherscan.io/tx/" + this.txs[hash]
  }
  formatDate(v: string) {
    return new Date(v).toLocaleString()
  }

  sha(election: string) {
    this.electionSha = SHA256(election).toString(CryptoJS.enc.Hex)
  }

  ngOnInit() {
    console.log(this.election);
    this.fetchDatas()
    // this.fetchElection("a4711754-261f-4b51-9ab8-7b3aa4b00e5f")
  }
}