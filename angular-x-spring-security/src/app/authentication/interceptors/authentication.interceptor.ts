import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService, private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken) {
        request = this.addTokenToRequest(request, accessToken);
    }

    return next.handle(request).pipe(
        catchError(error => {
            if (error.status === 401 && refreshToken) {
                return this.handleTokenRefresh(request, next);
            } else {
                return throwError(error);
            }
        })
    );
}

private addTokenToRequest(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
        setHeaders: {
            Authorization: `Bearer ${token}`
        }
    });
}

private handleTokenRefresh(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authenticationService.refreshToken().pipe(
        switchMap((data:any) => {
          localStorage.setItem('access_token', data.accessToken);
          localStorage.setItem('refresh_token', data.token);
          request = this.addTokenToRequest(request, data.accessToken);
          return next.handle(request);
        }),
        catchError(error => {
            // Handle refresh token expiry
            if (error.status === 401) {
                // Redirect to login page or handle logout
                this.authenticationService.logout().subscribe((success)=>{
                  this.router.navigate(['/login'])
                });
            }
            return throwError(error);
        })
    );
}
}
