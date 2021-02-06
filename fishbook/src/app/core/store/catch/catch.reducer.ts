import { catchInitialState, CatchState } from './catch.state';
import { CatchActionsTypes, CatchActions } from './catch.actions';

export function catchReducer(
  state = catchInitialState,
  action: CatchActions
): CatchState {
  switch (action.type) {
    case CatchActionsTypes.CREATE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CatchActionsTypes.CREATE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CatchActionsTypes.CREATE_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
}
