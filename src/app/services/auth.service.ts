import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  loggedIn = true;

  isAuthenticated() {

    // console.log('this');
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        },800);
      }
    );
    return promise;
  }
}
