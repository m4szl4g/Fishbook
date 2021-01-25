import { User } from '../models/user.model';
import * as fromAuth from './auth.actions';

describe('Auth Actions', () => {
  describe('Login', () => {
    it('Login type called with login', () => {
      let loginData = { email: 'test@test.com', password: 'Password1' };
      const action = new fromAuth.Login(loginData);

      expect({ ...action }).toEqual({
        type: fromAuth.AuthActionTypes.LOGIN,
        payload: loginData,
      });
    });
  });

  describe('Login Success', () => {
    it('Login Success called with user data', () => {
      let user = {
        user: {
          email: 'test@test.com',
          displayName: 'John Doe',
          uid: '123124234',
          photoUrl: 'url',
          providerId: '',
        },
      };
      const action = new fromAuth.LoginSuccess(user);

      expect({ ...action }).toEqual({
        type: fromAuth.AuthActionTypes.LOGIN_SUCCESS,
        payload: user,
      });
    });
  });

  describe('Login Failed', () => {
    it('LoginFailed called with empty', () => {
      const action = new fromAuth.LoginFailed();

      expect({ ...action }).toEqual({
        type: fromAuth.AuthActionTypes.LOGIN_FAILED,
      });
    });
  });

  describe('Logout', () => {
    it('Invoked Logout action type', () => {
      const action = new fromAuth.Logout();

      expect({ ...action }).toEqual({
        type: fromAuth.AuthActionTypes.LOGOUT,
      });
    });
  });

  describe('Logout', () => {
    it('Invoked Logout action type', () => {
      const action = new fromAuth.Logout();

      expect({ ...action }).toEqual({
        type: fromAuth.AuthActionTypes.LOGOUT,
      });
    });
  });

  describe('Logout Success', () => {
    it('Invoked Logout success action type', () => {
      const action = new fromAuth.LogoutSuccess();

      expect({ ...action }).toEqual({
        type: fromAuth.AuthActionTypes.LOGOUT_SUCCESS,
      });
    });
  });

  describe('Get User', () => {
    it('Get user action type is invoked', () => {
      const action = new fromAuth.GetUser();

      expect({ ...action }).toEqual({
        type: fromAuth.AuthActionTypes.GET_USER,
      });
    });
  });

  describe('Register', () => {
    it('Register action type is invoked', () => {
      let registerData = {
        email: 'test',
        password: 'pass',
      };
      const action = new fromAuth.Register(registerData);

      expect({ ...action }).toEqual({
        type: fromAuth.AuthActionTypes.REGISTER,
        payload: registerData,
      });
    });
  });

  describe('Register Success', () => {
    it('Register Success action type is invoked', () => {
      let registerData = {
        email: 'test',
        password: 'pass',
      };
      const action = new fromAuth.RegisterSuccess();

      expect({ ...action }).toEqual({
        type: fromAuth.AuthActionTypes.REGISTER_SUCCESS,
      });
    });
  });

  describe('Register Failed', () => {
    it('Register Failed action type is invoked', () => {
      let registerData = {
        email: 'test',
        password: 'pass',
      };
      let errorPayload = { error: 'HTTP 500' };
      const action = new fromAuth.RegisterFailed(errorPayload);

      expect({ ...action }).toEqual({
        type: fromAuth.AuthActionTypes.REGISTER_FAILED,
        payload: errorPayload,
      });
    });
  });
});
