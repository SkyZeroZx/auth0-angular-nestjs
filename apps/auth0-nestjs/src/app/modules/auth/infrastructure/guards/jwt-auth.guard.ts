import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(
    err: unknown,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any
  ) {
    console.log({ err, user , info , context, status });
    if (err || !user) {
      throw err || new UnauthorizedException('You are not authenticated');
    }
    return user;
  }
}
