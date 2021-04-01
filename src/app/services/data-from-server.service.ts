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
      return this.assignments
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
}
