import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  public register(
    email: string,
    password: string
  ): Observable<firebase.default.auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  public login(
    email: string,
    password: string
  ): Observable<firebase.default.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  public logout(): Observable<void> {
    return from(this.afAuth.signOut());
  }

  public getAuthState(): Observable<firebase.default.User> {
    return this.afAuth.authState;
  }

  public getCurrentUser(): Promise<firebase.default.User> {
    return this.afAuth.currentUser;
  }
}
