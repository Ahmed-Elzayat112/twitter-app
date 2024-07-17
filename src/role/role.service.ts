import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Role } from './role.entity';
import { CreateRoleInput } from './dtos/create-role.input';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async createRole(createRoleInput: CreateRoleInput): Promise<Role> {
    const role = this.roleRepository.create(createRoleInput);
    return this.roleRepository.save(role);
  }

  async getPermissionsByUser(roleId: number): Promise<string[]> {
    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    // console.log('-------------> role', role);
    return role ? role.permissions : [];
  }

  async findAll(): Promise<Role[]> {
    return this.roleRepository.find();
  }
}
