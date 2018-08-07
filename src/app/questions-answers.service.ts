import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from './config';


class SimpleAnswer {
  public letter : string;
  public text : string;
}

/**
 * Defines a question-answer.
 */
export class QuestionAnswer  {
  public question : string;
  public answers : SimpleAnswer[];
  public rightAnswer : string;
  public GGMessage : string;
}

/**
 * Defines the service responsible to retrieve the products in the database.
 */
@Injectable()
export class QuestionsAnswersService {

  /**
   * Handles the current error.
   *
   * @param error                   The error to handle.
   * @return {Promise<object>}      A promise object.
   */
  private static handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.feedbackMessage || error);
  }

  /**
   * Initializes a new instance of the ProductsService class.
   *
   * @param http                    The HTTP service to use.
   */
  constructor(private http: Http) { }

  /**
   * Gets all the questions-answers in the database
   */
  getQuestionsAnswers(): Promise<QuestionAnswer[]> {
    let promise = new Promise<QuestionAnswer[]>((resolve,reject) => {
      this.http.get(`${Config.apiUrl}` + "/questions-answers")
      .toPromise()
      .then(questionsAnswers => {
        resolve(questionsAnswers.json() as QuestionAnswer[])
      })
      .catch(QuestionsAnswersService.handleError);
    })
    return promise;
  }
}
