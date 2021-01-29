import { User } from 'src/app/auth/models/user.model';
import { MyProfile } from '../../shared/models/my-profile.model';
import * as fromMyProfileActions from './my-profile.actions';

describe('My Profile Actions', () => {
  describe('Get actions', () => {
    it('Invoke Get action type', () => {
      const action = new fromMyProfileActions.Get();

      expect({ ...action }).toEqual({
        type: fromMyProfileActions.MyProfileActionTypes.GET,
      });
    });

    it('Invoke Get Success action type with profile info', () => {
      const myProfile: MyProfile = {
        name: 'john_doe',
      };
      const myProfilePayload = { myProfile: myProfile };
      const action = new fromMyProfileActions.GetSuccess(myProfilePayload);

      expect({ ...action }).toEqual({
        type: fromMyProfileActions.MyProfileActionTypes.GET_SUCCESS,
        payload: myProfilePayload,
      });
    });

    it('Invoke Get Failed with error message', () => {
      const errorMessage: string = 'This is an error....';
      const errorPayload = { error: errorMessage };
      const action = new fromMyProfileActions.GetFailed(errorPayload);

      expect({ ...action }).toEqual({
        type: fromMyProfileActions.MyProfileActionTypes.GET_FAILED,
        payload: errorPayload,
      });
    });
  });
  describe('Create actions', () => {
    it('Invoke Create action type', () => {
      const user: User = {
        uid: 'ID_john_doe',
        email: 'test@test.test',
        photoUrl: 'url_photo_john',
      };
      const userPayload = { user: user };
      const action = new fromMyProfileActions.Create(userPayload);

      expect({ ...action }).toEqual({
        type: fromMyProfileActions.MyProfileActionTypes.CREATE,
        payload: userPayload,
      });
    });

    it('Invoke Create success action type', () => {
      const user: User = {
        uid: 'ID_john_doe',
        email: 'test@test.test',
        photoUrl: 'url_photo_john',
      };

      const action = new fromMyProfileActions.CreateSuccess();

      expect({ ...action }).toEqual({
        type: fromMyProfileActions.MyProfileActionTypes.CREATE_SUCCESS,
      });
    });

    it('Invoke Create Failed with error message', () => {
      const errorMessage: string = 'This is an error....';
      const errorPayload = { error: errorMessage };
      const action = new fromMyProfileActions.CreateFailed(errorPayload);

      expect({ ...action }).toEqual({
        type: fromMyProfileActions.MyProfileActionTypes.CREATE_FAILED,
        payload: errorPayload,
      });
    });
  });
});
