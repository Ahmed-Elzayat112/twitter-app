import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetService } from './tweet.service';
import { TweetResolver } from './tweet.resolver';
import { Tweet } from './entities/tweet.entity';
import { UserModule } from 'src/user/user.module';
import { RoleModule } from '../role/role.module';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet]), UserModule, RoleModule],
  providers: [TweetService, TweetResolver],
  exports: [TweetService],
})
export class TweetModule {}
