import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import * as fromReducers from '../../../core/store';
import { NewEquipmentComponent } from './new-equipment.component';

describe('NewEquipmentComponent tests', () => {
  let component: NewEquipmentComponent;
  let fixture: ComponentFixture<NewEquipmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewEquipmentComponent],
      imports: [StoreModule.forRoot(fromReducers.reducers)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.newEquipmentForm.valid).toBeFalsy();
  });

  it('reel field is required', () => {
    const reel = component.newEquipmentForm.controls['reel'];
    expect(reel.valid).toBeFalsy();

    reel.setValue('');
    expect(reel.hasError('required')).toBeTruthy();
  });

  it('reel field should is filled and valid', () => {
    const reel = component.newEquipmentForm.controls['reel'];
    expect(reel.valid).toBeFalsy();

    reel.setValue('Shimano Ultegra');
    expect(reel.valid).toBeTruthy();
  });

  it('reel field is too long error', () => {
    const reel = component.newEquipmentForm.controls['reel'];
    expect(reel.valid).toBeFalsy();

    reel.setValue('Shimano Ultegra 123456789101112');
    expect(reel.hasError('maxlength')).toBeTruthy();
  });

  it('rod field is required', () => {
    const rod = component.newEquipmentForm.controls['rod'];
    expect(rod.valid).toBeFalsy();

    rod.setValue('');
    expect(rod.hasError('required')).toBeTruthy();
  });

  it('rod field is too long error', () => {
    let rod = component.newEquipmentForm.controls['rod'];
    expect(rod.valid).toBeFalsy();

    rod.setValue('Shimano BeastMaster 12345678910');
    expect(rod.hasError('maxlength')).toBeTruthy();
  });

  it('line field is required', () => {
    const line = component.newEquipmentForm.controls['line'];
    expect(line.valid).toBeFalsy();

    line.setValue('');
    expect(line.hasError('required')).toBeTruthy();
  });

  it('line field is too long error', () => {
    let line = component.newEquipmentForm.controls['line'];
    expect(line.valid).toBeFalsy();

    line.setValue('Spro LineMaster0 123456789101112');
    expect(line.hasError('maxlength')).toBeTruthy();
  });

  it('name field is required', () => {
    const name = component.newEquipmentForm.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue('');
    expect(name.hasError('required')).toBeTruthy();
  });

  it('name field should is filled and valid', () => {
    const name = component.newEquipmentForm.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue('My super stuff');
    expect(name.valid).toBeTruthy();
  });

  it('name field is too long error', () => {
    let name = component.newEquipmentForm.controls['name'];
    expect(name.valid).toBeFalsy();

    name.setValue('My super stuff 123456789101112!!');
    expect(name.hasError('maxlength')).toBeTruthy();
  });

  it('Every field is set, form is valid', () => {
    let name = component.newEquipmentForm.controls['name'];
    name.setValue('My super stuff');

    let rod = component.newEquipmentForm.controls['rod'];
    rod.setValue('Shimano BeastMaster');

    let reel = component.newEquipmentForm.controls['reel'];
    reel.setValue('Shimano Ultegra');

    let line = component.newEquipmentForm.controls['line'];
    line.setValue('Spro Carp 20mm');

    expect(component.newEquipmentForm.valid).toBeTruthy();
  });
});
