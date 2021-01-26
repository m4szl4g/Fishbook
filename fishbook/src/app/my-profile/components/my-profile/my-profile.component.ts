import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as myProfileActions from '../../store/my-profile.actions';
import * as myProfileSelectors from '../../store/my-profile.selectors';
import { Observable } from 'rxjs';
import { MyProfile } from '../../models/my-profile.model';
import { MyProfileService } from '../../services/my-profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.sass'],
})
export class MyProfileComponent implements OnInit {
  public myProfile$: Observable<MyProfile>;

  constructor(
    private myProfileService: MyProfileService,
    private store: Store
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new myProfileActions.Get());
    this.myProfile$ = this.store.select(myProfileSelectors.getMyProfile);
  }
}
