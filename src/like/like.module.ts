import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LikeService } from './like.service';
import { LikeResolver } from './like.resolver';
import { Like } from './entities/like.entity';
import { UserModule } from 'src/user/user.module';
import { TweetModule } from 'src/tweet/tweet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Like]), UserModule, TweetModule],
  providers: [LikeService, LikeResolver],
  exports: [LikeService],
})
export class LikeModule {}
