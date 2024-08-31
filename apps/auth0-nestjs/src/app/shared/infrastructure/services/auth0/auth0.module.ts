import { Module } from '@nestjs/common';
import { AuthServiceAdapter } from '@shared/domain/adapters/auth';

import { Auth0Service } from './auth0.service';

@Module({
  imports: [],
  providers: [
    {
      provide: AuthServiceAdapter,
      useClass: Auth0Service,
    },
  ],
  exports: [AuthServiceAdapter],
})
export class Auth0Module {}
