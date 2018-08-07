import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Config } from './config';


/**
 * Defines a Confirmation
 */
export class Confirmation  {
  public firstname: string;
  public lastname: string;
  public email:string;
  public host: string;
  public allergy: string;
  public mealchoice: string;
}

/**
 * Defines the service responsible to retrieve the confirmations in the database.
 */
@Injectable()
export class ConfirmationService {

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

  addConfirmation(firstname : string, lastname : string, email : string, host : string, allergy : string, mealchoice : string) : Promise<any> {
    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers: headers});
    let url = `${Config.apiUrl}` + "/confirmation";
    let promise = new Promise<any>((resolve,reject) => {
      this.http.post(url, JSON.stringify({
        firstname:firstname,
        lastname:lastname,
        email:email,
        allergy:allergy,
        host:host,
        mealchoice:mealchoice
      }), options).toPromise<any>().then(() => {
        this.http.get(url + "?firstname=" + firstname + "&lastname=" + lastname).toPromise<any>().then((confirmation) => {
          resolve(confirmation);
        }).catch((err) => {
          reject(err);
        })
      }).catch((err) => {
        reject(err);
      });
    });
    return promise;
  }

  getConfirms() : Promise<Confirmation[]> {
    let url = `${Config.apiUrl}` + "/confirmation";
    let promise = new Promise<Confirmation[]>((resolve,reject) => {
      this.http.get(url)
      .toPromise()
      .then(confirmations => {
        var confirmsToReturn :Confirmation[] = [];
        var data = confirmations.json();
        Object.keys(data).forEach(function(key) {
          confirmsToReturn.push(data[key]);
        })
        resolve(confirmsToReturn)
      })
      .catch(ConfirmationService.handleError);
    })
    return promise;
  }
}
