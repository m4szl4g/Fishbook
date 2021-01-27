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
import { environment } from 'src/environments/environment';
import * as fromAuthSelectors from '../../auth/store/auth.selectors';
import * as fromAuthState from '../../auth/store/auth.state';
import { MyProfile } from '../models/my-profile.model';
import { MyProfileService } from '../services/my-profile.service';
import * as fromActions from '../store/my-profile.actions';
import * as fromEffects from '../store/my-profile.effects';
import * as fromReducers from '../store/my-profile.reducer';

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
  let service: MyProfileService;
  let effects: fromEffects.MyProfileEffects;
  let store: MockStore;
  let userFromStore: MemoizedSelector<fromAuthState.AuthState, User>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        RouterTestingModule,
        StoreModule.forRoot(fromReducers.myProfileReducer),
      ],
      providers: [
        MyProfileService,
        fromEffects.MyProfileEffects,
        provideMockStore({}),
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.inject(MyProfileService);
    effects = TestBed.inject(fromEffects.MyProfileEffects);
    store = TestBed.inject(MockStore);

    const user: User = {
      email: 'mail@mail.mail',
      photoUrl: 'photoUrl',
      uid: 'uid_of_john_doe',
      displayName: 'John Doe',
    };
    userFromStore = store.overrideSelector(fromAuthSelectors.getUser, user);
  });

  describe('get$', () => {
    it('should invoke get success', () => {
      const myProfile: MyProfile = { name: 'john_doe' };
      spyOn(service, 'get').and.returnValue(of(myProfile));

      actions$.stream = hot('-a', { a: new fromActions.Get() });
      const payload = { myProfile: myProfile };
      const expected = cold('-b', {
        b: new fromActions.GetSuccess(payload),
      });

      expect(effects.get$).toBeObservable(expected);
    });

    it('should invoke get failed', () => {
      const errorMessage = 'HTTP 500';
      spyOn(service, 'get').and.returnValue(throwError(errorMessage));

      actions$.stream = hot('-a', { a: new fromActions.Get() });
      const expected = cold('-b', {
        b: new fromActions.GetFailed({ error: errorMessage }),
      });

      expect(effects.get$).toBeObservable(expected);
    });
  });
});
