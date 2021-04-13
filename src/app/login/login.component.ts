import { DataFromServerService } from 'src/app/services/data-from-server.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  signupForm: FormGroup;
  showSpinner = false;

  emailError = 'Please enter a valid mail';
  passwordError = 'Invalid password';


  constructor(private router: Router, private authService: AuthService, private dataFromServerService: DataFromServerService) { }

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
    this.authService.login(email , password, internOrMentor)
    .subscribe(data =>{
      //Success
      this.authService.loggedIn = true;

      const accessToken = data.payload.accessToken;
      const refreshToken = data.payload.refreshToken;

      document.cookie = `accessToken=${accessToken}`
      document.cookie = `refreshToken=${refreshToken}`

      this.router.navigate(['/']);

      clearInterval(this.dataFromServerService.interval);
      this.dataFromServerService.getNotificationsPeriodically();
    }, error =>{
      //Fail
      this.authService.loggedIn = false;

      if(error.error.statusCode === 10004){

        this.signupForm.get('email').setErrors({doesNotExists:true});

        this.emailError=error.error.message;
        this.passwordError='';
      }else if(error.error.statusCode === 10005){

        this.signupForm.get('password').setErrors({invalidPassword:true});
        this.passwordError=error.error.message;
        this.emailError='';
      }
    })
  }

  onClick(key: string){
   this.signupForm.get(key).reset();
  }

}
