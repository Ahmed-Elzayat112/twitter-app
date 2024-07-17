import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PERMISSIONS_KEY } from 'src/decorators/permissions.decorator';
import { Permissions } from 'src/role/Permissions.enum';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private roleService: RoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<Permissions[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions) {
      return true;
    }

    const ctx = GqlExecutionContext.create(context).getContext();
    // console.log('----------------> user', ctx.user);
    const user = ctx.user;

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    const userPermissions = await this.roleService.getPermissionsByUser(
      user.roleId,
    );

    // console.log('---------> userPermissions', userPermissions);

    const isPermisson = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    // console.log('---------> Permissions', isPermisson);
    return isPermisson;
  }
}
