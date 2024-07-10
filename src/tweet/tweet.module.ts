import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from './entities/tweet.entity';
import { TweetService } from './tweet.service';
import { TweetResolver } from './tweet.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Tweet])],
  providers: [TweetService, TweetResolver],
})
export class TweetModule {}
