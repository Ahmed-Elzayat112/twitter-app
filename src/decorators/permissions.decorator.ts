import { SetMetadata } from '@nestjs/common';
import { Permissions } from 'src/role/Permissions.enum';

export const PERMISSIONS_KEY = 'permissions';
export const hasPermissions = (...permissions: Permissions[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
