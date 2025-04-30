import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environments } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router,@Inject(PLATFORM_ID)private platformId:Object) { }

  register(data: any): Observable<any> {
    return this.httpClient.post(environments.baseUrl + 'auth/signup', data)
  }
  login(data: any): Observable<any> {
    return this.httpClient.post(environments.baseUrl + 'auth/signin', data)
  }
  saveToken(token: any): void {
    if (typeof localStorage != 'undefined')
      localStorage.setItem('token', token)
  }
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId))
      return localStorage.getItem('token')
    return null
  }
  isAuthorized(): boolean {
    if (typeof localStorage != 'undefined')
      return !!localStorage.getItem('token')
    return false
  }
  logout() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }
  decodeToken() {
    try {
      if (typeof localStorage != 'undefined') {
        const decoded = jwtDecode(localStorage.getItem('token')!);

      }
    } catch {
      this.logout()
    }
  }
}
