import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { AuthJWT } from '../decorators/auth-role.decorator';
import { GetUserContext } from '../decorators/get-user-context.decorator';
import { ResetPasswordUseCases } from '../../usecases/reset-password/reset-password.usecases';
import { RESET_PASSWORD_USECASE_PROXY } from '../usecase-proxy/token/auth.usecase-proxy';

@Controller('auth')
export class AuthController {
	constructor(
		@Inject(RESET_PASSWORD_USECASE_PROXY)
		private readonly resetPasswordUseCases: ResetPasswordUseCases
	) {}

	@Get()
	@AuthJWT()
	getUser() {
		return null;
	}

	@Post('reset-password')
	@AuthJWT()
	resetPassword(@Body() { email }: any) {
		return this.resetPasswordUseCases.execute(email);
	}
}
