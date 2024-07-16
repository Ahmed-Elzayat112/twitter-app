import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { CreateRoleInput } from './dtos/create-role.input';
import { GqlRoleResponse, GqlRolesResponse } from './role.res';

@Resolver(() => Role)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Mutation(() => GqlRoleResponse)
  async createRole(
    @Args('createRoleInput') createRoleInput: CreateRoleInput,
  ): Promise<Role> {
    return this.roleService.createRole(createRoleInput);
  }

  @Query(() => GqlRolesResponse, { name: 'roles' })
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }
}
