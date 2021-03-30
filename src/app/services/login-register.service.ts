import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  private host:string = "localhost";
  private port:number = 8081;//port for auth server

  constructor(private http:HttpClient) { }

  loginIntern(email:string, password:string, usertype:string): Observable<any>{
    const payload = {email: email, password: password};
    let url = `http://${this.host}:${this.port}/login/`
    url+= usertype === "intern" ? "intern" : "mentor"
    return this.http.post<any>(url,payload);
  }

  register(full_name:string, email:string, password:string, usertype: "intern" | "mentor"): Observable<any>{
    const payload = {intern:{full_name:full_name, email:email, password: password}};
    let url = `http://${this.host}:${this.port}/register/`;
    url+= usertype === "intern" ? "intern" : "mentor"
    return this.http.post<any>(url,payload);
  }
}
