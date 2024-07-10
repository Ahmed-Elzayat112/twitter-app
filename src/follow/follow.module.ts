import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './entities/follow.entity';
import { FollowService } from './follow.service';
import { FollowResolver } from './follow.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  providers: [FollowService, FollowResolver],
})
export class FollowModule {}
