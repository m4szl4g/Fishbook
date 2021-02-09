import { Catch } from 'src/app/shared/models/catch.model';

export interface CatchState {
  isLoading: boolean;
  error: string;
  catches: Catch[];
}

export const catchInitialState: CatchState = {
  isLoading: false,
  error: null,
  catches: [],
};
