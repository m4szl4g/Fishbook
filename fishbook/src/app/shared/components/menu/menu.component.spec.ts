import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import { of } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import * as fromActions from '../../../core/store';
import { SharedModule } from '../../shared.module';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromActions.reducers),
        SharedModule,
        RouterTestingModule,
      ],
      declarations: [MenuComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Logout text is visible', () => {
    const user: User = {
      email: 'john@doe.com',
      photoUrl: '...',
      uid: 'idJohn',
      displayName: 'John',
    };
    component.user$ = of(user);
    fixture.detectChanges(); //triggers change detection -> observable will emit values

    let nameSpan: DebugElement = fixture.debugElement.query(
      By.css('.toolbar__logout')
    );

    expect(nameSpan.nativeElement.innerHTML).toEqual('Logout');
  });
});
