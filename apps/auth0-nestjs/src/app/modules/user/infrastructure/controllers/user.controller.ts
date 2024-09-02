import { CREATE_USER_USECASE_PROXY } from '@/user/infrastructure/use-case-proxy/token';
import { CreateUserUseCases } from '@/user/usecases';
import { Body, Controller, Get, Inject } from '@nestjs/common';

import { CreateUserDto } from './dto';

@Controller('users')
export class UserController {
	constructor(
		@Inject(CREATE_USER_USECASE_PROXY)
		private readonly createUserUseCases: CreateUserUseCases
	) {}

	@Get()
	getUsers(@Body() createUser: CreateUserDto) {
		return this.createUserUseCases.execute(createUser);
	}
}
