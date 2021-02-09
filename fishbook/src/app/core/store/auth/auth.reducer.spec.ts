import * as fromReducer from './auth.reducer';
import * as fromActions from './auth.actions';
import { authInitialState } from './auth.state';

describe('Auth reducers', () => {
  it('no action should return default state', () => {
    const action = {} as any;
    const state = fromReducer.authReducer(authInitialState, action);

    expect(state).toBe(authInitialState);
  });

  it('Auth error - error should be added', () => {
    let errorPayload = { error: 'error123' };
    const action = new fromActions.AuthError(errorPayload);

    const state = fromReducer.authReducer(authInitialState, action);

    expect(false).toBe(state.isLoading);
    expect(null).toBe(state.user);
    expect('error123').toBe(state.error);
  });

  describe('Login reducers', () => {
    it('Login - Loading property is true and user is null', () => {
      let loginData = { email: 'test@test.com', password: 'Test1' };
      const action = new fromActions.Login(loginData);

      const state = fromReducer.authReducer(authInitialState, action);

      expect(true).toBe(state.isLoading);
      expect(null).toBe(state.user);
    });

    it('Login Success - Loading is false and user property is filled', () => {
      let payload = {
        user: {
          displayName: 'johndoe',
          email: 'email',
          photoUrl: 'URL',
          uid: '123',
        },
      };
      const action = new fromActions.LoginSuccess(payload);

      const state = fromReducer.authReducer(authInitialState, action);

      expect(false).toBe(state.isLoading);
      expect(payload.user.displayName).toBe(state.user.displayName);
      expect(payload.user.email).toBe(state.user.email);
      expect(payload.user.uid).toBe(state.user.uid);
      expect(payload.user.photoUrl).toBe(state.user.photoUrl);
      expect(true).toBe(state.isLoggedIn);
    });

    it('LogginFailed - IsLoggedIn set to false', () => {
      const action = new fromActions.LoginFailed();

      const state = fromReducer.authReducer(authInitialState, action);

      expect(false).toBe(state.isLoading);
      expect(null).toBe(state.user);
      expect(false).toBe(state.isLoggedIn);
    });
  });
});
