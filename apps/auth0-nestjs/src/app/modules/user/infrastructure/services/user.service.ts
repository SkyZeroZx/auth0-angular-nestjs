import { ManagementClient } from 'auth0';

import { GeneratePasswordServiceAdapter } from '@/auth/domain/adapters/generate-password';
import { UserServiceAdapter } from '@/user/domain';
import { CreateUser, UpdateUser, UserProfile } from '@auth0-angular-nestjs/domain-shared';
import { jwtConfig } from '@core/infrastructure/config/environment/jwt';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UserService implements UserServiceAdapter {
	private readonly logger = new Logger(UserService.name);

	private readonly management = new ManagementClient({
		domain: jwtConfig.domain,
		clientId: jwtConfig.clientId,
		clientSecret: jwtConfig.clientSecret
	});

	private readonly connection = jwtConfig.dbName;

	constructor(private readonly generatePasswordService: GeneratePasswordServiceAdapter) {}

	async create(user: CreateUser): Promise<UserProfile> {
		const password = this.generatePasswordService.generatePassword();

		const { data } = await this.management.users.create({
			...user,
			connection: this.connection,
			password
		});
		this.logger.log({ message: 'User created successfully' });
		return { ...data, id: data.user_id };
	}

	async getAllUsers(): Promise<unknown> {
		const { data } = await this.management.users.getAll();
		return data;
	}

	async update(email: string, updateUser: UpdateUser): Promise<UserProfile> {
		const { id } = await this.getUserByEmail(email);

		const { data: userProfile } = await this.management.users.update({ id }, { ...updateUser });
		this.logger.log({ message: 'User updated successfully' });

		return { ...userProfile, id: userProfile.user_id };
	}

	private async getUserByEmail(email: string): Promise<UserProfile> {
		const { data } = await this.management.usersByEmail.getByEmail({ email });

		const user = data.at(0);

		return { ...user, id: user.user_id };
	}

	async delete(email: string): Promise<void> {
		this.logger.log({ message: 'Deleting User', data: email });

		const { id } = await this.getUserByEmail(email);

		await this.management.users.delete({ id });
	}
}
