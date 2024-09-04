import { AuthJWT } from '@/auth/infrastructure/decorators';
import { ResetPasswordUseCases } from '@/auth/usecases';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { RESET_PASSWORD_USECASE_PROXY } from '../usecase-proxy/token/auth.usecase-proxy';
import { ResetPasswordDto } from './dto/reset-password.dto';

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
	resetPassword(@Body() { email }: ResetPasswordDto) {
		return this.resetPasswordUseCases.execute(email);
	}
}
