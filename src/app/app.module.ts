import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PollPlannedList } from './components/poll-planned-list/poll-planned-list.component';
import { I18nService } from './core/i18n.service';
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    PollPlannedList
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    I18nService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(private i18nService: I18nService) {}
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}