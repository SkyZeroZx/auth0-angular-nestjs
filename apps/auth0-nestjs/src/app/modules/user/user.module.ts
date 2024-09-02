import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserCaseProxyModule } from './infrastructure/usecase-proxy/user-usecase-proxy.module';

@Module({
	controllers: [UserController],
	imports: [UserCaseProxyModule],
	providers: [],
	exports: []
})
export class UserModule {}
