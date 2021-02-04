import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/core/store';

export const getMyProfileState = (state: AppState) => state.myProfile;

export const getMyProfile = createSelector(
  getMyProfileState,
  (myProf) => myProf.myProfile
);

export const getError = createSelector(
  getMyProfileState,
  (myProf) => myProf.error
);

export const getEquipments = createSelector(
  getMyProfileState,
  (myProf) => myProf.equipments
);
