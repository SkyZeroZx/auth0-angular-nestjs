export class UserProfile {
	id: string;
	email: string;
	name: string;
	family_name: string;
}

export class UserModel extends UserProfile {
	password: string;
}

export type CreateUser = Omit<UserProfile, 'id'>;

export type UpdateUser = Partial<UserProfile>;
