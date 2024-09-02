import { Module } from '@nestjs/common';
import { CREATE_USER_USECASE_PROXY } from './token/user.use-case-proxy';
import { CreateUserUseCases } from '../../usecases/create-user/create-user.usecases';
import { UserServiceModule } from '../services/user-service.module';

@Module({
	imports: [UserServiceModule],
	providers: [
		{
			provide: CREATE_USER_USECASE_PROXY,
			useClass: CreateUserUseCases
		}
	],
	exports: [CREATE_USER_USECASE_PROXY]
})
export class UserCaseProxyModule {}
