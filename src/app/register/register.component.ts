import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signupForm: FormGroup;
  showSpinner = false;

  isSelected = false;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'fullName': new FormControl(null, [Validators.required,Validators.minLength(5)]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  onSubmit(internRadio: HTMLInputElement){
    // console.log(this.signupForm);

    this.showSpinner = true;

    let internOrMentor: "intern"|"mentor"='mentor';
    if(internRadio.checked){
      internOrMentor="intern"
    }

    this.authService.register(
      this.signupForm.get('fullName').value,
      this.signupForm.get('email').value,
      this.signupForm.get('password').value,
      internOrMentor
    ).subscribe(data=>{
      //Success
      this.authService.loggedIn = true;

      this.showSpinner = false;
      this.router.navigate(['home-page']);
    }, error =>{
      //Fail
      this.authService.loggedIn = false;
      this.showSpinner = false;
    })


    this.signupForm.reset();

  }

  onClick(key: string){
    this.signupForm.get(key).reset();
  }

  isValid(variable: string) {
    if(!this.signupForm.get(variable).valid && this.signupForm.get(variable).touched){
      return true;
    }
    return false;
  }

}
