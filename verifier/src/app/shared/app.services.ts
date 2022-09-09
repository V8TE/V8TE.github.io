
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  //apiURL: string;
  //resultsURL: string;
  httpOptions = {
    headers: new HttpHeaders({
        'Accept': 'text/html',
        "Content-Type": "application/json; charset=UTF-8",
    }),
  };
  httpOptionstmp: any;

  constructor(
    private httpClient: HttpClient,
  ) {}

  public getTxs(id: string) {
    return this.httpClient.get(
        `${environment.settings.api}/elections/${id}/txs`
      );
  }

  public getVotes(id: string) {
    return this.httpClient.get(
        `${environment.settings.api}/elections/${id}/result`
      );
  }

  public getVoters(id: string) {
    return this.httpClient.get(
        `${environment.settings.api}/elections/${id}/votersanon`
      );
  }

  public getTally(id: string) {
    return this.httpClient.get(
        `${environment.settings.api}/elections/${id}/tally`
      );
  }

  public getElection(id: string) {
    return this.httpClient.get(
        `${environment.settings.api}/elections/${id}/params`
      );
  }
}