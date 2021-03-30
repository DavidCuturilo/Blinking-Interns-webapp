import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataFromServerService {

  private host:string = "localhost";
  private port:number = 8080;//port for data server

  constructor(private http:HttpClient) { }

  getAssignments(): Observable<any>{
    let url = `http://${this.host}:${this.port}/assigned`;
    return this.http.get<any>(url);
  }
}
