import { Injectable, Logger } from '@nestjs/common';
import { UseCaseProxy } from '../../../../shared/domain/use-case';
import { AuthServiceAdapter } from '../../domain/adapters/auth';

@Injectable()
export class ResetPasswordUseCases implements UseCaseProxy {
	private readonly logger = new Logger(ResetPasswordUseCases.name);

	constructor(private readonly authService: AuthServiceAdapter) {}

	execute(email: string) {
		this.logger.log({ message: 'Reset Password User', data: email });
		return this.authService.resetPassword(email);
	}
}
