import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { jwtConfig } from '@core/infrastructure/config/environment/jwt';
import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor() {
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: jwtConfig.jwksUri,
      }),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      audience: jwtConfig.audience,
      issuer: jwtConfig.issuer,
      algorithms: jwtConfig.algorithms,
    });
  }

  validate(payload: unknown) {
    this.logger.log({ message: 'Validate JWT ' }, { data: payload });
    return payload;
  }
}
