import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as actions from '../../../core/store/auth/auth.actions';
import { Observable } from 'rxjs';
import { getError } from '../../../core/store/auth/auth.selectors';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.error$ = this.store.pipe(
      select(getError),
      map((error: any) => {
        if (
          error &&
          (error.code === 'auth/user-not-found' ||
            error.code === 'auth/wrong-password')
        ) {
          return 'Invalid login or password';
        } else {
          return null;
        }
      })
    );
  }

  public get email(): AbstractControl {
    return this.loginForm.get('email');
  }
  public get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  public login(): void {
    if (this.loginForm.valid) {
      this.store.dispatch(new actions.Login(this.loginForm.value));
    }
  }
}
