import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})

export class RegisterFormComponent implements OnInit {
  signupForm: FormGroup;
  showSpinner = false;

  isSelected = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userType' : new FormControl (null, [Validators.required]),
      'fullName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(internRadio: HTMLInputElement){
    console.log(this.signupForm);
    
    this.showSpinner = true;
    setTimeout (() => {
      this.showSpinner = false;
    }, 1000);
    
    if(internRadio.checked){
      
    }
    this.signupForm.reset();

  }

  onClick(input){
    input.value ='';
  }

  isValid(variable: string) {
    if(!this.signupForm.get(variable).valid && this.signupForm.get(variable).touched){
      return true;
    }
    return false;
  }

}
