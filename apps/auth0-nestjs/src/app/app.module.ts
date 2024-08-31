import { JwtStrategy } from '@/auth/infrastructure/strategies/jwt.stragegy';
import { AllExceptionFilter } from '@core/infrastructure/filters';
import { HttpLoggingInterceptor } from '@core/infrastructure/interceptors';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { PassportModule } from '@nestjs/passport';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [ AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
   ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggingInterceptor)
      .exclude(
        // exclude to avoid logging in metric or health/documentation
        { path: 'metrics', method: RequestMethod.GET },
        { path: 'health', method: RequestMethod.GET },
        { path: 'docs', method: RequestMethod.GET }
      )
      .forRoutes('*');
  }
}
