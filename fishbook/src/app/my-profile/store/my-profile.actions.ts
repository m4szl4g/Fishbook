import { Action } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';
import { MyProfile } from '../../shared/models/my-profile.model';

export enum MyProfileActionTypes {
  GET = '[MyProfile] GET',
  GET_SUCCESS = '[MyProfile] GET Success',
  GET_FAILED = '[MyProfile] GET Failed',

  CREATE = '[MyProfile] Create',
  CREATE_FAILED = '[MyProfile] Create Failed',
  CREATE_SUCCESS = '[MyProfile] Create Success',
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

export class Create implements Action {
  readonly type = MyProfileActionTypes.CREATE;

  constructor(public payload: { user: User }) {}
}

export class CreateFailed implements Action {
  readonly type = MyProfileActionTypes.CREATE_FAILED;

  constructor(public payload: { error: string }) {}
}

export class CreateSuccess implements Action {
  readonly type = MyProfileActionTypes.CREATE_SUCCESS;

  constructor() {}
}

export type MyProfileAction =
  | Get
  | GetSuccess
  | GetFailed
  | Create
  | CreateFailed
  | CreateSuccess;
