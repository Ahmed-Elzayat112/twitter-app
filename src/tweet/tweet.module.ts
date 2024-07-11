import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TweetService } from './tweet.service';
import { TweetResolver } from './tweet.resolver';
import { Tweet } from './entities/tweet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  providers: [TweetService, TweetResolver],
  exports: [TweetService],
})
export class TweetModule {}
