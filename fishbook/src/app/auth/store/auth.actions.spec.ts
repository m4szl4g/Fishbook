import { User } from '../models/user.model';
import * as fromAuth from "./auth.actions";


describe("Auth Actions", () => {
  describe("Login Actions", () => {
    describe("Login", () => {
        it("Login type called with login", () => {
            let loginData = { email: "test@test.com", password: "Password1"};
            const action = new fromAuth.Login(loginData);
    
            expect({ ...action }).toEqual({
              type: fromAuth.AuthActionTypes.LOGIN,
              payload: loginData
            });
          });
    });

    describe("Login Success", () => {
        it("Login Success called with user data", () => {
            let user = { user: { email: "test@test.com", 
                displayName: "John Doe", uid: "123124234", photoUrl: "url", providerId: ""}};
            const action = new fromAuth.LoginSuccess(user);
    
            expect({ ...action }).toEqual({
              type: fromAuth.AuthActionTypes.LOGIN_SUCCESS,
              payload: user
            });
          });
    });

    describe("Login Failed", () => {
        it("LoginFailed called with empty", () => {
            const action = new fromAuth.LoginFailed();
    
            expect({ ...action }).toEqual({
              type: fromAuth.AuthActionTypes.LOGIN_FAILED
            });
          });
    });
  });
});