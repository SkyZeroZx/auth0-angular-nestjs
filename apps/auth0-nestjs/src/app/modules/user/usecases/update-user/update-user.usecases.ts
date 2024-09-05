import { UserServiceAdapter } from '@/user/domain';
import { UpdateUser } from '@auth0-angular-nestjs/domain-shared';
import { Injectable, Logger } from '@nestjs/common';
import { UseCaseProxy } from '@shared/domain/use-case';

@Injectable()
export class UpdateUserUseCases implements UseCaseProxy {
	private readonly logger = new Logger(UpdateUserUseCases.name);
	constructor(private readonly userService: UserServiceAdapter) {}

	execute(email: string, updateUser: UpdateUser) {
		this.logger.log({ message: 'Updating User', data: { updateUser, email } });
		return this.userService.update(email, updateUser);
	}
}
