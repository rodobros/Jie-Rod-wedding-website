import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { QuestionsAnswersService } from '../questions-answers.service'

class SimpleAnswer {
  public letter : string;
  public text : string;
}

class QuestionAnswer {
	public question : string;
	public answers : SimpleAnswer[];
	public rightAnswer : string;
	public GGMessage : string;
}

/**
 * Defines the component responsible to display the home page.
 */
@Component({
  selector: 'questions-answers',
  templateUrl: './questions-answers.component.html'
})
export class QuestionsAnswersComponent implements OnInit {

  currentQAIndex = 0;
  currentQA:QuestionAnswer;
  isIntro = true;
  QAs: QuestionAnswer[] = [{
      question:"Mock?",
      answers:
      [
        {
          letter:"a",
          text:"mock"
        },
        {
          letter:"b",
          text:"mock"
        }
      ],
      rightAnswer:"c", 
      GGMessage:"Mock"
    }];
  rodAvatar = "question";
  wrongAnswer = false;
  wrongAnswerCount = 0;
  wrongAnswerMax = 3;
  isAnsweringQuestion = false;
  mjAvatar = "mj";
  mjText = "I'm ready, let's start!";
  rodText = "Let's see if you remember some things we've been through (there will be a reward if you get everything right)";

  constructor(private questionsAnswersService : QuestionsAnswersService,
              private router : Router) {

  }

  ngOnInit() {
    this.questionsAnswersService.getQuestionsAnswers().then((questionsAnswers) => {
      this.QAs = questionsAnswers;
      this.currentQA = this.QAs[this.currentQAIndex];
    })
  }

  verifyQuestion(selectedAnswer:string) {
  	this.isAnsweringQuestion = false;
  	if (this.currentQAIndex == this.QAs.length - 1 && selectedAnswer == this.currentQA.rightAnswer){
      this.rodAvatar = "GG1";
      this.rodText = "That was pretty amazing! Now the real Rod has a gift for you."
      this.mjText = "Yeahhhh";
      this.continue = this.endQuiz;
  	}
  	else if(this.currentQAIndex < this.QAs.length && selectedAnswer == this.currentQA.rightAnswer){
  		this.wrongAnswer = false;
      	this.rodAvatar = "GG" + String(Math.floor(Math.random() * 4) + 1);
      	this.mjText = "Let's continue!'";
      	this.rodText = this.QAs[this.currentQAIndex].GGMessage;
  	}
  	else {
      if(this.wrongAnswerCount < this.wrongAnswerMax){
  		  this.wrongAnswer = true;
        this.rodAvatar = "wrong" + String(Math.floor(Math.random() * 2) + 1);
        this.wrongAnswerCount++;
  		  this.mjAvatar = "mjsad";
  		  this.mjText = "Let me try again...";
        this.rodText = "Try again...";
      }
      else {
        this.continue = this.restartQuiz;
        this.mjAvatar = "mjsad";
        this.rodAvatar = "wrong" + String(Math.floor(Math.random() * 2) + 1);
        this.rodText = "That's 3 wrong answers already, you are out!";
        this.mjText = "I guess I will start over...";
      }
  	}
  }

  continueQuiz() {
  	if(!this.wrongAnswer){
  		this.currentQAIndex++;
  		this.currentQA = this.QAs[this.currentQAIndex];
  	}
  	this.isAnsweringQuestion = true;
  	this.wrongAnswer = false;
  	this.rodAvatar = "question";
  	this.rodText = this.QAs[this.currentQAIndex].question;
  	this.mjAvatar = "mj";  	
  }


  startQuestions() {
    this.isIntro = false;
    this.rodText = this.QAs[this.currentQAIndex].question;
    this.continue = this.continueQuiz;
    this.isAnsweringQuestion = true;
  }

  endQuiz() {
    this.router.navigate(["/home"]);
  }

  restartQuiz() {
    window.location.reload();
  }

  continue = this.startQuestions;

}
