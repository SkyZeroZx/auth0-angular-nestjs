import { auth0Config, DEFAULT_MODAL_PROVIDER, lottieConfig } from '@/core/config';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { authHttpInterceptorFn, provideAuth0 } from '@auth0/auth0-angular';
import { provideCacheableAnimationLoader, provideLottieOptions } from 'ngx-lottie';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { appRoutes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// See https://github.com/auth0/auth0-angular/blob/main/EXAMPLES.md

export const appConfig: ApplicationConfig = {
	providers: [
		importProvidersFrom([MatSnackBarModule]),
		provideAuth0(auth0Config),
		provideHttpClient(withFetch(), withInterceptors([authHttpInterceptorFn])),
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideLottieOptions(lottieConfig),
		provideCacheableAnimationLoader(),
		provideRouter(appRoutes),
		provideAnimationsAsync(),
		DEFAULT_MODAL_PROVIDER
	]
};
