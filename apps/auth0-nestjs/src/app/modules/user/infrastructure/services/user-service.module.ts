import { Module } from '@nestjs/common';
import { UserServiceAdapter } from '../../domain';
import { UserService } from './user.service';

@Module({
	providers: [
		{
			provide: UserServiceAdapter,
			useClass: UserService
		}
	]
})
export class UserServiceModule {}
