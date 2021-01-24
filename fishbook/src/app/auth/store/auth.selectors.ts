import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/store';

export const getAuthState = (state: AppState) => state.auth;

export const getUser = createSelector(getAuthState, (auth) => auth.user);

export const getIsLoggedIn = createSelector(
  getAuthState,
  (auth) => auth.isLoggedIn
);

export const getIsLoading = createSelector(
  getAuthState,
  (auth) => auth.isLoading
);

export const getError = createSelector(getAuthState, (auth) => auth.error);
