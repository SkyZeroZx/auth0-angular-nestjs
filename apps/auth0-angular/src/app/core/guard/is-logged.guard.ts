import { AuthService } from '@/services/auth';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, take } from 'rxjs';

export function isLogged() {
	const authService = inject(AuthService);
	const router = inject(Router);

	return authService.user$.pipe(
		take(1),
		map((user) => {
			if (user) {
				router.navigateByUrl('/loading');

				return false;
			}

			return true;
		})
	);
}
