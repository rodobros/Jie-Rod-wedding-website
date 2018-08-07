import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService, Confirmation } from '../confirmation.service'

/**
 * Defines the component responsible to display the contact page.
 */
@Component({
  selector: 'guests',
  templateUrl: './guests.component.html'
})
export class GuestsComponent {
  public confirms : Confirmation[]; 
  constructor(confirmationService : ConfirmationService) {
    confirmationService.getConfirms().then((confirmations) => {
      this.confirms = confirmations;
    })
  }
}
