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

    case CatchActionsTypes.UPLOAD_FILE: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CatchActionsTypes.UPLOAD_FILE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      };
    }

    case CatchActionsTypes.UPLOAD_FILE_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    }

    case CatchActionsTypes.GET_ALL: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case CatchActionsTypes.GET_ALL_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        catches: action.payload,
      };
    }

    case CatchActionsTypes.GET_ALL_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    }

    default:
      return state;
  }
}
