import * as fromReducer from "./auth.reducer";
import * as fromActions from "./auth.actions";
import { authInitialState } from './auth.state';
import { User } from '../models/user.model';

describe("Auth reducer", () => {
  describe("Reducer called with not existing action", () => {
    it("should return the default state", () => {
      const action = {} as any;
      const state = fromReducer.authReducer(authInitialState, action);

      expect(state).toBe(authInitialState);
    });
  });

  describe("invoke login action ", () => {
    it("Loading property is true and user is null", () => {
      let loginData = { email: "test@test.com", password: "Test1" };
      const action = new fromActions.Login(loginData);

      const state = fromReducer.authReducer(authInitialState, action);

      expect(true).toBe(state.isLoading);
      expect(null).toBe(state.user);
    });
  });

  describe("invoke login success", () => {
    it("Loading is false and user property is filled", () => {
      let payload = { user: { displayName: "johndoe", email: "email" , photoUrl: "URL" ,uid: "123" }};
      const action = new fromActions.LoginSuccess(payload);

      const state = fromReducer.authReducer(authInitialState, action);

      expect(false).toBe(state.isLoading);
      expect(payload.user.displayName).toBe(state.user.displayName);
      expect(payload.user.email).toBe(state.user.email);
      expect(payload.user.uid).toBe(state.user.uid);
      expect(payload.user.photoUrl).toBe(state.user.photoUrl);
      expect(true).toBe(state.isLoggedIn);
    });
  });

  describe("invoke login failed", () => {
    it("IsLoggedIn set to false", () => {
      const action = new fromActions.LoginFailed();

      const state = fromReducer.authReducer(authInitialState, action);

      expect(false).toBe(state.isLoading);
      expect(null).toBe(state.user);
      expect(false).toBe(state.isLoggedIn);
    });
  });
});