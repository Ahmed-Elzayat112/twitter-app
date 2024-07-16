import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { PermissionModule } from 'src/permission/permission.module';
import { Role } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permission } from 'src/permission/permission.entity';

@Module({
  imports: [
    PermissionModule,
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([Permission]),
  ],
  providers: [RoleService, RoleResolver],
})
export class RoleModule {}
