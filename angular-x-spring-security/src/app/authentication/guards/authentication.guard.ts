import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, map, of, take } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {


  constructor(private authenticationService:AuthenticationService, private router:Router){}

  canActivate(): Observable<boolean | UrlTree> {
    return this.checkLogin()
  }

  checkLogin():Observable<boolean | UrlTree>{
    return this.authenticationService.isAuthenticated().pipe(
      take(1),
      map((authenticated)=>{
        if (authenticated) {
          return true;
        } else {
          return this.router.parseUrl('/login');
        }
      })
    )
  }
  
}
