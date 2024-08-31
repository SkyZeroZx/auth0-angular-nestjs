import { Module } from '@nestjs/common';
import { JwtModule as JwtModuleNestJS } from '@nestjs/jwt';

@Module({
  imports: [JwtModuleNestJS],
  exports: [JwtModuleNestJS],
})
export class JwtConfigModule {}
