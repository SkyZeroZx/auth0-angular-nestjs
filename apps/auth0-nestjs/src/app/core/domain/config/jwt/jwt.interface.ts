export interface JWTConfig {
  algorithms: string[];
  audience: string[];
  issuer: string;
  jwksUri: string;
  domain: string;
  clientId: string;
  clientSecret: string;
  dbName: string;
  dbConnectId: string;
}
