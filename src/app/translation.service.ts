import { Injectable } from '@angular/core';
import { Pipe, PipeTransform } from '@angular/core';
import { FrenchStrings } from './french-strings';
import { EnglishStrings } from './english-strings';
import { MandarinStrings } from './mandarin-strings';


export enum Language {
  French,
  English,
  Mandarin
}
/**
 * Defines the service responsible for translation
 */
@Injectable()
export class TranslationService {
  public currentLang = Language.English;
  
  public changeLanguage(newLang : Language) {
    this.currentLang = newLang;
  }
  isEnglish() {
    return this.currentLang == Language.English;
  }
  isFrench() {
    return this.currentLang == Language.French;
  }
  isMandarin() {
    return this.currentLang == Language.Mandarin;
  }
}


@Pipe({name: 'translate',
        pure: false})
export class TranslationPipe implements PipeTransform  {
  constructor(public translateService : TranslationService) {}

    transform(value: string): string {
      if(this.translateService.currentLang == Language.English){
        return EnglishStrings[value];
      }
      else if(this.translateService.currentLang == Language.French){
        return FrenchStrings[value];
      }
      else if(this.translateService.currentLang == Language.Mandarin){
        return MandarinStrings[value];
      }
    }
}
