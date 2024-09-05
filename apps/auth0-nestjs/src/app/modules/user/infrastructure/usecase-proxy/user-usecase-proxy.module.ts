import { Module } from '@nestjs/common';

import { UpdateUserUseCases } from '../../usecases';
import { CreateUserUseCases } from '../../usecases/create-user/create-user.usecases';
import { GetAllUsersUseCases } from '../../usecases/get-all-user/get-all-user.usecases';
import { UserServiceModule } from '../services/user-service.module';
import {
	CREATE_USER_USECASE_PROXY,
	GET_ALL_USER_USECASE_PROXY,
	UPDATE_USER_USECASE_PROXY
} from './token/user.use-case-proxy';

@Module({
	imports: [UserServiceModule],
	providers: [
		{
			provide: CREATE_USER_USECASE_PROXY,
			useClass: CreateUserUseCases
		},
		{
			provide: GET_ALL_USER_USECASE_PROXY,
			useClass: GetAllUsersUseCases
		},
		{
			provide: UPDATE_USER_USECASE_PROXY,
			useClass: UpdateUserUseCases
		}
	],
	exports: [CREATE_USER_USECASE_PROXY, UPDATE_USER_USECASE_PROXY, GET_ALL_USER_USECASE_PROXY]
})
export class UserCaseProxyModule {}
