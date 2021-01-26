import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { MyProfileService } from '../services/my-profile.service';
import { Router } from '@angular/router';
import { map, switchMap, catchError, tap, mergeMap } from 'rxjs/operators';
import * as myProfileActions from './../store/my-profile.actions';
import { MyProfile } from '../models/my-profile.model';
import { of } from 'rxjs';

@Injectable()
export class MyProfileEffects {
  constructor(
    private actions$: Actions,
    private myProfileService: MyProfileService,
    private router: Router
  ) {}

  @Effect()
  get$ = this.actions$.pipe(
    ofType(myProfileActions.MyProfileActionTypes.GET),
    switchMap(() =>
      this.myProfileService.get().pipe(
        map((profile: MyProfile) => {
          return new myProfileActions.GetSuccess({ myProfile: profile });
        }),
        tap(() => {
          this.router.navigateByUrl('my-profile');
        }),
        catchError((error) => of(new myProfileActions.GetFailed({ error })))
      )
    )
  );
}
