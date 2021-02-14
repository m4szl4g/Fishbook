import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { empty, Observable, of } from 'rxjs';
import * as fromEffects from '../auth/auth.effects';
import * as fromActions from '../auth/auth.actions';
import * as fromReducers from '../auth/auth.reducer';
import * as fromMyProfileActions from '../my-profile/my-profile.actions';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { hot, cold } from 'jasmine-marbles';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions(): TestActions {
  return new TestActions();
}

describe('Auth Effets', () => {
  let actions$: TestActions;
  let service: AuthService;
  let effects: fromEffects.AuthEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        StoreModule.forRoot(fromReducers.authReducer),
      ],
      providers: [
        AuthService,
        fromEffects.AuthEffects,
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(AuthService);
    effects = TestBed.get(fromEffects.AuthEffects);
  });

  describe('login$', () => {
    it('should invoke login success action', () => {
      const nameJohn = 'johndoe';
      const emailJohn = 'john@test.doe';
      const photoJohn = 'url_john';
      const idJohn = 'id_john_doe';

      const userCredential: firebase.default.auth.UserCredential = {
        credential: {
          providerId: 'prov_id',
          signInMethod: 'userpass',
          toJSON: null,
        },
        user: {
          displayName: nameJohn,
          email: emailJohn,
          photoURL: photoJohn,
          uid: idJohn,
          emailVerified: true,
          isAnonymous: false,
          phoneNumber: null,
          metadata: null,
          multiFactor: null,
          providerData: null,
          providerId: 'prov_id',
          delete: null,
          getIdToken: null,
          getIdTokenResult: null,
          linkWithCredential: null,
          linkWithPhoneNumber: null,
          linkWithPopup: null,
          linkWithRedirect: null,
          reauthenticateWithCredential: null,
          reauthenticateWithPhoneNumber: null,
          reauthenticateWithPopup: null,
          reauthenticateWithRedirect: null,
          refreshToken: null,
          reload: null,
          sendEmailVerification: null,
          tenantId: null,
          toJSON: null,
          unlink: null,
          updateEmail: null,
          updatePassword: null,
          updatePhoneNumber: null,
          updateProfile: null,
          verifyBeforeUpdateEmail: null,
          linkAndRetrieveDataWithCredential: null,
          reauthenticateAndRetrieveDataWithCredential: null,
        },
      };
      spyOn(service, 'login').and.returnValue(of(userCredential));
      let loginPayload = { email: 'test@gmail.com', password: 'Pass123' };
      const action = new fromActions.Login(loginPayload);

      let userPayload = {
        user: {
          uid: idJohn,
          displayName: nameJohn,
          email: emailJohn,
          photoUrl: photoJohn,
        },
      };
      const completion = new fromActions.LoginSuccess(userPayload);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.login$).toBeObservable(expected);
    });

    it('Login - should invoke login failed after authentication failed', () => {
      const errorMessage = 'Error XYZ';
      spyOn(service, 'login').and.returnValue(throwError(errorMessage));
      const loginPayload = { email: 'test@gmail.com', password: 'Pass123' };
      const action = new fromActions.Login(loginPayload);

      const errorPayload = { error: errorMessage };
      const completion = new fromActions.AuthError(errorPayload);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.login$).toBeObservable(expected);
    });
  });

  describe('getUser$', () => {
    it('GetUser - should invoke login success action', () => {
      const johnName = 'johndoe',
        johnEmail = 'john@email.com',
        johnPhotoUrl = 'photo_url',
        johnId = 'ID_John_123';
      const user: firebase.default.User = {
        displayName: johnName,
        email: johnEmail,
        photoURL: johnPhotoUrl,
        uid: johnId,
        emailVerified: true,
        isAnonymous: false,
        phoneNumber: null,
        metadata: null,
        multiFactor: null,
        providerData: null,
        providerId: 'prov_id',
        delete: null,
        getIdToken: null,
        getIdTokenResult: null,
        linkWithCredential: null,
        linkWithPhoneNumber: null,
        linkWithPopup: null,
        linkWithRedirect: null,
        reauthenticateWithCredential: null,
        reauthenticateWithPhoneNumber: null,
        reauthenticateWithPopup: null,
        reauthenticateWithRedirect: null,
        refreshToken: null,
        reload: null,
        sendEmailVerification: null,
        tenantId: null,
        toJSON: null,
        unlink: null,
        updateEmail: null,
        updatePassword: null,
        updatePhoneNumber: null,
        updateProfile: null,
        verifyBeforeUpdateEmail: null,
        linkAndRetrieveDataWithCredential: null,
        reauthenticateAndRetrieveDataWithCredential: null,
      };
      spyOn(service, 'getAuthState').and.returnValue(of(user));

      const payloadLogin = {
        user: {
          uid: johnId,
          displayName: johnName,
          email: johnEmail,
          photoUrl: johnPhotoUrl,
        },
      };

      actions$.stream = hot('-a', { a: new fromActions.GetUser() });
      const expected = cold('-b', {
        b: new fromActions.LoginSuccess(payloadLogin),
      });

      expect(effects.getUser$).toBeObservable(expected);
    });

    it('GetUser - should invoke login failed after authentication failed', () => {
      const errorMessage = 'Error XYZ';
      spyOn(service, 'getAuthState').and.returnValue(throwError(errorMessage));
      const action = new fromActions.GetUser();

      const errorPayload = { error: errorMessage };
      const completion = new fromActions.AuthError(errorPayload);
      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.getUser$).toBeObservable(expected);
    });
  });

  describe('register$', () => {
    it('Register - should invoke register success', () => {
      const nameJohn = 'johndoe';
      const emailJohn = 'john@test.doe';
      const photoJohn = 'url_john';
      const idJohn = 'id_john_doe';

      const userCredential: firebase.default.auth.UserCredential = {
        credential: {
          providerId: 'prov_id',
          signInMethod: 'userpass',
          toJSON: null,
        },
        user: {
          displayName: nameJohn,
          email: emailJohn,
          photoURL: photoJohn,
          uid: idJohn,
          emailVerified: true,
          isAnonymous: false,
          phoneNumber: null,
          metadata: null,
          multiFactor: null,
          providerData: null,
          providerId: 'prov_id',
          delete: null,
          getIdToken: null,
          getIdTokenResult: null,
          linkWithCredential: null,
          linkWithPhoneNumber: null,
          linkWithPopup: null,
          linkWithRedirect: null,
          reauthenticateWithCredential: null,
          reauthenticateWithPhoneNumber: null,
          reauthenticateWithPopup: null,
          reauthenticateWithRedirect: null,
          refreshToken: null,
          reload: null,
          sendEmailVerification: null,
          tenantId: null,
          toJSON: null,
          unlink: null,
          updateEmail: null,
          updatePassword: null,
          updatePhoneNumber: null,
          updateProfile: null,
          verifyBeforeUpdateEmail: null,
          linkAndRetrieveDataWithCredential: null,
          reauthenticateAndRetrieveDataWithCredential: null,
        },
      };
      spyOn(service, 'register').and.returnValue(of(userCredential));
      const action = new fromActions.Register({
        password: 'pass',
        email: emailJohn,
      });

      const registerSuccess = new fromActions.RegisterSuccess();
      let userPayload = {
        user: {
          email: emailJohn,
          photoUrl: photoJohn,
          displayName: null,
          uid: idJohn,
        },
      };
      const userCreate = new fromMyProfileActions.Create(userPayload);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-(bc)', { b: registerSuccess, c: userCreate });

      expect(effects.register$).toBeObservable(expected);
    });

    it('Register - should invoke login failed after authentication failed', () => {
      const errorMessage = 'Error XYZ';
      spyOn(service, 'register').and.returnValue(throwError(errorMessage));
      const action = new fromActions.Register({
        password: 'pass',
        email: 'mail@gmail.com',
      });

      const errorPayload = { error: errorMessage };
      const completion = new fromActions.AuthError(errorPayload);

      actions$.stream = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.register$).toBeObservable(expected);
    });
  });

  describe('logout$', () => {
    it('Logout - Invoked logout success', () => {
      spyOn(service, 'logout').and.returnValue(of(void 0));

      actions$.stream = hot('-a', { a: new fromActions.Logout() });
      const expected = cold('-b', { b: new fromActions.LogoutSuccess() });

      expect(effects.logout$).toBeObservable(expected);
    });
  });
});
