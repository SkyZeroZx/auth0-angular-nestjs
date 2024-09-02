import { CreateUserUseCases } from '@/user/usecases';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';

import { CREATE_USER_USECASE_PROXY, GET_ALL_USER_USECASE_PROXY } from '../usecase-proxy/token';
import { CreateUserDto } from './dto';
import { GetAllUsersUseCases } from '../../usecases/get-all-user/get-all-user.usecases';

@Controller('users')
export class UserController {
	constructor(
		@Inject(CREATE_USER_USECASE_PROXY)
		private readonly createUserUseCases: CreateUserUseCases,
		@Inject(GET_ALL_USER_USECASE_PROXY)
		private readonly getAllUsersUseCases: GetAllUsersUseCases
	) {}

	@Post()
	createUser(@Body() createUser: CreateUserDto) {
		return this.createUserUseCases.execute(createUser);
	}

	@Get()
	getAllUsers() {
		return this.getAllUsersUseCases.execute();
	}
}
