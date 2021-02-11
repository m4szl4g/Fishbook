import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard test', () => {
  let authGuard: AuthGuard;
  let router: {
    navigate: '';
  };
  let user: firebase.default.User = {
    displayName: 'john',
    email: 'john@doe.com',
    photoURL: 'johnPhotoUrl',
    uid: 'uid_john',
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

  let test: AuthService;
  let autServiceMock: AuthService; //jasmine.createSpyObj({
  //     getAuthState():
  //     // getAuthState(): Promise.resolve(user)
  //   });

  beforeEach(() => {
    // spyOn(autServiceMock, 'getAuthState').and.returnValue(of(user));

    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [{ provide: Router, useValue: router }],
    }).compileComponents();

    authGuard = TestBed.inject(AuthGuard);
    test = TestBed.inject(AuthService);
  });

  it('User is not logged in, navigate to login page', () => {
    spyOn(test, 'getAuthState').and.returnValue(of(null));
    // awaitStream()
    authGuard
      .canActivate()
      .toPromise()
      .then((result) => {
        console.log(result);
        expect(result).toBeTrue();
      });
  });
});
