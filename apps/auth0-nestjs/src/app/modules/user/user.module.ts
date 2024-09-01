import { Module } from '@nestjs/common';
import { UserServiceAdapter } from './domain';
import { UserController } from './infrastructure/controllers/user.controller';
import { UserService } from './infrastructure/services/user.service';
import { UserCaseProxyModule } from './infrastructure/use-case-proxy/user-user-case-proxy.module';

@Module({
	controllers: [UserController],
	imports: [UserCaseProxyModule],
	providers: [],
	exports: []
})
export class UserModule {}
