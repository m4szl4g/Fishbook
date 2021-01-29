import { MyProfile } from '../../shared/models/my-profile.model';

export interface MyProfileState {
  myProfile: MyProfile | null;
  isLoading: boolean;
  error: string;
  hasProfile: boolean;
}

export const myProfileInitialState: MyProfileState = {
  myProfile: null,
  isLoading: true,
  error: null,
  hasProfile: true,
};
