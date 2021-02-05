import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FishTileComponent } from './fish-tile.component';

describe('FishTileComponent', () => {
  let component: FishTileComponent;
  let fixture: ComponentFixture<FishTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FishTileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FishTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
