import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouteReuseStrategy, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

                  return this.authService.isAuthenticated().then( (authenticated:boolean) =>{
                      if(authenticated){
                        if(route.url[0].path === 'login' || route.url[0].path === 'register'){
                          this.router.navigate(['user-profile'])
                          return false;
                        }
                        return true;
                      }else{
                        if(route.url[0].path === 'login' || route.url[0].path === 'register'){
                          return true;
                        }
                        this.router.navigate(['login'])
                        return false;
                      }
                    }, (err: HttpErrorResponse) => {
                      if(err.status==401){
                        if(route.url[0].path === 'login' || route.url[0].path === 'register'){
                          return true;
                        }else{
                          this.router.navigate(['login'])
                        }
                      }
                      return false;
                    })

    }
}
