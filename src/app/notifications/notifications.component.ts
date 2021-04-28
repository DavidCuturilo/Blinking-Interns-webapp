import { Component, OnInit } from '@angular/core';
import { MatMenu } from '@angular/material/menu';
import { DataFromServerService } from '../services/data-from-server.service';
import { NotificationTypes } from '../shared/models/notification-enums';
import { Notification } from '../shared/models/notification.model'


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(public dataFromServerService: DataFromServerService) { }
  notifications:any[];
  numberOfUnreadNotifications:number;


  ngOnInit(): void {
  }

  removeAnimationNotification(menu:MatMenu){
    menu.items.forEach(item => {
    item._getHostElement().querySelector('.notification-container')?.classList.remove('animate-notification')
    })
 
  }

  markAllAsRead(){
    this.dataFromServerService.markAllNotificationsAsRead().subscribe(data=>{
    console.log(data)
    },error =>{
    console.log(error)
    });
    }
  
    markAsRead(event:Event, notificationContainer:HTMLDivElement, notification: Notification ){
    switch(notification.notificationType){
    case NotificationTypes.TaskAssigned:
    break;
    default:
    break;
    }
  
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
