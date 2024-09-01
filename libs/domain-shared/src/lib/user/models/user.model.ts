export class UserProfile {
	id: string;
	email: string;
	username: string;
}

export class UserModel extends UserProfile {
	password: string;
}

export type CreateUser = Omit<UserProfile, 'id'>;
