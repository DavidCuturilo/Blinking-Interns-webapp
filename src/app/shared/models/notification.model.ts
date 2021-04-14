import { NotificationTypes } from "./notification-enums";

export interface Notification{
  sender:{
    id:number,
    email:string,
    type:"Intern" | "Mentor"
  },
  receiver:{
    id:number,
    email:string,
    type:"Intern" | "Mentor"
  },
  text:string,
  seen:boolean,
  notificationType: NotificationTypes,
  notificationData: any
}
