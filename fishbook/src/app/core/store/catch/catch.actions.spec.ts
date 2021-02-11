import { Catch } from 'src/app/shared/models/catch.model';
import * as fromActions from '../../store/catch/catch.actions';

describe('Catch Actions', () => {
  describe('Get actions', () => {
    it('Invoke Get All action type', () => {
      const action = new fromActions.GetAll();

      expect({ ...action }).toEqual({
        type: fromActions.CatchActionsTypes.GET_ALL,
      });
    });

    it('Invoke Get All Success action type', () => {
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

      expect({ ...action }).toEqual({
        type: fromActions.CatchActionsTypes.GET_ALL_SUCCESS,
        payload: catches,
      });
    });

    it('Invoke Get All Failed action type', () => {
      const action = new fromActions.GetAllFailed('error');

      expect({ ...action }).toEqual({
        type: fromActions.CatchActionsTypes.GET_ALL_FAILED,
        error: 'error',
      });
    });
  });

  describe('Upload actions', () => {
    it('Invoke Upload File action type', () => {
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

      expect({ ...action }).toEqual({
        type: fromActions.CatchActionsTypes.UPLOAD_FILE,
        file: dummyFile,
        payload: newCatch,
      });
    });

    it('Invoke Upload File Success action type', () => {
      const action = new fromActions.UploadFileSuccess();

      expect({ ...action }).toEqual({
        type: fromActions.CatchActionsTypes.UPLOAD_FILE_SUCCESS,
      });
    });

    it('Invoke Upload File Failed action type', () => {
      const action = new fromActions.UploadFileFailed('error');

      expect({ ...action }).toEqual({
        type: fromActions.CatchActionsTypes.UPLOAD_FILE_FAILED,
        payload: 'error',
      });
    });
  });

  describe('Create actions', () => {
    it('Invoke Create action type', () => {
      const newCatch: Catch = {
        details: 'I caught a big fish',
        fishType: 'pike',
        location: 'Danube',
        reel: 'Shimano U',
        rod: 'Shimano BM',
        userName: 'johndoe',
      };
      const action = new fromActions.Create(newCatch);

      expect({ ...action }).toEqual({
        type: fromActions.CatchActionsTypes.CREATE,
        payload: newCatch,
      });
    });

    it('Invoke Create Success action type', () => {
      const action = new fromActions.CreateSuccess();

      expect({ ...action }).toEqual({
        type: fromActions.CatchActionsTypes.CREATE_SUCCESS,
      });
    });

    it('Invoke Create Failed action type', () => {
      const action = new fromActions.CreateFailed('error');

      expect({ ...action }).toEqual({
        type: fromActions.CatchActionsTypes.CREATE_FAILED,
        payload: 'error',
      });
    });
  });
});
