import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ConfirmationService } from '../confirmation.service';
import { FormControl, ValidatorFn, AbstractControl  } from '@angular/forms';

/**
 * Defines the component responsible to display the contact page.
 */
@Component({
  selector: 'confirmation',
  templateUrl: './confirmation.component.html'
})
export class ConfirmationComponent {
	public isConfirm = false;
	public isError = false;

  	public confirmForm = this.fb.group({
  		firstname: ["", Validators.required],
  		lastname: ["", Validators.required],
    	email: ["", Validators.email],
    	host: [""],
    	allergy: [""],
      mealchoice: ["", Validators.required]
  	});
  	constructor(public fb: FormBuilder,
  		public confirmationService : ConfirmationService) {}
  	confirm(event) {
      var lol = this.confirmForm.get('mealchoice');
  		this.confirmForm.get('firstname').markAsDirty();
  		this.confirmForm.get('lastname').markAsDirty();
  		this.confirmForm.get('email').markAsDirty();
      this.confirmForm.get('mealchoice').markAsDirty();
  		if(this.confirmForm.valid){
    		this.confirmationService.addConfirmation(
    			this.confirmForm.get('firstname').value,
    			this.confirmForm.get('lastname').value,
    			this.confirmForm.get('email').value,
    			this.confirmForm.get('host').value,
          this.confirmForm.get('allergy').value,
          this.confirmForm.get('mealchoice').value
    			).then((confirm) => {
    			this.isConfirm = true;
    		}).catch((error: any) => {
    			this.isError = true;
    		})
    	}
  	}

  forbiddenNameValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const forbidden = control.value == "empty";
      return forbidden ? {'forbiddenName': {value: control.value}} : null;
    };
  }
}
