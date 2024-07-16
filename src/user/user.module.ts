import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { User } from './entities/user.entity';
import { Role } from 'src/role/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TypeOrmModule.forFeature([Role])],
  providers: [UserService, UserResolver],
  exports: [TypeOrmModule, UserService],
})
export class UserModule {}
