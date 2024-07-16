import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionResolver } from './permission.resolver';
import { Permission } from './permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User } from 'src/entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permission]),
    TypeOrmModule.forFeature([Role]),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [PermissionService, PermissionResolver],
  exports: [PermissionService],
})
export class PermissionModule {}
