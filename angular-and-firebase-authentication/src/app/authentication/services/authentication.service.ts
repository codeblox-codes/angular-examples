import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth:AngularFireAuth) {
  }

  signUp(email:string, password:string){
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  signIn(email:string, password:string):Promise<any>{
    return this.angularFireAuth.signInWithEmailAndPassword(email, password);
  }

  isAuthenticated(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(map(user => !!user));
  }

  logOut(){
    return this.angularFireAuth.signOut();
  }

}
