import { GeneratePasswordServiceModule } from '@/auth/infrastructure/services';
import { UserServiceAdapter } from '@/user/domain';
import { Module } from '@nestjs/common';

import { UserService } from './user.service';

@Module({
	imports: [GeneratePasswordServiceModule],
	providers: [
		{
			provide: UserServiceAdapter,
			useClass: UserService
		}
	],
	exports: [UserServiceAdapter]
})
export class UserServiceModule {}
