import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {
  Action,
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
} from '@ngrx/store';
import * as fromAuth from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';
import { catchReducer } from './catch/catch.reducer';
import { CatchState } from './catch/catch.state';
import * as fromMyProfile from './my-profile/my-profile.reducer';
import { MyProfileState } from './my-profile/my-profile.state';

export interface AppState {
  auth: AuthState;
  myProfile: MyProfileState;
  router: RouterReducerState;
  catch: CatchState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  myProfile: fromMyProfile.myProfileReducer,
  router: routerReducer,
  catch: catchReducer,
};

export function clearState(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return function (state: AppState | undefined, action: Action): AppState {
    if (action.type === '[Auth] LOGOUT completed') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = [clearState];
