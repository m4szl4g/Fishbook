import { authInitialState, AuthState } from './auth.state';
import { AuthAction, AuthActionTypes } from './auth.actions';

export function authReducer(
  state = authInitialState,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        user: action.payload.user,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      };
    }

    case AuthActionTypes.LOGIN_FAILED: {
      return Object.assign({}, state, {
        user: null,
        isLoading: false,
        isLoggedIn: false,
      });
    }

    case AuthActionTypes.AUTH_ERROR: {
      return Object.assign({}, state, {
        error: action.payload.error,
      });
    }

    case AuthActionTypes.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        user: null,
        isLoading: false,
        isLoggedIn: false,
      });
    }

    default:
      return state;
  }
}
