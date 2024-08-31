import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly user$ = this.auth0Service.user$;

  constructor(
    private readonly auth0Service: Auth0Service,
    private readonly http: HttpClient
  ) {}

  login() {
    this.auth0Service.loginWithRedirect();
  }

  logout() {
    this.auth0Service.logout();
  }

  profile() {
    return this.http.get(`${environment.API_URL}/auth`);
  }
}
