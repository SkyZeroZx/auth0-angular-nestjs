import { CreateUser, UserProfile } from '@auth0-angular-nestjs/domain-shared';

export abstract class UserServiceAdapter {
	abstract create(user: CreateUser): Promise<UserProfile>;
}
