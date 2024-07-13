import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttachmentService } from './attachment.service';
import { AttachmentResolver } from './attachment.resolver';
import { Attachment } from './entities/attachment.entity';
import { UserModule } from 'src/user/user.module';
import { TweetModule } from 'src/tweet/tweet.module';

@Module({
  imports: [TypeOrmModule.forFeature([Attachment]), UserModule, TweetModule],
  providers: [AttachmentService, AttachmentResolver],
  exports: [AttachmentService],
})
export class AttachmentModule {}
