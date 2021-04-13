import { DataFromServerService } from 'src/app/services/data-from-server.service';
import { Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HelperMethodService } from '../services/helper-method.service';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';

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
  numberOfUnreadNotifications:number;
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;

  logOut(){
    this.delete_cookie("accessToken");
    this.delete_cookie("refreshToken");
    this.dataFromServerService.notifications=[];
    clearInterval(this.dataFromServerService.interval)

    this.router.navigate(['login']);
    this.authService.loggedIn=false;
  }

  delete_cookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  }

  ngOnInit(): void {
    this.authService.isAuthenticated().then( response =>{
      this.authService.loggedIn=true;

      clearInterval(this.dataFromServerService.interval)
      this.dataFromServerService.getNotificationsPeriodically();
    }, errorResponse =>{
      this.authService.loggedIn=false;
    });

    // this.getNotifications();
    // setInterval(this.getNotifications.bind(this),60000);

    // this.getNotifications();
    // // this.dataFromServerService.getNotifications();
    // this.getNotifications();
    // setInterval(this.getNotifications.bind(this),2000);
  }

  // getNotifications(){
  //   this.dataFromServerService.getNotifications().subscribe(data=>{
  //     this.notifications = data.payload;
  //     this.numberOfUnreadNotifications = this.notifications.filter(notification => notification.seen===false).length
  //     console.log(this.notifications);
  //   },err=>{
  //     console.log(err);
  //   })
  // }
  removeAnimationNotification(menu:MatMenu){
    menu.items.forEach(item => {
      item._getHostElement().querySelector('.notification-container')?.classList.remove('animate-notification')
    })
    // menu.items.results.forEach(item => {
    //   item.
    // })
    // const notifications = document.querySelectorAll()
  }

  markAllAsRead(){
    this.dataFromServerService.markAllNotificationsAsRead().subscribe(data=>{
      console.log(data)
    },error =>{
      console.log(error)
    });
  }

  markAsRead(event:Event, notificationContainer:HTMLDivElement, notification){
    event.stopPropagation();
    if(notification.seen==true)return;
    notificationContainer.classList.add('animate-notification');
    notificationContainer.classList.remove('newNotification');
    notification.seen=true;
    this.dataFromServerService.numberOfUnreadNotifications--;

    this.dataFromServerService.markNotificationAsRead(notification).subscribe(data=>{
      console.log(data)
      console.log('Notification updated successfully');
    }, error=>{
      console.log('Greska prilikom updatovanja notifikacije:', error)
    });
  }
}
