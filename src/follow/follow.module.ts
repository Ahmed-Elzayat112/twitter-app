import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';
import { Follow } from './entities/follow.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Follow]), UserModule],
  providers: [FollowService, FollowResolver],
  exports: [FollowService],
})
export class FollowModule {}
