import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Observable, of, defer } from 'rxjs';
import { map, switchMap, catchError, tap, take } from 'rxjs/operators';

import * as auth from './../store/auth.actions';
import { User } from '../models/user.model';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  @Effect()
  register$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.REGISTER),
    map((action: auth.Register) => action.payload),
    switchMap((payload) =>
      this.authService.register(payload.email, payload.password).pipe(
        map((res: any) => {
          const user = {
            uid: res.user.uid,
            email: res.user.email,
            photoUrl: res.user.photoURL,
          };
          return user;
        }),
        switchMap((user: User) => {
          return [
            new auth.RegisterCompleted(),
            new auth.LoginSuccess({ user }),
          ];
        }),
        tap(() => {
          this.router.navigateByUrl('');
        }),
        catchError((error) => of(new auth.AuthError({ error })))
      )
    )
  );

  @Effect()
  login$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGIN),
    map((action: auth.Login) => action.payload),
    switchMap((payload) =>
      this.authService.login(payload.email, payload.password).pipe(
        map((res: any) => {
          const user = {
            uid: res.user.uid,
            displayName: res.user.displayName,
            email: res.user.email,
            photoUrl: res.user.photoURL,
          };
          return new auth.LoginSuccess({ user });
        }),
        tap(() => this.router.navigateByUrl('')),
        catchError((error) => of(new auth.AuthError({ error })))
      )
    )
  );

  @Effect()
  loginSuccess$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGIN_SUCCESS)
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGOUT),
    map((action: auth.Logout) => action.payload),
    switchMap((payload: any) =>
      this.authService.logout().pipe(
        map(() => new auth.LogoutCompleted()),
        tap(() => this.router.navigateByUrl('')),
        catchError((error) => {
          return of(new auth.AuthError({ error }));
        })
      )
    )
  );

  @Effect()
  getUser$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.GET_USER),
    switchMap(() =>
      this.authService.getAuthState().pipe(
        take(1),
        map((authData: any) => {
          if (authData) {
            const user = {
              uid: authData.uid,
              displayName: authData.displayName,
              email: authData.email,
              providerId: authData.providerData[0].providerId,
              photoUrl: authData.photoURL,
            };
            return new auth.LoginSuccess({ user });
          } else {
            return new auth.LoginFailed();
          }
        }),
        catchError((error) => of(new auth.AuthError({ error })))
      )
    )
  );

  @Effect()
  init$: Observable<any> = defer(() => {
    return of(new auth.GetUser());
  });
}
