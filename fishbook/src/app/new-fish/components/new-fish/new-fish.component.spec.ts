import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewFishComponent } from './new-fish.component';

describe('NewFishComponent', () => {
  let component: NewFishComponent;
  let fixture: ComponentFixture<NewFishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewFishComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
