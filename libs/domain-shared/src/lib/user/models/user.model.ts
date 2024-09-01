export class UserProfile {
	id: number;
	username: string;
	created: Date;
}

export class UserModel extends UserProfile {
	password: string;
}
