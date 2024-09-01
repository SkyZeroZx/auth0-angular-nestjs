import { ManagementClient, ManagementClientOptionsWithClientCredentials } from 'auth0';

import { jwtConfig } from '@core/infrastructure/config/environment/jwt';
import { Injectable, Logger } from '@nestjs/common';
import { AuthServiceAdapter } from '@shared/domain/adapters/auth';

@Injectable()
export class Auth0Service implements AuthServiceAdapter {
	private readonly logger = new Logger(Auth0Service.name);
	private readonly management: ManagementClient;

	private readonly connectionId = jwtConfig.dbConnectId;

	constructor() {
		const managementOptions: ManagementClientOptionsWithClientCredentials = {
			domain: jwtConfig.domain,
			clientId: jwtConfig.clientId,
			clientSecret: jwtConfig.clientSecret
		};

		this.management = new ManagementClient(managementOptions);
	}

	resetPassword(email: string): Promise<unknown> {
		this.logger.log({ message: 'Reset Password' }, { data: email });

		return this.management.tickets.changePassword({ email, connection_id: this.connectionId });
	}
}
