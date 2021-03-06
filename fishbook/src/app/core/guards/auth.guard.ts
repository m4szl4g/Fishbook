import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  public canActivate(): Observable<boolean> {
    return this.getUser().pipe(
      take(1),
      switchMap((user) => {
        if (!user) {
          this.router.navigateByUrl('/login');
          return of(false);
        }
        return of(true);
      }),
      catchError(() => {
        this.router.navigateByUrl('/login');
        return of(false);
      })
    );
  }

  private getUser(): Observable<firebase.default.User> {
    return this.authService.getAuthState();
  }
}
