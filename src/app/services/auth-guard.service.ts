import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authSerive: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot,
                state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

                  return this.authSerive.isAuthenticated().then( (authenticated:boolean) =>{
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
                    }, err => false)

    }
}
