import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

export const META_ROLES = 'role';

function RoleProtected(args: string[]) {
  return SetMetadata(META_ROLES, args);
}

export function AuthRole(role: string[]) {
  return applyDecorators(RoleProtected(role), UseGuards(JwtAuthGuard));
}

export function AuthJWT() {
  return applyDecorators(UseGuards(JwtAuthGuard));
}
