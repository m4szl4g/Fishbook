export interface CatchState {
  isLoading: boolean;
  error: string;
}

export const catchInitialState: CatchState = {
  isLoading: false,
  error: null,
};
