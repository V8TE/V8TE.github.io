import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PollPlannedList } from './components/poll-planned-list/poll-planned-list.component';
import { I18nService } from './core/i18n.service';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { PollStatusComponent } from './components/poll-status/poll-status.component';
import { PollInfoComponent } from './components/poll-info/poll-info.component';
import { VotersInfoComponent } from './components/voters-info/voters-info.component';
import { CollegeInfoComponent } from './components/college-info/college-info.component';
import { BallotInfoComponent } from './components/ballot-info/ballot-info.component'; 
import { TableModule } from 'primeng/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Lara from '@primeng/themes/lara';

import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PollPlannedList,
    PollStatusComponent,
    PollInfoComponent,
    VotersInfoComponent,
    CollegeInfoComponent,
    BallotInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    I18nService,
    providePrimeNG({
        theme: {
            preset: Lara
        }
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private i18nService: I18nService) {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}