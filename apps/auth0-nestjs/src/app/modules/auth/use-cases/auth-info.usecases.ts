import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AuthInfoUseCases {
  private readonly logger = new Logger(AuthInfoUseCases.name);

  async validateUser() {
    return null;
  }
}
