import { CreateUserUseCases, DeleteUserUseCases, GetAllUsersUseCases, UpdateUserUseCases } from '@/user/usecases';
import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';

import {
	CREATE_USER_USECASE_PROXY,
	DELETE_USER_USECASE_PROXY,
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
		private readonly updateUserUseCases: UpdateUserUseCases,
		@Inject(DELETE_USER_USECASE_PROXY)
		private readonly deleteUserUseCases: DeleteUserUseCases
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

	@Delete(':email')
	async deleteUser(@Param('email') email: string){
		await this.deleteUserUseCases.execute(email);
	}
}
