import cors from 'cors';
import helmet from 'helmet';

import { loggerConfig } from '@core/infrastructure/config/logger';
import { ResponseInterceptor } from '@core/infrastructure/interceptors';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const logger = new Logger(bootstrap.name);

  const app = await NestFactory.create(AppModule, { ...loggerConfig });

  const globalPrefix = 'api';

  const port = process.env.PORT || 3000;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  app.use(
    cors({
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    })
  );
  
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.setGlobalPrefix(globalPrefix);

  app.use(helmet());
  app.use(helmet.hidePoweredBy());

  await app.listen(port);

  logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
