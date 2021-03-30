import { LoginRegisterService } from './../services/login-register.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  signupForm: FormGroup;
  showSpinner = false;

  emailError = 'Please enter a valid mail';
  passwordError = 'Invalid password';


  constructor(private router: Router, private LoginRegisterService: LoginRegisterService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy():void{

  }

  onSubmit(internRadio: HTMLInputElement){

    this.showSpinner = true;

    let internOrMentor: "intern"|"mentor"='mentor';
    if(internRadio.checked){
      internOrMentor="intern"
    }

    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.LoginRegisterService.loginIntern(email , password, internOrMentor)
    .subscribe(data =>{
      //Success
      this.showSpinner = false;

      const accessToken = data.payload.accessToken;
      const refreshToken = data.payload.refreshToken;

      document.cookie = `accessToken=${accessToken}`
      document.cookie = `refreshToken=${refreshToken}`

      this.router.navigate(['/']);
    }, error =>{
      //Fail
      if(error.error.statusCode === 10004){
        this.emailError=error.error.message;
        this.passwordError='';
      }else if(error.error.statusCode === 10005){
        this.passwordError=error.error.message;
        this.emailError='';
      }
      this.showSpinner = false;
    })

    this.signupForm.reset();
  }

  onClick(input){
    input.value = '';
  }
}
