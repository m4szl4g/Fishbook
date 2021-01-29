import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  catchError,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { User } from 'src/app/auth/models/user.model';
import { MyProfile } from '../../shared/models/my-profile.model';
import { MyProfileService } from '../../core/services/my-profile.service';
import * as authSelectors from './../../auth/store/auth.selectors';
import * as myProfileActions from './../store/my-profile.actions';

@Injectable()
export class MyProfileEffects {
  constructor(
    private actions$: Actions,
    private myProfileService: MyProfileService,
    private router: Router,
    private store: Store
  ) {}

  @Effect()
  get$ = this.actions$.pipe(
    ofType(myProfileActions.MyProfileActionTypes.GET),
    withLatestFrom(this.store.select(authSelectors.getUser)),
    switchMap(([empty, user]: [void, User]) => {
      return this.myProfileService.get(user.uid).pipe(
        map((profile: MyProfile) => {
          return new myProfileActions.GetSuccess({ myProfile: profile });
        }),
        tap(() => {
          this.router.navigateByUrl('my-profile');
        }),
        catchError((error) => of(new myProfileActions.GetFailed({ error })))
      );
    })
  );

  @Effect()
  createProfile$ = this.actions$.pipe(
    ofType(myProfileActions.MyProfileActionTypes.CREATE),
    switchMap((user: User) => {
      return this.myProfileService.create(user).pipe(
        map(() => new myProfileActions.CreateSuccess()),
        tap(() => {
          this.router.navigateByUrl('login');
        }),
        catchError((error) => of(new myProfileActions.CreateFailed({ error })))
      );
    })
  );
}
