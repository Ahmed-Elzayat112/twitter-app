import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentResolver } from './attachment.resolver';

@Module({
  providers: [AttachmentService, AttachmentResolver]
})
export class AttachmentModule {}
