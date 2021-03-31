import { AuthService } from '../services/auth.service';
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


  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy():void{

  }

  onSubmit(internRadio: HTMLInputElement){


    let internOrMentor: "intern"|"mentor"='mentor';
    if(internRadio.checked){
      internOrMentor="intern"
    }

    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    this.authService.loginIntern(email , password, internOrMentor)
    .subscribe(data =>{
      //Success
      this.authService.loggedIn = true;

      const accessToken = data.payload.accessToken;
      const refreshToken = data.payload.refreshToken;

      document.cookie = `accessToken=${accessToken}`
      document.cookie = `refreshToken=${refreshToken}`

      this.router.navigate(['/']);
    }, error =>{
      //Fail
      this.authService.loggedIn = false;

      if(error.error.statusCode === 10004){
        this.emailError=error.error.message;
        this.passwordError='';
      }else if(error.error.statusCode === 10005){
        this.passwordError=error.error.message;
        this.emailError='';
      }
    })

    this.signupForm.reset();
  }

  onClick(input){
    input.value = '';
  }
}
