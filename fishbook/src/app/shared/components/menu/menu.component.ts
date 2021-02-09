import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/auth/models/user.model';
import { AppState } from 'src/app/core/store';
import * as authSelectors from '../../../core/store/auth//auth.selectors';
import * as authActions from '../../../core/store/auth/auth.actions';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass'],
})
export class MenuComponent implements OnInit {
  public user$: Observable<User>;

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.user$ = this.store.pipe(select(authSelectors.getUser));
  }

  public logout(): void {
    this.store.dispatch(new authActions.Logout());
  }
}
