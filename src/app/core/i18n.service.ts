import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';
import * as moment from 'moment';

declare var require: any

const enLang = require('../../assets/i18n/en.json');
const frLang = require('../../assets/i18n/fr.json');


@Injectable()
export class I18nService {

  static AVAILABLE_LANGUAGES: Language[] = [
    {value: 'fr', viewValue: 'SETTINGS.LANGUAGES.FRENCH'},
    {value: 'en', viewValue: 'SETTINGS.LANGUAGES.ENGLISH'}
  ];

  private selectedLanguage!: string;

  // Observable message sources
  private messages = new Subject<Message>();

  // Observable message streams
  events = this.messages.asObservable();

  constructor(private translate: TranslateService) {
    this.translate.addLangs(['en', 'fr']);
    this.translate.setTranslation('en', enLang);
    this.translate.setTranslation('fr', frLang);
    this.setLanguage(this.translate.getBrowserLang() as string);
    //this.setLanguage('fr');
  }

  private emit(type: string, payload: any) {
    this.messages.next({type, payload});
  }

  private setLanguage(language: string) {
    this.selectedLanguage = language;
    this.translate.use(this.selectedLanguage);
    moment.locale(this.selectedLanguage);
  }

  changeLanguage(newLanguage: string) {
    this.setLanguage(newLanguage);
    this.emit('LanguageChanged', this.selectedLanguage);
  }

  getCurrentLanguage(): string {
    return this.selectedLanguage;
  }

}

export interface Language {
  value: string;
  viewValue: string;
}

interface Message {
  type: string;
  payload: any;
}
