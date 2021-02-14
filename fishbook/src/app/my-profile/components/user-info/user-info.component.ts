import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MyProfile } from 'src/app/shared/models/my-profile.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.sass'],
})
export class UserInfoComponent implements OnInit {
  public myProfileForm: FormGroup;

  @Input()
  public myProfile: MyProfile;

  @Output()
  public updateProfile: EventEmitter<MyProfile> = new EventEmitter();

  constructor() {}

  public ngOnInit(): void {
    this.myProfileForm = new FormGroup({
      firstName: new FormControl(this.myProfile.firstName),
      lastName: new FormControl(this.myProfile.lastName),
      aboutMe: new FormControl(this.myProfile.aboutMe),
    });
  }

  public update(): void {
    const data: MyProfile = this.myProfileForm.value as MyProfile;
    this.updateProfile.emit(data);
  }
}
