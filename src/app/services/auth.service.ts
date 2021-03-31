import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = false;

  private host:string = "localhost";
  private portAuth:number = 8081;//port for auth server

  private portData:number = 8080;

  constructor(private http:HttpClient) { }

  loginIntern(email:string, password:string, usertype: "intern" | "mentor"): Observable<any>{
    const payload = {email: email, password: password};
    let url = `http://${this.host}:${this.portAuth}/login/`
    url+= usertype === "intern" ? "intern" : "mentor"
    return this.http.post<any>(url,payload);
  }

  register(full_name:string, email:string, password:string, usertype: "intern" | "mentor"): Observable<any>{
    const payload = {intern:{full_name:full_name, email:email, password: password}};
    let url = `http://${this.host}:${this.portAuth}/register/`;
    url+= usertype === "intern" ? "intern" : "mentor"
    return this.http.post<any>(url,payload);
  }

  async isAuthenticated() {
    let url = `http://${this.host}:${this.portData}/`
    //Sends empty GET request, but auth-interceptor sets accessToken in Authorization header
    return this.http.get<any>(url).toPromise()
  }
}
