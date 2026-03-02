
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ApiService {
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


  public getVotes(id: string, newVersion: boolean) {
    const baseUrl = newVersion ? environment.settings.apiNew : environment.settings.api;
    return this.httpClient.get(
        `${baseUrl}/elections/${id}/result`
      );
  }

  public getLists(id: string, round:number, newVersion: boolean) {
    const baseUrl = newVersion ? environment.settings.apiNew : environment.settings.api;
    return this.httpClient.get(
        `${baseUrl}/elections/${id}/lists?round=${round}`
      );
  }

  public getVoters(id: string, round:number, newVersion: boolean) {
    const baseUrl = newVersion ? environment.settings.apiNew : environment.settings.api;
    return this.httpClient.get<string>(
        `${baseUrl}/elections/${id}/votersanon?round=${round}`
      );
  }

  public getTally(id: string, round:number, newVersion: boolean) {
    const baseUrl = newVersion ? environment.settings.apiNew : environment.settings.api;
    return this.httpClient.get(
        `${baseUrl}/elections/${id}/tally?round=${round}`
      );
  }

  public getElection(id: string, round:number, newVersion: boolean) {
    const baseUrl = newVersion ? environment.settings.apiNew : environment.settings.api;
    return this.httpClient.get(
        `${baseUrl}/elections/${id}/params?round=${round}`
      );
  }

  public getDatas(id: string, round:number, newVersion: boolean) {
    const baseUrl = newVersion ? environment.settings.apiNew : environment.settings.api;
    return this.httpClient.get(
        `${baseUrl}/elections/${id}/datas?round=${round}`
      );
  }
}
