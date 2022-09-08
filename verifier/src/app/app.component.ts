import { Component } from '@angular/core';
import { SHA256 } from "crypto-js"
import { ApiService } from "src/app/shared/app.services";


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
  election = {
    "name": "", 
    "start":"", 
    "end":"", 
    "question":"", 
    "answers": []}
  txs!: Object
  timer = {}
  API_URL = `https://c.v8te.com`

  constructor(
    private apiService: ApiService,
  ) {}

// API

fetchDatas() {
  this.fetchTxs()
  this.fetchElection()
  this.fetchVotes()
  this.fetchVoters()
}
async fetchTxs() {
  this.txs = await this.apiService.getTxs()
  const url = `${this.API_URL}/pub/txs`
  this.txs = await (await fetch(url)).json()
}
async fetchVotes() {
  await this.apiService.getVotes()
  const url = `${this.API_URL}/pub/votes`
  this.votes = await (await fetch(url)).json()
}
async fetchVoters() {
  await this.apiService.getVoters()
  const url = `${this.API_URL}/pub/voters`
  this.voters = await (await fetch(url)).json()
}
async fetchElection() {
  await this.apiService.getElection("tmp")
  const url = `${this.API_URL}/pub/election`
  this.election = await (await fetch(url)).json()
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
}
