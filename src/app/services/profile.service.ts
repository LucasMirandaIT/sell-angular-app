import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }



  updateProfile(newUser) {

    let bodyRequest = {
      id: newUser._id,
      newUser: {
        admin: newUser.admin,
        name: newUser.name,
        email: newUser.email,
        picture: newUser.picture,
      }
    };
    let backendUrl = environment.URL_BACKEND_PROD + 'users/updateUser/';
    return this.http.post(backendUrl, bodyRequest);
  }

  register(user) {
    let backendUrl = environment.URL_BACKEND_PROD + 'aprooveUser/createUser';
    return this.http.post(backendUrl, user);
  }

  getUsers(){
    let backendUrl = environment.URL_BACKEND_PROD + 'users/getUsers';
    return this.http.get(backendUrl);
  }

  getUsersToAproove() {
    let backendUrl = environment.URL_BACKEND_PROD + 'users/getAproove';
    return this.http.get(backendUrl);
  }

  aprooveDeleteById(id) {
    let backendUrl = environment.URL_BACKEND_PROD + 'aprooveUser/deleteAproove';
    return this.http.post(backendUrl, {id: id});
  }

  aprooveCreateUser(user) {
    let backendUrl = environment.URL_BACKEND_PROD + 'users/createUser';
    return this.http.post(backendUrl, user);
  }
}
