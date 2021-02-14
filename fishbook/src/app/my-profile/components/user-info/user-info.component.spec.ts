import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { MyProfile } from 'src/app/shared/models/my-profile.model';
import * as fromReducers from '../../../core/store';
import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent tests', () => {
  let component: UserInfoComponent;
  let fixture: ComponentFixture<UserInfoComponent>;
  const myProfile: MyProfile = {
    aboutMe: 'I love fishing',
    email: 'john@doe.com',
    firstName: 'john',
    lastName: 'doe',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserInfoComponent],
      imports: [StoreModule.forRoot(fromReducers.reducers)],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoComponent);
    component = fixture.componentInstance;

    component.myProfile = myProfile;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit with correct profile data', () => {
    spyOn(component.updateProfile, 'emit').and.callThrough();
    component.update();

    expect(component.updateProfile.emit).toHaveBeenCalledOnceWith({
      firstName: myProfile.firstName,
      lastName: myProfile.lastName,
      aboutMe: myProfile.aboutMe,
    });
  });
});
