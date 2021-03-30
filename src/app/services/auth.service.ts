import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../shared/models';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  register(payload: User): Observable<User> {
    return this.http
      .post<User>(`${environment.authUrl}/register`, payload, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  login(payload: User): Observable<any> {
    return this.http
      .post<any>(`${environment.authUrl}/login`, payload, httpOptions)
      .pipe(catchError((error) => this.handleError(error)));
  }

  getToken(): string {
    return localStorage.getItem('access_token');
  }

  logout() {
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Client side error
      console.log('An error just occurred', error.error.message);
    } else {
      // Backend error
      console.error(
        `Backend returned code ${error.status}, body was: ${error.error}`
      );
    }
    return throwError(
      'Seems there is a network issue; please try again later.'
    );
  }
}
