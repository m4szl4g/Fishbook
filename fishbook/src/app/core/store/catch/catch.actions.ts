import { Action } from '@ngrx/store';
import { Catch } from 'src/app/shared/models/catch.model';

export enum CatchActionsTypes {
  CREATE = '[Catch] Create',
  CREATE_FAILED = '[Catch] Create Failed',
  CREATE_SUCCESS = '[Catch] Create Success',

  UPLOAD_FILE = '[Catch] Upload file',
  UPLOAD_FILE_FAILED = '[Catch] Upload file Failed',

  GET_ALL = '[Catch] Get All',
  GET_ALL_SUCCESS = '[Catch] Get All Success',
  GET_ALL_FAILED = '[Catch] Get All Failed',
}

export class UploadFile implements Action {
  readonly type = CatchActionsTypes.UPLOAD_FILE;

  constructor(public file: File, public payload: Catch) {}
}

export class UploadFileFailed implements Action {
  readonly type = CatchActionsTypes.UPLOAD_FILE_FAILED;

  constructor(public payload: string) {}
}

export class Create implements Action {
  readonly type = CatchActionsTypes.CREATE;

  constructor(public payload: Catch) {}
}

export class CreateFailed implements Action {
  readonly type = CatchActionsTypes.CREATE_FAILED;

  constructor(public payload: string) {}
}

export class CreateSuccess implements Action {
  readonly type = CatchActionsTypes.CREATE_SUCCESS;

  constructor() {}
}

export class GetAll implements Action {
  readonly type = CatchActionsTypes.GET_ALL;

  constructor() {}
}

export class GetAllSuccess implements Action {
  readonly type = CatchActionsTypes.GET_ALL_SUCCESS;

  constructor(public payload: Catch[]) {}
}

export class GetAllFailed implements Action {
  readonly type = CatchActionsTypes.GET_ALL_FAILED;

  constructor(public error: string) {}
}

export type CatchActions =
  | Create
  | CreateFailed
  | CreateSuccess
  | UploadFileFailed
  | UploadFile
  | GetAllSuccess
  | GetAll
  | GetAllFailed;
