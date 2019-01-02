import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedIn = new BehaviorSubject<boolean>(false);
  userLogged;
  userCredentials;

  constructor(private http: HttpClient, private router: Router) { }

  get isLoggedIn() {
    if (this.loggedIn) {
      let userLogged = sessionStorage.getItem('userLogged');
      if(userLogged) {
        this.loggedIn.next(true);
      }
    }
    return this.loggedIn.asObservable();
  }

  login(username, password) {
    let userCredentials = {
      username: username, 
      password: password
    }
    let backEndRoute = environment.URL_BACKEND_PROD + 'login';
    return this.http.post(backEndRoute, userCredentials);
  }

  logout() {
    sessionStorage.removeItem('userLogged');
    this.router.navigate(['/login']);
    this.loggedIn.next(false);
  }
}
