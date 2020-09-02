import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap, switchMap, map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private afAuth: AngularFireAuth) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.afAuth.authState.pipe(
      take(1),
      map(authState => !!authState),
      tap(authState => {
        if(!authState) {
          this.router.navigateByUrl('/auth');
        }
      })
    )
  }

  canActivate(): Observable<boolean> | any {
    return this.afAuth.authState.pipe(
      take(1),
      map(authState => !!authState),
      tap(authState => {
        if(!authState) {
          this.router.navigateByUrl('/auth');
        }
      })
    )
    
  }
}
