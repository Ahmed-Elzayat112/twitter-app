import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './role.entity';
import { Permission } from 'src/permission/permission.entity';
import { CreateRoleInput } from './dtos/create-role.input';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async createRole(createRoleInput: CreateRoleInput): Promise<Role> {
    const permissions = await this.permissionRepository.findBy({
      id: In(createRoleInput.permissionIds),
    });

    const role = this.roleRepository.create({
      ...createRoleInput,
      permissions,
    });
    return this.roleRepository.save(role);
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
