import { Action } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';
import { Equipment } from 'src/app/shared/models/equipment.model';
import { MyProfile } from '../../shared/models/my-profile.model';

export enum MyProfileActionTypes {
  GET = '[MyProfile] GET',
  GET_SUCCESS = '[MyProfile] GET Success',
  GET_FAILED = '[MyProfile] GET Failed',

  CREATE = '[MyProfile] Create',
  CREATE_FAILED = '[MyProfile] Create Failed',
  CREATE_SUCCESS = '[MyProfile] Create Success',

  UPDATE = '[MyProfile] Update',
  UPDATE_FAILED = '[MyProfile] Update Failed',
  UPDATE_SUCCESS = '[MyProfile] Update Success',

  GET_EQUIPMENT = '[MyProfile] Get Equipment',
  GET_EQUIPMENT_SUCCESS = '[MyProfile] Get Equipment Success',
  GET_EQUIPMENT_FAILED = '[MyProfile] Get Equipment Failed',

  CREATE_EQUIPMENT = '[MyProfile] Create Equipment',
  CREATE_EQUIPMENT_SUCCESS = '[MyProfile] Create Equipment Success',
  CREATE_EQUIPMENT_FAILED = '[MyProfile] Create Equipment Failed',
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

export class Update implements Action {
  readonly type = MyProfileActionTypes.UPDATE;

  constructor(public payload: MyProfile) {}
}

export class UpdateSuccess implements Action {
  readonly type = MyProfileActionTypes.UPDATE_SUCCESS;

  constructor(public payload: { myProfile: MyProfile }) {}
}

export class UpdateFailed implements Action {
  readonly type = MyProfileActionTypes.UPDATE_FAILED;

  constructor(public payload: { error: string }) {}
}

export class GetEquipment implements Action {
  readonly type = MyProfileActionTypes.GET_EQUIPMENT;

  constructor() {}
}

export class GetEquipmentSuccess implements Action {
  readonly type = MyProfileActionTypes.GET_EQUIPMENT_SUCCESS;

  constructor(public payload: Equipment) {}
}

export class GetEquipmentFailed implements Action {
  readonly type = MyProfileActionTypes.GET_EQUIPMENT_FAILED;

  constructor(public payload: string) {}
}

export class CreateEquipment implements Action {
  readonly type = MyProfileActionTypes.CREATE_EQUIPMENT;

  constructor(public payload: Equipment) {}
}

export class CreateEquipmentFailed implements Action {
  readonly type = MyProfileActionTypes.CREATE_EQUIPMENT_FAILED;

  constructor(public payload: string) {}
}

export class CreateEquipmentSuccess implements Action {
  readonly type = MyProfileActionTypes.CREATE_EQUIPMENT_SUCCESS;

  constructor() {}
}

export type MyProfileAction =
  | Get
  | GetSuccess
  | GetFailed
  | Create
  | CreateFailed
  | CreateSuccess
  | Update
  | UpdateFailed
  | UpdateSuccess;
