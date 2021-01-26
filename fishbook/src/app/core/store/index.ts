import {
  ActionReducerMap,
  MetaReducer,
  ActionReducer,
  Action,
} from '@ngrx/store';
import * as fromAuth from '../../auth/store/auth.reducer';
import * as fromMyProfile from '../../my-profile/store/my-profile.reducer';
import { AuthState } from '../../auth/store/auth.state';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { MyProfileState } from 'src/app/my-profile/store/my-profile.state';

export interface AppState {
  auth: AuthState;
  myProfile: MyProfileState;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  myProfile: fromMyProfile.myProfileReducer,
  router: routerReducer,
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
