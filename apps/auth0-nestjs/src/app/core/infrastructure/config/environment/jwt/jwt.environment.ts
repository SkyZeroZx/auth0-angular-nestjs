import { env } from 'process';
import { config } from 'dotenv';
import { JWTConfig } from '@core/domain/config/jwt';

config();

export const jwtConfig: JWTConfig = {
  jwksUri: env.JWT_JWKS_URI,
  algorithms: JSON.parse(env.JWT_ALGORITHMS),
  issuer: env.JWT_ISSUER,
  domain: env.JWT_DOMAIN,
  audience: JSON.parse(env.JWT_AUDIENCE),
  clientId: env.JWT_CLIENT_ID,
  clientSecret: env.JWT_CLIENT_SECRET,
  dbName: env.JWT_DB_NAME,
  dbConnectId: env.JWT_DB_CONNECT_ID,
};
