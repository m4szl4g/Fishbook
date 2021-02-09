import { Action } from '@ngrx/store';
import { User } from 'src/app/auth/models/user.model';

export enum AuthActionTypes {
  REGISTER = '[Auth] REGISTER',
  REGISTER_SUCCESS = '[Auth] REGISTER Success',
  REGISTER_FAILED = '[Auth] REGISTER Failed',

  LOGIN = '[Auth] LOGIN',
  LOGIN_SUCCESS = '[Auth] LOGIN Success',
  LOGIN_FAILED = '[Auth] LOGIN Failed',

  LOGOUT = '[Auth] LOGOUT',
  LOGOUT_SUCCESS = '[Auth] LOGOUT Success',

  GET_USER = '[Auth] GET User',

  AUTH_ERROR = '[Auth] Error',
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;

  constructor(public payload: { email: string; password: string }) {}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;
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

  constructor() {}
}

export class LogoutSuccess implements Action {
  readonly type = AuthActionTypes.LOGOUT_SUCCESS;
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
  | RegisterSuccess
  | RegisterFailed
  | Login
  | LoginSuccess
  | LoginFailed
  | Logout
  | LogoutSuccess
  | GetUser
  | AuthError;
