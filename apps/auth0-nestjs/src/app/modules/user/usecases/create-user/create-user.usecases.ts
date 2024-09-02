import { UserServiceAdapter } from '@/user/domain';
import { CreateUser } from '@auth0-angular-nestjs/domain-shared';
import { Injectable, Logger } from '@nestjs/common';
import { UseCaseProxy } from '@shared/domain/use-case';

@Injectable()
export class CreateUserUseCases implements UseCaseProxy {
	private readonly logger = new Logger(CreateUserUseCases.name);

	constructor(private readonly userService: UserServiceAdapter) {}

	execute(createUser: CreateUser) {
		this.logger.log({ message: 'Creating User' });
		return this.userService.create(createUser);
	}
}
