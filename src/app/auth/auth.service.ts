import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { map, tap, flatMap } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

import { ENV as environment } from '../../environments/environment';
import { User } from './user.model';

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
export class AuthService /* implements OnDestroy */ {
  private _user = new BehaviorSubject<any>(null);
  //private activeLogoutTimer: any;

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.uid;
        } else {
          return null;
        }
      })
    );
  }

  get token() {
    return this._user.asObservable().pipe(
      map(user => {
        if (user) {
          return user.getIdToken();
        } else {
          return null;
        }
      })
    );
  }

  constructor(private http: HttpClient, public firebaseAuth: AngularFireAuth) {}

  autoLogin() {
    return from(Plugins.Storage.get({ key: 'authData' })).pipe(
      map(storedData => {
        if (!storedData || !storedData.value) {
          return null;
        }
        const parsedData = JSON.parse(storedData.value) as {
          token: string;
          userId: string;
          email: string;
        };

        const user = new User(
          parsedData.userId,
          parsedData.email,
          parsedData.token
        );
        return user;
      }),
      tap(user => {
        if (user) {
          this._user.next(user);
        }
      }),
      map(user => {
        return !!user;
      })
    );
  }

  signup(email: string, password: string) {
    return from(this.firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)).pipe(
      flatMap((result) => from(this.firebaseAuth.createUserWithEmailAndPassword(email, password))),
      tap(this.setUserData.bind(this))
    )
  }

  login(email: string, password: string) {
    return from(this.firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL)).pipe(
      flatMap((result) => {
        console.log({result})
        return this.firebaseAuth.signInWithEmailAndPassword(email, password)
      }),
      tap(this.setUserData.bind(this))
    )
  }

  logout() {
    /* if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    } */
    this._user.next(null);
    Plugins.Storage.remove({ key: 'authData' });
  }

  /* ngOnDestroy() {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
  } */

  /* private autoLogout(duration: number) {
    if (this.activeLogoutTimer) {
      clearTimeout(this.activeLogoutTimer);
    }
    this.activeLogoutTimer = setTimeout(() => {
      this.logout();
    }, duration);
  } */

  private setUserData(userData: any/* AuthResponseData */) {
    const { user: { uid, email, refreshToken } } = userData
    const user = new User(uid, email, refreshToken)

    this._user.next(user);

    this.storeAuthData(
      uid,
      refreshToken,
      email
    );
  }

  private storeAuthData(
    userId: string,
    token: string,
    email: string
  ) {
    const data = JSON.stringify({
      userId: userId,
      token: token,
      email: email
    });
    Plugins.Storage.set({ key: 'authData', value: data });
  }
}
