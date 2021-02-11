import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { RouterTestingModule } from '@angular/router/testing';
import { Actions } from '@ngrx/effects';
import { MemoizedSelector, StoreModule } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { empty, Observable, of, throwError } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { Catch } from 'src/app/shared/models/catch.model';
import { MyProfile } from 'src/app/shared/models/my-profile.model';
import { environment } from 'src/environments/environment';
import { CatchService } from '../../services/catch.service';
import { StorageService } from '../../services/storage.service';
import * as fromAuthSelectors from '../auth/auth.selectors';
import * as fromMyProfileSelectors from '../my-profile/my-profile.selectors';
import * as fromAuthState from '../auth/auth.state';
import * as fromActions from './catch.actions';
import * as fromEffects from './catch.effects';
import * as fromReducers from './catch.reducer';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('My Profile Effets', () => {
  let actions$: TestActions;
  let service: CatchService;
  let effects: fromEffects.CatchEffects;
  let store: MockStore;
  let userFromStore: MemoizedSelector<fromAuthState.AuthState, User>;
  let myProfileFromStore: MemoizedSelector<fromAuthState.AuthState, MyProfile>;
  let storageService: StorageService;
  const myProfile: MyProfile = {
    aboutMe: 'This is me',
    email: 'john@doe.com',
    firstName: 'john',
    lastName: 'doe',
  };
  const user: User = {
    email: 'mail@mail.mail',
    photoUrl: 'photoUrl',
    uid: 'uid_of_john_doe',
    displayName: 'John Doe',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        StoreModule.forRoot(fromReducers.catchReducer),
      ],
      providers: [
        CatchService,
        StorageService,
        fromEffects.CatchEffects,
        provideMockStore({}),
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.inject(CatchService);
    effects = TestBed.inject(fromEffects.CatchEffects);
    store = TestBed.inject(MockStore);
    storageService = TestBed.inject(StorageService);
    userFromStore = store.overrideSelector(fromAuthSelectors.getUser, user);
    myProfileFromStore = store.overrideSelector(
      fromMyProfileSelectors.getMyProfile,
      myProfile
    );
  });

  describe('get$', () => {
    it('should invoke get success', () => {
      const catches: Catch[] = [
        {
          details: 'I caught a big fish',
          fishType: 'pike',
          location: 'Danube',
          reel: 'Shimano U',
          rod: 'Shimano BM',
          userName: 'johndoe',
        },
        {
          details: 'I caught a big carp',
          fishType: 'carp',
          location: 'Tisza',
          reel: 'Spro ProCarp',
          rod: 'RodRod',
          userName: 'janedoe',
        },
      ];
      spyOn(service, 'getAll').and.returnValue(of(catches));

      actions$.stream = hot('-a', { a: new fromActions.GetAll() });
      const expected = cold('-b', {
        b: new fromActions.GetAllSuccess(catches),
      });

      expect(effects.get$).toBeObservable(expected);
    });

    it('should invoke get failed', () => {
      const errorMessage = 'HTTP 500';
      spyOn(service, 'getAll').and.returnValue(throwError(errorMessage));

      actions$.stream = hot('-a', { a: new fromActions.GetAll() });
      const expected = cold('-b', {
        b: new fromActions.GetAllFailed(errorMessage),
      });

      expect(effects.get$).toBeObservable(expected);
    });
  });

  describe('create$', () => {
    it('should invoke create success', () => {
      const newCatch: Catch = {
        details: 'I caught a big fish',
        fishType: 'pike',
        location: 'Danube',
        reel: 'Shimano U',
        rod: 'Shimano BM',
        userName: 'johndoe',
      };
      spyOn(service, 'create')
        .withArgs(newCatch)
        .and.returnValue(of(void 0));

      actions$.stream = hot('-a', { a: new fromActions.Create(newCatch) });
      const expected = cold('-b', {
        b: new fromActions.CreateSuccess(),
      });

      expect(effects.create$).toBeObservable(expected);
    });

    it('should invoke create failed', () => {
      const newCatch: Catch = {
        details: 'I caught a big fish',
        fishType: 'pike',
        location: 'Danube',
        reel: 'Shimano U',
        rod: 'Shimano BM',
        userName: 'johndoe',
      };
      const errorMessage = 'HTTP 500';
      spyOn(service, 'create').and.returnValue(throwError(errorMessage));

      actions$.stream = hot('-a', { a: new fromActions.Create(newCatch) });
      const expected = cold('-b', {
        b: new fromActions.CreateFailed(errorMessage),
      });

      expect(effects.create$).toBeObservable(expected);
    });
  });

  describe('upload$', () => {
    const dummyFile: File = new File([''], 'filename', { type: 'text/html' });
    const newCatch: Catch = {
      details: 'I caught a big fish',
      fishType: 'pike',
      location: 'Danube',
      reel: 'Shimano U',
      rod: 'Shimano BM',
      userName: 'johndoe',
    };

    it('should invoke upload success', () => {
      const filePath = 'https://fake-storage-path/test.jpg';
      spyOn(storageService, 'upload').and.returnValue(of(filePath));

      actions$.stream = hot('-a', {
        a: new fromActions.UploadFile(dummyFile, newCatch),
      });

      newCatch.userId = user.uid;
      newCatch.filePath = filePath;
      newCatch.userName = myProfile.firstName;

      const expected = cold('-b', {
        b: new fromActions.Create(newCatch),
      });

      expect(effects.uploadFile$).toBeObservable(expected);
    });

    it('should invoke upload failed', () => {
      const errorMessage = 'HTTP 500';
      spyOn(storageService, 'upload').and.returnValue(throwError(errorMessage));

      actions$.stream = hot('-a', {
        a: new fromActions.UploadFile(dummyFile, newCatch),
      });
      const expected = cold('-b', {
        b: new fromActions.UploadFileFailed(errorMessage),
      });

      expect(effects.uploadFile$).toBeObservable(expected);
    });
  });
});
