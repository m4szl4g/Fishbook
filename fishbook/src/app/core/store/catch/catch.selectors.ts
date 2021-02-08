import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/store';

export const getCatchState = (state: AppState) => state.catch;

export const getCatches = createSelector(
  getCatchState,
  (catchState) => catchState.catches
);
