import { Action } from '@ngrx/store';
import { NewFishModule } from 'src/app/new-fish/new-fish.module';

export enum CatchActionsTypes {
  CREATE = '[Catch] Create',
  CREATE_FAILED = '[Catch] Create Failed',
  CREATE_SUCCESS = '[Catch] Create Success',
}

export class Create implements Action {
  readonly type = CatchActionsTypes.CREATE;

  constructor(public payload: NewFishModule) {}
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
