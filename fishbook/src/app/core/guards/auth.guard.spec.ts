import { async, TestBed, waitForAsync } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard test', () => {
  let authGuard: AuthGuard;
  const user: firebase.default.User = {
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

  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AngularFireModule.initializeApp(environment.firebaseConfig)],
      providers: [
        { provide: Router, useValue: { navigateByUrl: (url: string) => {} } },
      ],
    }).compileComponents();

    authGuard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it(
    'User is already authenticated, returns true',
    waitForAsync(() => {
      spyOn(authService, 'getAuthState').and.returnValue(of(user));

      authGuard
        .canActivate()
        .toPromise()
        .then((result) => {
          expect(result).toBeTrue();
        });
    })
  );

  it(
    'User is not authenticated, navigate to login page',
    waitForAsync(() => {
      spyOn(authService, 'getAuthState').and.returnValue(of(null));
      spyOn(router, 'navigateByUrl').withArgs('/login').and.callThrough();

      authGuard
        .canActivate()
        .toPromise()
        .then((result) => {
          expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
          expect(result).toBeFalse();
        });
    })
  );

  it(
    'Error while getting user, navigate to login page',
    waitForAsync(() => {
      spyOn(authService, 'getAuthState').and.returnValue(throwError('error!'));
      spyOn(router, 'navigateByUrl').withArgs('/login').and.callThrough();

      authGuard
        .canActivate()
        .toPromise()
        .then((result) => {
          expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
          expect(result).toBeFalse();
        });
    })
  );
});
