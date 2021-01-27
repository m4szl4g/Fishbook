import { StoreModule, Store } from '@ngrx/store';
import { TestBed } from '@angular/core/testing';

import { MyProfile } from '../models/my-profile.model';

import * as fromReducers from './my-profile.reducer';
import * as fromActions from './my-profile.actions';
import * as fromSelectors from './my-profile.selectors';
import * as fromState from '../../core/store';

describe('My Profile Selectors', () => {
  let store: Store<fromState.AppState>;

  const johnDoeProfile: MyProfile = {
    name: 'john_doe',
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
