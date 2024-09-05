import { CreateUserUseCases, GetAllUsersUseCases, UpdateUserUseCases } from '@/user/usecases';
import { Body, Controller, Get, Inject, Param, Patch, Post } from '@nestjs/common';

import {
	CREATE_USER_USECASE_PROXY,
	GET_ALL_USER_USECASE_PROXY,
	UPDATE_USER_USECASE_PROXY
} from '../usecase-proxy/token';
import { CreateUserDto, UpdateUserDto } from './dto';
import { AuthJWT } from '@/auth';

@Controller('users')
@AuthJWT()
export class UserController {
	constructor(
		@Inject(CREATE_USER_USECASE_PROXY)
		private readonly createUserUseCases: CreateUserUseCases,
		@Inject(GET_ALL_USER_USECASE_PROXY)
		private readonly getAllUsersUseCases: GetAllUsersUseCases,
		@Inject(UPDATE_USER_USECASE_PROXY)
		private readonly updateUserUseCases: UpdateUserUseCases
	) {}

	@Post()
	createUser(@Body() createUser: CreateUserDto) {
		return this.createUserUseCases.execute(createUser);
	}

	@Get()
	getAllUsers() {
		return this.getAllUsersUseCases.execute();
	}

	@Patch(':email')
	updateUser(@Body() updateUser: UpdateUserDto, @Param('email') email: string) {
		return this.updateUserUseCases.execute(email, updateUser);
	}
}
