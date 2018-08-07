import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgxCarouselModule } from 'ngx-carousel';
import { ReactiveFormsModule } from '@angular/forms';

import { VenueComponent } from './venue/venue.component'
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ConfirmationComponent } from './confirmation/confirmation.component'
import { QuestionsAnswersComponent } from './questions-answers/questions-answers.component';
import { GuestsComponent } from './guests/guests.component';

import { QuestionsAnswersService } from './questions-answers.service';
import { ConfirmationService } from './confirmation.service';
import { TranslationService, TranslationPipe } from './translation.service';


// Application routes
const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'venue', component: VenueComponent },
  { path: 'funquiz', component: QuestionsAnswersComponent },
  { path: 'confirmation', component:ConfirmationComponent },
  { path: 'guests', component:GuestsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    VenueComponent,
    QuestionsAnswersComponent,
    ConfirmationComponent,
    GuestsComponent,
    TranslationPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxCarouselModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false }
    )
  ],
  providers: [
    QuestionsAnswersService,
    ConfirmationService,
    TranslationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
