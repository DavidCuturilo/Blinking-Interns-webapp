import { HttpClient, HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators'
import { HelperMethodService } from './helper-method.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private router: Router, private http:HttpClient,
              public helperMethod: HelperMethodService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler){
    const accessToken = this.helperMethod.getCookie('accessToken');//get access token from cookie
    const modifiedRequest = req.clone({ headers: req.headers.append('Authorization', accessToken)});

    return next.handle(modifiedRequest).pipe( tap( (event) => {},
    (err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          //Get new access token

          this.http.post<any>('http://localhost:8081/token',{refreshToken: this.helperMethod.getCookie("refreshToken")}).subscribe( data =>{
            document.cookie=`accessToken=${data.payload.accessToken}`
          }
          )

        }else if (err.status === 403){
          this.router.navigate(['/login'])
        }
      }
    }))
  }


}
