import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
  private tokenKey: string = "token";
  private testAdminToken: string = "test-admin-jwt";
  private token: string | null;

    public isLoggedIn: boolean = false;
    public isTestAdmin: boolean = false;

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem(this.tokenKey);
    this.isLoggedIn = (this.token !== null);
    this.isTestAdmin = (this.token === this.testAdminToken);
  }

  login(item: LoginRequest): Observable<LoginResult> {
    var url = environment.baseUrl + "api/Account/Login";

    return this.http.post<LoginResult>(url, item)
      .pipe(tap(loginResult => {
        if (loginResult.success && loginResult.token) {
          localStorage.setItem(this.tokenKey, loginResult.token);
          this.isLoggedIn = true;
          console.log(loginResult.token); //todo delete
        }
      }));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.isLoggedIn = false; // probably don't need this (todo)
    this.isTestAdmin = false; // idk if need this
  }

  loginTestAdmin(): void {
    this.isLoggedIn = true;
    this.isTestAdmin = true;
    localStorage.setItem(this.tokenKey, this.testAdminToken);
  }

  getToken(): string | null {
    return this.token;
  }
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResult {
  success: boolean;
  token?: string;
}

//todo handle token expiration
