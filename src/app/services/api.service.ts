import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(environment.apiUrl + 'users');
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}users/${id}`);
  }

  getUserPost(id: number) {
    return this.http.get(`${environment.apiUrl}users/${id}/posts`);
  }

  post(id: number, payload: any) {
    return this.http.post(`${environment.apiUrl}users/${id}/posts`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  getApiHome() {
    return this.http.get('https://user-login-reg-auth.herokuapp.com');
  }
}
