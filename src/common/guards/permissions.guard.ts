import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PERMISSIONS_KEY } from 'src/decorators/permissions.decorator';
import { PermissionService } from 'src/permission/permission.service';
import { Permissions } from 'src/permission/permissions.enum';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permssionService: PermissionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permissions[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userPermissions = await this.permssionService.getPermissionsForUser(
      user.id,
    );

    return requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );
  }
}
