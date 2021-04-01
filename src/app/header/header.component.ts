import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HelperMethodService } from '../services/helper-method.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router: Router,
              public helperMethodService: HelperMethodService) { }

  logOut(){
    this.delete_cookie("accessToken");
    this.delete_cookie("refreshToken");
    this.router.navigate(['login']);
    this.authService.loggedIn=false;
  }

  delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().then( response =>{
      this.authService.loggedIn=true;
    }, errorResponse =>{
      this.authService.loggedIn=false;
    });
  }

}
