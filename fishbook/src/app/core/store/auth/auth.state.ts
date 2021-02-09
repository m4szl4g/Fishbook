import { User } from 'src/app/auth/models/user.model';

export interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: any;
}

export const authInitialState: AuthState = {
  user: null,
  isLoggedIn: false,
  isLoading: true,
  error: null,
};
