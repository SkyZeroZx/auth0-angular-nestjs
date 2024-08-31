import { Module } from '@nestjs/common';
import { AuthController } from './infrastructure/controllers/auth.controller';
import { JwtConfigModule } from '../../core/infrastructure/config/jwt';
import { JwtStrategy } from './infrastructure/strategies/jwt.stragegy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  imports: [
    JwtConfigModule,
    PassportModule.register({ defaultStrategy: ['jwt'] }),
  ],
  providers: [JwtStrategy],
  exports: [],
})
export class AuthModule {}
