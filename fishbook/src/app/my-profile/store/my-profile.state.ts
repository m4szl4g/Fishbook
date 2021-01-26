import { MyProfile } from '../models/my-profile.model';

export interface MyProfileState {
  myProfile: MyProfile | null;
  isLoading: boolean;
  error: string;
}

export const myProfileInitialState: MyProfileState = {
  myProfile: null,
  isLoading: true,
  error: null,
};
