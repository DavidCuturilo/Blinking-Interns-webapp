import { NotificationTypes } from "./notification-enums";

export interface Notification{
  sender:{
    id:number,
    email:string,
    user_type:"intern" | "mentor"
  },
  receiver:{
    id:number,
    email:string,
    user_type:"intern" | "mentor"
  },
  text:string,
  seen:boolean,
  notificationType: NotificationTypes,
  notificationData: any
}
