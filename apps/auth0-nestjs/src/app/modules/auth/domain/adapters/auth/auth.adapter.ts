export abstract class AuthServiceAdapter {
	abstract resetPassword(email: string): Promise<unknown>;
}
