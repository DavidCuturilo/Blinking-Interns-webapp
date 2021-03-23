import { HttpService } from './../services/http.service';
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


  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy():void{

  }

  onSubmit(){

    this.showSpinner = true;

    this.httpService.loginIntern(this.signupForm.get('email').value,this.signupForm.get('password').value)
    .subscribe(data=>{
      //Success
      this.showSpinner = false;
      this.router.navigate(['user-profile']);
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
