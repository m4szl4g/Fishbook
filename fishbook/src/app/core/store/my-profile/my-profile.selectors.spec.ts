import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { MyProfile } from 'src/app/shared/models/my-profile.model';
import * as fromState from '../../../core/store';
import * as fromReducers from './my-profile.reducer';
import * as fromSelectors from './my-profile.selectors';

describe('My Profile Selectors', () => {
  let store: Store<fromState.AppState>;

  const johnDoeProfile: MyProfile = {
    firstName: 'john',
    lastName: 'doe',
    aboutMe: '',
    email: 'john@doe.com',
  };

  let currentState = {
    myProfile: johnDoeProfile,
    error: 'error',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({ project: fromReducers.myProfileReducer }),
      ],
    });

    store = TestBed.get(Store);
  });

  describe('Get selectors', () => {
    it('should return myprofile', () => {
      expect(fromSelectors.getMyProfile.projector(currentState)).toEqual(
        johnDoeProfile
      );
    });

    it('error should be set', () => {
      expect(fromSelectors.getError.projector(currentState)).toEqual('error');
    });
  });
});
