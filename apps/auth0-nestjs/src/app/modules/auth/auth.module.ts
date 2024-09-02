import { JwtConfigModule } from '@core/infrastructure/config/jwt';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.stragegy';
import { AuthUseCaseProxyModule } from './infrastructure/usecase-proxy/auth-usecase-proxy.module';

@Module({
	controllers: [AuthController],
	imports: [
		JwtConfigModule,
		PassportModule.register({ defaultStrategy: ['jwt'] }),
		AuthUseCaseProxyModule
	],
	providers: [JwtStrategy],
	exports: []
})
export class AuthModule {}
