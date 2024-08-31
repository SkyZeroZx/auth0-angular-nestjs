import { Controller, Get } from '@nestjs/common';
import { AuthJWT } from '../decorators/auth-role.decorator';
import { GetUserContext } from '../decorators/get-user-context.decorator';

@Controller('auth')
export class AuthController {
  @Get()
  @AuthJWT()
  getUser() {
    return null;
  }
}
