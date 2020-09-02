import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';


export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user = new BehaviorSubject<any>(null);


  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        return user ? true : false
      })
    )
  }

  get user() {
    return this._user.asObservable()
  }

  constructor(public firebaseAuth: AngularFireAuth) {
    firebaseAuth.authState.subscribe(user => this._user.next(user))
  }

  autoLogin() {
    return from(this.firebaseAuth.currentUser).pipe(
      tap(user => {
        if (user) {
          this._user.next(user)
        }
      }),
      map(user => {
        return !!user;
      })
    )
  }

  signup(email: string, password: string) {
    return from(this.firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)).pipe(
      flatMap((result) => this.firebaseAuth.createUserWithEmailAndPassword(email, password)),
      tap(user => this._user.next(user.user))
    )
  }

  login(email: string, password: string) {
    return from(this.firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)).pipe(
      flatMap((result) => this.firebaseAuth.signInWithEmailAndPassword(email, password)),
      tap(user => this._user.next(user.user))
    )
  }

  logout() {
    this._user.next(null);
    this.firebaseAuth.signOut()
  }

}
