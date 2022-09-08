
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
      "Content-Type": "application/json; charset=UTF-8",
    }),
  };
  httpOptionstmp: any;

  constructor(
    private httpClient: HttpClient,
  ) {}

  public getTxs() {
    return this.httpClient.get(
        `${environment.settings.api}/elections/`
      );
  }

  public getVotes() {
    return this.httpClient.get(
        `${environment.settings.api}/elections/`
      );
  }

  public getVoters() {
    return this.httpClient.get(
        `${environment.settings.api}/elections/`
      );
  }

  public getElection(id: string) {
    return this.httpClient.get(
        `${environment.settings.api}/elections/${id}/params`
      );
  }
}