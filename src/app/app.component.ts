import { Component, OnInit } from '@angular/core';
import { TranslationService, Language } from './translation.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * Defines the main component of the application.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(public translationService : TranslationService,
  			private route: ActivatedRoute,
  			private router: Router) {}

  ngOnInit() {
  	this.route.queryParams
    .subscribe(params => {
    	if(params['lang'] == 'fr'){
    		this.translationService.changeLanguage(Language.French);
    	}
    	else if(params['lang'] == 'en'){
    		this.translationService.changeLanguage(Language.English);
    	}
    	else if(params['lang'] == 'zh'){
    		this.translationService.changeLanguage(Language.Mandarin);
    	}
    });
  }

  changeToEnglish() : void {
    this.translationService.changeLanguage(Language.English);
  }

  changeToFrench() : void {
    this.translationService.changeLanguage(Language.French);
  }

  changeToMandarin() : void {
    this.translationService.changeLanguage(Language.Mandarin);
  }

}
