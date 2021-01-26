import { TestBed } from '@angular/core/testing';
import { MyProfileService } from '../services/my-profile.service';
import { Actions } from '@ngrx/effects';
import { empty, Observable, of, throwError } from 'rxjs';
import * as fromEffects from '../store/my-profile.effects';
import * as fromActions from '../store/my-profile.actions';
import * as fromReducers from '../store/my-profile.reducer';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { hot, cold } from 'jasmine-marbles';
import { StoreModule } from '@ngrx/store';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { MyProfile } from '../models/my-profile.model';

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
        { provide: Actions, useFactory: getActions },
      ],
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(MyProfileService);
    effects = TestBed.get(fromEffects.MyProfileEffects);
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
