import { ManagementClient, ManagementClientOptionsWithClientCredentials } from 'auth0';

import { UserServiceAdapter } from '@/user/domain';
import { CreateUser, UserProfile } from '@auth0-angular-nestjs/domain-shared';
import { jwtConfig } from '@core/infrastructure/config/environment/jwt';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService implements UserServiceAdapter {
	private readonly logger = new Logger(UserService.name);
	private readonly management: ManagementClient;
	private readonly connection = jwtConfig.dbName;

	constructor() {
		const managementOptions: ManagementClientOptionsWithClientCredentials = {
			domain: jwtConfig.domain,
			clientId: jwtConfig.clientId,
			clientSecret: jwtConfig.clientSecret
		};

		this.management = new ManagementClient(managementOptions);
	}

	async create(user: CreateUser): Promise<UserProfile> {
		const { data } = await this.management.users.create({ ...user, connection: this.connection });
		this.logger.log({ message: 'User created successfully' });
		return { ...data, id: data.user_id };
	}

	async getAllUsers(): Promise<unknown> {
		const { data } = await this.management.users.getAll();
		return data;
	}
}
