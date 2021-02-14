import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { defer, Observable, of, pipe } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from '../../services/auth.service';
import * as myProfile from '../my-profile/my-profile.actions';
import * as auth from './auth.actions';

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
            displayName: null,
          };
          return user;
        }),
        switchMap((user: User) => {
          return [new auth.RegisterSuccess(), new myProfile.Create({ user })];
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
        tap(() => this.router.navigateByUrl('/')),
        catchError((error) => of(new auth.AuthError({ error })))
      )
    )
  );

  @Effect()
  logout$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGOUT),
    switchMap(() =>
      this.authService.logout().pipe(
        map(() => new auth.LogoutSuccess()),
        tap(() => this.router.navigateByUrl('/login')),
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
        map((authData: any) => {
          if (authData) {
            const user = {
              uid: authData.uid,
              displayName: authData.displayName,
              email: authData.email,
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
  loginSuccess$ = this.actions$.pipe(
    ofType(auth.AuthActionTypes.LOGIN_SUCCESS),
    map(() => new myProfile.Get())
  );

  @Effect()
  init$: Observable<any> = defer(() => {
    return of(new auth.GetUser());
  });
}
