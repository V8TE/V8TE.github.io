import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SHA256, enc } from "crypto-js"
import { ApiService } from "src/app/shared/app.services";
import { Election } from './Models/Election';
import { saveAs } from 'file-saver';


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
  questions: Array<String> = [];
  election: Election = new Election("", "", "", [], "");
  txs!: Object;
  tallyValid: boolean = false
  pollValid: boolean = false
  votersValid: boolean = false
  pollFilename: string = ""
  votersFilename: string = ""
  tallyFilename: string = ""
  pollFileHash: string = ""
  votersFileHash: string = ""
  tallyFileHash: string = ""
  timer = {};
  API_URL = `http:0.0.0.0:8080`;
  voterSha: string | undefined;
  tallySha: string | undefined;
  pollId!: string;
  subject!: String;
  pollFile!: string;

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
    this.txPollId = res.txs.poll
    this.txVotersId = res.txs.voters
    this.votes = res.tally
    this.votesLenght = res.tally.length
    
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
    this.electionSha = this.sha(res);
    
    let questionsLength = res.questions.length;
    this.subject = res.description
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

  formatDate(v: string) {
    return new Date(v).toLocaleString()
  }

  sha(v: any) {
    let s = JSON.stringify(v)
    return SHA256(s).toString(enc.Hex)
  }

  shaForDataFromTextFile(v: any) {
    return SHA256(v).toString(enc.Hex)
  }

  onFileChanged(event: any) {
    if (event) {
      this.fileReader(event.target.files[0]);
    }
  }

  private fileReader(file: File) {
    console.log(file);
    
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = (_e) => {
      const data = fileReader.result
      const sha = this.shaForDataFromTextFile(data)
      switch (sha) {
        case (this.electionSha): 
          this.pollValid = true
          this.pollFilename = file.name
          this.pollFileHash = sha
          break;
        case (this.voterSha): 
          this.votersValid = true
          this.votersFilename = file.name
          this.votersFileHash = sha
          break;
        case (this.tallySha): 
          this.tallyValid = true
          this.tallyFilename = file.name
          this.tallyFileHash = sha
          break;
      }
      // for (let i = 0; i !== data.length; i++) {
        // arr[i] = String.fromCharCode(data[i]);
      // }
    };
  }

  downloadPoll() {
    const poll = new Blob([JSON.stringify(this.election)], {type: 'text/plain'});
    const tally = new Blob([JSON.stringify(this.votes)], {type: 'text/plain'});
    const voters = new Blob([JSON.stringify(this.voters)], {type: 'text/plain'});
    saveAs(poll, "poll.txt")
    saveAs(tally, "votes.txt")
    saveAs(voters, "voters.txt")
  }

  ngOnInit() {
    this.pollId = this.router.url.split('/')[1];
    if (this.pollId.length > 0)
    this.getDatas()
  }
}