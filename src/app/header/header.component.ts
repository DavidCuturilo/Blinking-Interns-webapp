import { DataFromServerService } from 'src/app/services/data-from-server.service';
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
              public helperMethodService: HelperMethodService,
              public dataFromServerService: DataFromServerService) { }

  notifications:any[];

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


    // this.dataFromServerService.getNotifications();
    // this.getNotifications();
    // setInterval(this.getNotifications.bind(this),2000);
  }

  getNotifications(){
    this.dataFromServerService.getNotifications().subscribe(data=>{
      this.notifications = data.payload;
      console.log(this.notifications);
    },err=>{
      console.log(err);
    })
  }
}
