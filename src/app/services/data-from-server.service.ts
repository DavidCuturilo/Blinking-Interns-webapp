import { Notification } from './../shared/models/notification.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Intern } from '../shared/models/intern.model';
import { TaskStatus, TaskType } from '../shared/models/task.model';

@Injectable({
  providedIn: 'root'
})
export class DataFromServerService {

  assignments:{
    date:string,
    deadline:string,
    progress:number,
    task_status: TaskStatus,

    mentor:{
      full_name:string,
      email:string
    }

    task:{
      title:string,
      text:string,
      task_type:TaskType
    }
  }[] = []

  notifications: Notification[];
  numberOfUnreadNotifications=0;
  interval;



  private host:string = "10.241.107.138";

  interns = []

  private port:number = 8080;//port for data server

  private numberOfTries = 0;

  constructor(private http:HttpClient) { }

  getAssignments(){
    let url = `http://${this.host}:${this.port}/assigned`;
    return this.http.get<any>(url).subscribe(data=>{
      this.assignments = data.payload;

      this.numberOfTries=0;
      console.log(this.assignments)

      return this.assignments;
    }, err => {
      if(err.status===401 && this.numberOfTries<3){
        this.numberOfTries++;
        this.getAssignments();
      }
      return this.assignments
    })
  }

  //Method returns intern by id or returns all interns if no paramateres provided
  getInternsById(){
    let url = `http://${this.host}:${this.port}/intern`
    return this.http.get<any>(url).subscribe((response)=>{
      console.log(response.payload);
      this.interns = response.payload;
    });
  }

  getInternAssignments(intern: Intern){
    let url = `http://${this.host}:${this.port}/assigned/${intern.id}`; //example url http://localhost:8080/assignment/9
    return this.http.get<any>(url);
  }

  changePassword(oldPassword: string, newPassword: string){
    console.log("STARA SIFRA: ",oldPassword);
    console.log("SLANJE ZAHTEVA ZA PROMENOM SIFRE:",newPassword);
  }

  addNewTask(taskData){
    let url = `http://${this.host}:${this.port}/task`
    return this.http.post<any>(url,taskData)
  }

  getNotificationsPeriodically(){
    this.getNotifications();
    this.interval = setInterval(this.getNotifications.bind(this),10000);
  }

  getNotifications(){
    let url = `http://${this.host}:${this.port}/notification`
    this.http.get<any>(url).subscribe(data=>{
      this.notifications = data.payload.reverse();
      this.numberOfUnreadNotifications = this.notifications.filter(notification => notification.seen===false).length
    }, error => {
      console.log(error)
    });
  }

  markAllNotificationsAsRead(){
    const payload = {notifications:this.notifications.filter(notification => !notification.seen)};
    this.notifications.map(notification => notification.seen=true);
    this.numberOfUnreadNotifications=0;
    let url = `http://${this.host}:${this.port}/notification/seen`;
    return this.http.post<any>(url,payload);
  }

  markNotificationAsRead(notification){
    const payload = {notifications:[notification]}
    let url = `http://${this.host}:${this.port}/notification/seen`;
    return this.http.post<any>(url,payload);
  }
}
