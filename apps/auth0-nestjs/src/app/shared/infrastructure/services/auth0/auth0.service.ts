import {
  AuthenticationClient,
  ManagementClient,
  ManagementClientOptionsWithClientCredentials,
} from 'auth0';

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthServiceAdapter } from '@shared/domain/adapters/auth';

@Injectable()
export class Auth0Service implements AuthServiceAdapter {
  private readonly logger = new Logger(Auth0Service.name);
  readonly management: ManagementClient;
  readonly auth: AuthenticationClient;
  //   public readonly connection = this.config.get<string>('AUTH0_DB_NAME');
  //   public readonly connectionId = this.config.get<string>('AUTH0_DB_CONNECT_ID');

  constructor(private readonly config: ConfigService) {
    this.logger.log('Auth0Service initialized');
    const managementOptions: ManagementClientOptionsWithClientCredentials = {
      domain: this.config.get('AUTH0_DOMAIN'),
      clientId: this.config.get('AUTH0_CLIENT_ID'),
      clientSecret: this.config.get('AUTH0_CLIENT_SECRET'),
    };

    this.management = new ManagementClient(managementOptions);
    this.auth = new AuthenticationClient({
      domain: this.config.get('AUTH0_DOMAIN'),
      clientId: this.config.get('AUTH0_CLIENT_ID'),
      clientSecret: this.config.get('AUTH0_CLIENT_SECRET'),
    });
  }
}
