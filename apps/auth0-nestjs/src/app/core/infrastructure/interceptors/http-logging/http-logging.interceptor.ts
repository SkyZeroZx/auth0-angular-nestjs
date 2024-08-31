import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class HttpLoggingInterceptor implements NestMiddleware {
  private readonly logger = new Logger(HttpLoggingInterceptor.name);

  use(request: Request, response: Response, next: NextFunction): void {
    const startAt = process.hrtime();
    response.on('finish', () => {
      const { ip, method, originalUrl } = request;
      const { statusCode } = response;

      const responseContentLength =
        parseInt(response.get('content-length')) || 0;
      const requestContentLength = parseInt(request.get('content-length')) || 0;
      const diff = process.hrtime(startAt);
      const responseTime = diff[0] * 1e3 + diff[1] * 1e-6;

      this.logger.log(
        `[${method}] | ${originalUrl} | ${statusCode}  | size request ${requestContentLength} | size response ${responseContentLength} |  delay ${responseTime}ms -  ${ip}`
      );
    });

    next();
  }
}
