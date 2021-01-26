import { Action } from '@ngrx/store';
import { MyProfile } from '../models/my-profile.model';

export enum MyProfileActionTypes {
  GET = '[MyProfile] GET',
  GET_SUCCESS = '[MyProfile] GET Success',
  GET_FAILED = '[MyProfile] GET Failed',
}

export class Get implements Action {
  readonly type = MyProfileActionTypes.GET;

  constructor() {}
}

export class GetSuccess implements Action {
  readonly type = MyProfileActionTypes.GET_SUCCESS;

  constructor(public payload: { myProfile: MyProfile }) {}
}

export class GetFailed implements Action {
  readonly type = MyProfileActionTypes.GET_FAILED;

  constructor(public payload: { error: string }) {}
}

export type MyProfileAction = Get | GetSuccess | GetFailed;
