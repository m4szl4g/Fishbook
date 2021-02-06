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
import { NewCatch } from 'src/app/shared/models/new-fish.model';
import * as authSelectors from '../../../auth/store/auth.selectors';
import { CatchService } from '../../services/catch.service';
import * as fromCatchActions from './catch.actions';

@Injectable()
export class CatchEffects {
  constructor(
    private actions$: Actions,
    private catchService: CatchService,
    private router: Router,
    private store: Store
  ) {}

  @Effect()
  create$ = this.actions$.pipe(
    ofType(fromCatchActions.CatchActionsTypes.CREATE),
    map((action: fromCatchActions.Create) => action.payload),
    withLatestFrom(this.store.select(authSelectors.getUser)),
    switchMap(([data, user]: [NewCatch, User]) => {
      const newCatch: NewCatch = {
        ...data,
        userId: user.uid,
      };

      return this.catchService.create(newCatch).pipe(
        map(() => {
          return new fromCatchActions.CreateSuccess();
        }),
        tap(() => {
          this.router.navigateByUrl('/');
        }),
        catchError((error) => of(new fromCatchActions.CreateFailed(error)))
      );
    })
  );
}
