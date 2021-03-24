import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private host:string = "localhost";
  private port:number = 8080;

  constructor(private http:HttpClient) { }

  loginIntern(email:string, password:string): Observable<{email:string,password:string}>{
    const payload = {email: email, password: password};
    return this.http.post<{email:string, password: string}>(`http://${this.host}:${this.port}/intern/login`,payload);
  }

  register(full_name:string, email:string, password:string, usertype: "intern" | "mentor"){
    const payload = {intern:{full_name:full_name, email:email, password: password}};
    let url = `http://${this.host}:${this.port}/`;
    if(usertype==="intern"){
      url+="intern"
    }else{
      url+="mentor"
    }
    return this.http.post<{full_name:string, email:string, password:string}>(url,payload);
  }
}
