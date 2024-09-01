import { Module } from '@nestjs/common';
import { CREATE_USER_USECASE_PROXY } from './token/user.use-case-proxy';
import { CreateUserUseCases } from '../../use-cases/create-user/create-user.use-cases';
import { UserServiceAdapter } from '../../domain';
import { UserService } from '../services/user.service';

@Module({
	imports: [],
	providers: [
		{
			provide: UserServiceAdapter,
			useClass: UserService
		},
		{
			provide: CREATE_USER_USECASE_PROXY,
			useClass: CreateUserUseCases
		}
	],
	exports: [CREATE_USER_USECASE_PROXY]
})
export class UserCaseProxyModule {}
