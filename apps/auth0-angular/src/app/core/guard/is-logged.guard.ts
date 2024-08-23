import { AuthService } from '@/services/auth';
import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { map, take } from 'rxjs';

export function isLogged(): CanActivateFn {
  const authService = inject(AuthService);
  return () =>
    authService.user$.pipe(
      take(1),
      map((user) => {
        if (user) {
          this.router.navigateByUrl('/loading');

          return false;
        }

        return true;
      })
    );
}
