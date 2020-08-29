import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, tap, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService: AuthService, private router: Router) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.userIsAuthenticated.pipe(
      take(1),
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          console.log("autologin canLoad")
          //return this.authService.autoLogin();
          return of(isAuthenticated)
        } else {
          console.log("isAuthenticated canLoad")
          return of(isAuthenticated);
        }
      }),
      tap(isAuthenticated => {
        if (!isAuthenticated) {
          console.log(isAuthenticated)
          console.log("denied!")
          this.router.navigateByUrl('/auth');
        }
      })
    );
  }

  canActivate(): Observable<boolean> | any {
    return this.authService.userIsAuthenticated.pipe(
      take(1),
      switchMap(isAuthenticated => {
        if (!isAuthenticated) {
          console.log("autologin canActivate")
          return this.authService.autoLogin();
        } else {
          console.log("isAuthenticated canActivate")
          return of(isAuthenticated);
        }
      })
    )
  }
}
