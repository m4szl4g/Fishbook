import { myProfileInitialState, MyProfileState } from './my-profile.state';
import { MyProfileActionTypes, MyProfileAction } from './my-profile.actions';

export function myProfileReducer(
  state = myProfileInitialState,
  action: MyProfileAction
): MyProfileState {
  switch (action.type) {
    case MyProfileActionTypes.GET: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case MyProfileActionTypes.GET_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        myProfile: action.payload.myProfile,
      };
    }

    case MyProfileActionTypes.GET_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }

    case MyProfileActionTypes.CREATE_FAILED: {
      return {
        ...state,
        error: action.payload.error,
        hasProfile: false,
      };
    }

    case MyProfileActionTypes.UPDATE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case MyProfileActionTypes.UPDATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case MyProfileActionTypes.UPDATE_FAILED: {
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
      };
    }

    case MyProfileActionTypes.GET_EQUIPMENT_SUCCESS: {
      return {
        ...state,
        equipments: action.payload,
      };
    }

    default:
      return state;
  }
}
