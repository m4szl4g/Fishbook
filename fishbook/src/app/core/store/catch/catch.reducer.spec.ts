import * as fromReducer from '../../store/catch/catch.reducer';
import * as fromActions from '../../store/catch/catch.actions';
import { catchInitialState } from './catch.state';
import { Catch } from 'src/app/shared/models/catch.model';

describe('Catch reducer tests', () => {
  it('no action should return default state', () => {
    const action = {} as any;
    const state = fromReducer.catchReducer(catchInitialState, action);

    expect(state).toBe(catchInitialState);
  });

  describe('Get reducers', () => {
    it('Get All- Loading property is true', () => {
      const action = new fromActions.GetAll();

      const state = fromReducer.catchReducer(catchInitialState, action);

      expect(true).toBe(state.isLoading);
    });

    it('Get All Failed - error message set', () => {
      const errorMessage: string = 'THis is an error';
      const action = new fromActions.GetAllFailed(errorMessage);

      const state = fromReducer.catchReducer(catchInitialState, action);

      expect(false).toBe(state.isLoading);
      expect(errorMessage).toEqual(state.error);
    });

    it('Get All Success - set my profile data', () => {
      const catches: Catch[] = [
        {
          details: 'I caught a big fish',
          fishType: 'pike',
          location: 'Danube',
          reel: 'Shimano U',
          rod: 'Shimano BM',
          userName: 'johndoe',
        },
        {
          details: 'I caught a big carp',
          fishType: 'carp',
          location: 'Tisza',
          reel: 'Spro ProCarp',
          rod: 'RodRod',
          userName: 'janedoe',
        },
      ];
      const action = new fromActions.GetAllSuccess(catches);

      const state = fromReducer.catchReducer(catchInitialState, action);

      expect(false).toBe(state.isLoading);
      expect(catches).toEqual(state.catches);
    });
  });

  describe('Upload reducers', () => {
    it('Upload- Loading property is true', () => {
      const dummyFile: File = new File([''], 'filename', { type: 'text/html' });
      const newCatch: Catch = {
        details: 'I caught a big fish',
        fishType: 'pike',
        location: 'Danube',
        reel: 'Shimano U',
        rod: 'Shimano BM',
        userName: 'johndoe',
      };

      const action = new fromActions.UploadFile(dummyFile, newCatch);
      const state = fromReducer.catchReducer(catchInitialState, action);

      expect(true).toBe(state.isLoading);
    });

    it('Upload Success- Loading property is false', () => {
      const action = new fromActions.UploadFileSuccess();
      const state = fromReducer.catchReducer(catchInitialState, action);

      expect(false).toBe(state.isLoading);
    });

    it('Upload Failed- Loading property is false and set error message', () => {
      const errorMessage = 'Error!';
      const action = new fromActions.UploadFileFailed(errorMessage);
      const state = fromReducer.catchReducer(catchInitialState, action);

      expect(false).toBe(state.isLoading);
      expect(errorMessage).toBe(state.error);
    });
  });

  describe('Create reducers', () => {
    it('Create- Loading property is true', () => {
      const newCatch: Catch = {
        details: 'I caught a big fish',
        fishType: 'pike',
        location: 'Danube',
        reel: 'Shimano U',
        rod: 'Shimano BM',
        userName: 'johndoe',
      };

      const action = new fromActions.Create(newCatch);
      const state = fromReducer.catchReducer(catchInitialState, action);

      expect(true).toBe(state.isLoading);
    });

    it('Create Failed- Loading property is false and set error message', () => {
      const errorMessage = 'Error!';
      const action = new fromActions.CreateFailed(errorMessage);
      const state = fromReducer.catchReducer(catchInitialState, action);

      expect(false).toBe(state.isLoading);
      expect(errorMessage).toBe(state.error);
    });

    it('Create Success- Loading property is false', () => {
      const action = new fromActions.CreateSuccess();
      const state = fromReducer.catchReducer(catchInitialState, action);

      expect(false).toBe(state.isLoading);
    });
  });
});
