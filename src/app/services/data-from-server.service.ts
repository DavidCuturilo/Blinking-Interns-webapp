import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
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


  interns = []

  private host:string = "localhost";
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
      this.interns = response.payload;
    });
  }
}
