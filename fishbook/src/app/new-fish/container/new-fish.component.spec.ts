import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Equipment } from 'src/app/shared/models/equipment.model';
import * as fromReducers from '../../core/store';
import { NewFishComponent } from './new-fish.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import * as fromCatchActions from '../../core/store/catch/catch.actions';
import { Catch } from 'src/app/shared/models/catch.model';

describe('NewFishComponent tests', () => {
  let component: NewFishComponent;
  let fixture: ComponentFixture<NewFishComponent>;
  let storeMock = {
    dispatch: jasmine.createSpy('dispatch'),
    select: jasmine.createSpy('select'),
  };

  beforeEach(() => {
    const initialState = {};
    TestBed.configureTestingModule({
      declarations: [NewFishComponent],
      providers: [{ provide: Store, useValue: storeMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(NewFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Fish input is required', () => {
    expect(component.fish.getError('required')).toBeTruthy;
  });

  it('Details input is required', () => {
    expect(component.details.getError('required')).toBeTruthy;
  });

  it('Equipment should be set', () => {
    expect(component.equipment.getError('required')).toBeTruthy;
  });

  it('File should be selected', () => {
    expect(component.fileToUpload.getError('required')).toBeTruthy;
  });

  it('Location should be set', () => {
    expect(component.where.getError('required')).toBeTruthy;
  });

  it('All fields are set, UploadFile action is called', () => {
    const dummyFile: File = new File([''], 'filename', { type: 'text/html' });
    component.fileToUpload.setValue(dummyFile);
    component.fish.setValue('pike');
    component.where.setValue('Danube');
    component.details.setValue('I caught a big pike!');
    const equipment: Equipment = {
      rod: 'Shimano BM',
      reel: 'Shimano Alivio',
      line: 'Test line',
      name: 'Pike Hunter',
    };
    component.equipment.setValue(equipment);
    component.submit();

    const newCatch: Catch = {
      details: component.details.value,
      fishType: component.details.value,
      location: component.where.value,
      reel: equipment.reel,
      rod: equipment.rod,
    };

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      new fromCatchActions.UploadFile(dummyFile, newCatch)
    );
  });
});
