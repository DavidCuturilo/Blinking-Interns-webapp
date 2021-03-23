import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  signupForm: FormGroup;
  showSpinner = false;
  

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(){
    console.log(this.signupForm);
    
    this.showSpinner = true;
    setTimeout (() => {
      this.showSpinner = false;
    }, 1000);

    this.signupForm.reset();
  }

  onClick(input){
    input.value = '';
  }


}
