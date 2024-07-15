import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { DataloaderResolver } from './dataloader.resolver';
import { UserModule } from 'src/user/user.module';
import { TweetModule } from 'src/tweet/tweet.module';
import { CommentModule } from 'src/comment/comment.module';

@Module({
  imports: [UserModule, TweetModule, CommentModule],
  providers: [DataloaderService, DataloaderResolver],
  exports: [DataloaderService],
})
export class DataloaderModule {}
