import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import * as actions from '../../../core/store/auth/auth.actions';
import { getError } from '../../../core/store/auth/auth.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppState } from 'src/app/core/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  error$: Observable<string | null>;

  constructor(private store: Store<AppState>) {}

  public ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.error$ = this.store.pipe(
      select(getError),
      map((error: any) => {
        if (error) {
          if (error.code === 'auth/weak-password') {
            return error.message;
          } else if (error.code === 'auth/email-already-in-use') {
            return 'User with this email address already exist';
          }
        } else {
          return null;
        }
      })
    );
  }

  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('password');
  }

  public register(): void {
    const email = this.registerForm.value.email;
    const password = this.registerForm.value.password;
    if (this.registerForm.valid) {
      this.store.dispatch(new actions.Register({ email, password }));
    }
  }
}
