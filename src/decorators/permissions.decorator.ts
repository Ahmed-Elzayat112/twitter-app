import { SetMetadata } from '@nestjs/common';
import { Permissions } from 'src/permission/permissions.enum';

export const PERMISSIONS_KEY = 'permissions';
export const PermissionsDecorator = (...permissions: Permissions[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
