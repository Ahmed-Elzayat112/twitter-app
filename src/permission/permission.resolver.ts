import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { CreatePermissionInput } from './dtos/create-permission.input';
import {
  GqlPermissionResponse,
  GqlPermissionsResponse,
} from './permission.res';

@Resolver(() => Permission)
export class PermissionResolver {
  constructor(private readonly permissionService: PermissionService) {}

  @Mutation(() => GqlPermissionResponse)
  async createPermission(
    @Args('createPermissionInput') createPermissionInput: CreatePermissionInput,
  ): Promise<Permission> {
    return this.permissionService.createPermission(createPermissionInput);
  }

  @Query(() => GqlPermissionsResponse, { name: 'permissions' })
  async findAll(): Promise<Permission[]> {
    return this.permissionService.findAll();
  }

  @Query(() => [String], { name: 'permissionsForUser' })
  async getPermissionsForUser(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<string[]> {
    return this.permissionService.getPermissionsForUser(userId);
  }
}
