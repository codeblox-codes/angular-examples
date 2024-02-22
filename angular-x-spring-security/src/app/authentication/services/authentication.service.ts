import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl= environment.apiUrl + '/auth'

  constructor(private httpClient:HttpClient, private router:Router) { }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem('access_token');
    return of(!!token);
  }

  login(username:string, password:string):Observable<any>{
    const loginUrl= this.apiUrl + '/login'
    let loginDTO = {
      username:username,
      password:password
    }
    return this.httpClient.post(loginUrl, loginDTO);
  }


  register(user:any):Observable<any>{
    const registrationUrl= this.apiUrl + '/registration'
    return this.httpClient.post(registrationUrl, user);
  }

  refreshToken():Observable<any>{
    const refreshToken = this.getRefreshToken();
    const refreshTokenUrl= this.apiUrl + '/refresh-token'
    return this.httpClient.post(refreshTokenUrl, refreshToken);
  }

  accessProtectedData():Observable<any>{
    const protectedDataUrl= this.apiUrl + '/protected-content-for-users'
    return this.httpClient.get<any>(protectedDataUrl);
  }

  setAccessToken(accessToken:any){
    localStorage.setItem('access_token', accessToken)
  }

  getAccessToken():string | null{
    return localStorage.getItem("access_token");
  }

  getRefreshToken():string | null{
    return localStorage.getItem("refresh_token");
  }

  activateAccount(validationCode:any):Observable<any>{
    const accountValidationUrl= this.apiUrl + '/activate-account'
    return this.httpClient.post(accountValidationUrl, validationCode);
  }

  logout():Observable<any>{
    const logoutUrl= this.apiUrl + '/logout'
    return this.httpClient.post(logoutUrl, null)
  }

}
