import { Action } from '@ngrx/store';
import { NewCatch } from 'src/app/shared/models/new-fish.model';

export enum CatchActionsTypes {
  CREATE = '[Catch] Create',
  CREATE_FAILED = '[Catch] Create Failed',
  CREATE_SUCCESS = '[Catch] Create Success',

  UPLOAD_FILE = '[Catch] Upload file',
  UPLOAD_FILE_FAILED = '[Catch] Upload file Failed',
}

export class UploadFile implements Action {
  readonly type = CatchActionsTypes.UPLOAD_FILE;

  constructor(public file: File, public payload: NewCatch) {}
}

export class UploadFileFailed implements Action {
  readonly type = CatchActionsTypes.UPLOAD_FILE_FAILED;

  constructor(public payload: string) {}
}

export class Create implements Action {
  readonly type = CatchActionsTypes.CREATE;

  constructor(public payload: NewCatch) {}
}

export class CreateFailed implements Action {
  readonly type = CatchActionsTypes.CREATE_FAILED;

  constructor(public payload: string) {}
}

export class CreateSuccess implements Action {
  readonly type = CatchActionsTypes.CREATE_SUCCESS;

  constructor() {}
}

export type CatchActions = Create | CreateFailed | CreateSuccess;
