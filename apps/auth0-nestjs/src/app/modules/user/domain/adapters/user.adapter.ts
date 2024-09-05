import { CreateUser, UpdateUser, UserProfile } from '@auth0-angular-nestjs/domain-shared';

export abstract class UserServiceAdapter {
	abstract create(user: CreateUser): Promise<UserProfile>;
	abstract getAllUsers(): Promise<unknown>;
	abstract update(email: string, updateUser: UpdateUser): Promise<UserProfile>;
}
