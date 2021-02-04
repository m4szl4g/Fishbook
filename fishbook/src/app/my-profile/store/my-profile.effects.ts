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
import { Equipment } from 'src/app/shared/models/equipment.model';
import { EquipmentService } from 'src/app/core/services/equipment.service';

@Injectable()
export class MyProfileEffects {
  constructor(
    private actions$: Actions,
    private myProfileService: MyProfileService,
    private equipmentService: EquipmentService,
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
  create$ = this.actions$.pipe(
    ofType(myProfileActions.MyProfileActionTypes.CREATE),
    switchMap((user: User) => {
      return this.myProfileService.create(user).pipe(
        map(() => {
          return new myProfileActions.CreateSuccess();
        }),
        tap(() => {
          this.router.navigateByUrl('login');
        }),
        catchError((error) => of(new myProfileActions.CreateFailed({ error })))
      );
    })
  );

  @Effect()
  update$ = this.actions$.pipe(
    ofType(myProfileActions.MyProfileActionTypes.UPDATE),
    map((action: myProfileActions.Update) => action.payload),
    withLatestFrom(this.store.select(authSelectors.getUser)),
    switchMap(([profile, user]: [MyProfile, User]) => {
      return this.myProfileService.update(profile, user).pipe(
        map(() => {
          return new myProfileActions.UpdateSuccess({ myProfile: profile });
        }),
        tap(() => {
          this.router.navigateByUrl('my-profile');
        }),
        catchError((error) => of(new myProfileActions.UpdateFailed({ error })))
      );
    }),
    catchError((error) => of(new myProfileActions.UpdateFailed({ error })))
  );

  @Effect()
  createEquipment$ = this.actions$.pipe(
    ofType(myProfileActions.MyProfileActionTypes.CREATE_EQUIPMENT),
    map((action: myProfileActions.CreateEquipment) => action.payload),
    withLatestFrom(this.store.select(authSelectors.getUser)),
    switchMap(([equipment, user]: [Equipment, User]) => {
      return this.equipmentService.create(equipment, user.uid).pipe(
        map(() => {
          return new myProfileActions.CreateEquipmentSuccess();
        }),
        tap(() => {
          this.router.navigateByUrl('my-profile');
        }),
        catchError((error) =>
          of(new myProfileActions.CreateEquipmentFailed(error))
        )
      );
    }),
    catchError((error) => of(new myProfileActions.CreateEquipmentFailed(error)))
  );

  @Effect()
  getEquipment$ = this.actions$.pipe(
    ofType(myProfileActions.MyProfileActionTypes.GET_EQUIPMENT),
    withLatestFrom(this.store.select(authSelectors.getUser)),
    switchMap(([, user]: [any, User]) => {
      console.log('getequip', user.uid);
      return this.equipmentService.getAll(user.uid).pipe(
        map((equipments: Equipment[]) => {
          console.log('equp', equipments);
          return new myProfileActions.GetEquipmentSuccess(equipments);
        }),
        catchError((error) =>
          of(new myProfileActions.GetEquipmentFailed(error))
        )
      );
    }),
    catchError((error) => of(new myProfileActions.GetEquipmentFailed(error)))
  );
}
