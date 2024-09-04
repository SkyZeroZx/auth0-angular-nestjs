import { UserProfile } from '../../user/models/user.model';

export interface UserAuthenticated {
	user: UserProfile;
	token: string;
}

export interface DecodeToken extends UserProfile {
	iat: number;
	exp: number;
}
