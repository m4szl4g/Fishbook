import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export enum AuthActionTypes {
  REGISTER = '[Auth] REGISTER',
  REGISTER_COMPLETED = '[Auth] REGISTER Completed',
  REGISTER_FAILED = '[Auth] REGISTER Failed',

  LOGIN = '[Auth] LOGIN',
  LOGIN_SUCCESS = '[Auth] LOGIN Success',
  LOGIN_FAILED = '[Auth] LOGIN Failed',

  LOGOUT = '[Auth] LOGOUT',
  LOGOUT_COMPLETED = '[Auth] LOGOUT completed',

  GET_USER = '[Auth] GET User',

  AUTH_ERROR = '[Auth] Error',
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;

  constructor(public payload: { email: string; password: string }) {}
}

export class RegisterCompleted implements Action {
  readonly type = AuthActionTypes.REGISTER_COMPLETED;
}

export class RegisterFailed implements Action {
  readonly type = AuthActionTypes.REGISTER_FAILED;

  constructor(public payload: { error: any }) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: { email: string; password: string }) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: { user: User }) {}
}

export class LoginFailed implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILED;
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;

  constructor(public payload: { user: User }) {}
}

export class LogoutCompleted implements Action {
  readonly type = AuthActionTypes.LOGOUT_COMPLETED;
}

export class GetUser implements Action {
  readonly type = AuthActionTypes.GET_USER;
}

export class AuthError implements Action {
  readonly type = AuthActionTypes.AUTH_ERROR;

  constructor(public payload: { error: any }) {}
}

export type AuthAction =
  | Register
  | RegisterCompleted
  | RegisterFailed
  | Login
  | LoginSuccess
  | LoginFailed
  | Logout
  | LogoutCompleted
  | GetUser
  | AuthError;
