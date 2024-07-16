import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionInput } from './dtos/create-permission.input';
import { Role, User } from 'src/entities';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Role) private readonly roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async createPermission(
    createPermissionInput: CreatePermissionInput,
  ): Promise<Permission> {
    const permission = this.permissionRepository.create(createPermissionInput);
    return this.permissionRepository.save(permission);
  }

  async findAll(): Promise<Permission[]> {
    return this.permissionRepository.find();
  }

  async getPermissionsForUser(userId: number): Promise<string[]> {
    // Fetch user roles and permissions from the database
    const users = await this.userRepository.find({
      where: { id: userId },
      relations: ['roles'],
    });

    const user = users.length > 0 ? users[0] : null;

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const roleNames = user.roles.map((role) => role.name);
    const permissions = await this.mapRolesToPermissions(roleNames);

    return permissions;
  }

  private async mapRolesToPermissions(roleNames: string[]): Promise<string[]> {
    // Fetch permissions for the given role names
    const roles = await this.roleRepository.find({
      where: { name: In(roleNames) },
      relations: ['permissions'],
    });
    const permissionNames = roles.flatMap((role) =>
      role.permissions.map((permission) => permission.name),
    );
    return permissionNames;
  }
}
