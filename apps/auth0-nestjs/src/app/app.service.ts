import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData() {
    return 'Auth0 NestJS 1.0 Hot Reload';
  }
}
