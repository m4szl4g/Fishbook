import { TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';
import { Catch } from 'src/app/shared/models/catch.model';
import * as fromState from '../../store/index';
import { CatchState } from './catch.state';
import * as fromCatchSelector from '../../store/catch/catch.selectors';

describe('Catch selector tests', () => {
  let store: Store<fromState.AppState>;

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

  let currentState: CatchState = {
    catches: catches,
    error: null,
    isLoading: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({ project: fromState.reducers.catch })],
    });

    store = TestBed.get(Store);
  });

  it('Get catches', () => {
    expect(fromCatchSelector.getCatches.projector(currentState)).toEqual(
      catches
    );
  });
});
