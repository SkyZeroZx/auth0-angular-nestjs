import { AuthConfig } from '@auth0/auth0-angular';
import { environment } from '../../../../environments/environment';

export const auth0Config: AuthConfig = {
	...environment.auth,
	skipRedirectCallback: false,
	cacheLocation: 'localstorage',
	errorPath: '/error',
	authorizationParams: {
		audience: environment.auth.audience,
		redirect_uri: `${window.location.origin}/loading`
	},
	httpInterceptor: {
		...environment.httpInterceptor
	}
};
