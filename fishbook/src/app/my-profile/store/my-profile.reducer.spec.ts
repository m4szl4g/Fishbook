import * as fromReducer from './my-profile.reducer';
import * as fromActions from './my-profile.actions';
import { myProfileInitialState } from './my-profile.state';
import { MyProfile } from '../../shared/models/my-profile.model';

describe('My Profile reducers', () => {
  it('no action should return default state', () => {
    const action = {} as any;
    const state = fromReducer.myProfileReducer(myProfileInitialState, action);

    expect(state).toBe(myProfileInitialState);
  });

  describe('Get reducers', () => {
    it('Get - Loading property is true', () => {
      const action = new fromActions.Get();

      const state = fromReducer.myProfileReducer(myProfileInitialState, action);

      expect(true).toBe(state.isLoading);
    });

    it('Get Failed - error message set', () => {
      const errorMessage: string = 'THis is an error';
      const action = new fromActions.GetFailed({ error: errorMessage });

      const state = fromReducer.myProfileReducer(myProfileInitialState, action);

      expect(false).toBe(state.isLoading);
      expect(errorMessage).toBe(state.error);
    });

    it('Get Success - set my profile data', () => {
      const myProfile: MyProfile = { name: 'john doe' };
      const action = new fromActions.GetSuccess({ myProfile: myProfile });

      const state = fromReducer.myProfileReducer(myProfileInitialState, action);

      expect(false).toBe(state.isLoading);
      expect(myProfile).toBe(state.myProfile);
    });
  });
});
