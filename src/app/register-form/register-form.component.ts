import { LoginRegisterService } from './../services/login-register.service';
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

  constructor(private router: Router, private http: LoginRegisterService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'fullName': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(internRadio: HTMLInputElement){
    console.log(this.signupForm);

    this.showSpinner = true;

    let internOrMentor: "intern"|"mentor"='mentor';
    if(internRadio.checked){
      internOrMentor="intern"
    }

    this.http.register(
      this.signupForm.get('fullName').value,
      this.signupForm.get('email').value,
      this.signupForm.get('password').value,
      internOrMentor
    ).subscribe(data=>{
      //Success
      // console.log("uspesno",data)
      this.showSpinner = false;
      this.router.navigate(['home-page']);
    }, error =>{
      //Fail
      // console.log("greska",error.error);
      this.showSpinner = false;
    })


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
