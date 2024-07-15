import { Module } from '@nestjs/common';
import { DataloaderService } from './dataloader.service';
import { DataloaderResolver } from './dataloader.resolver';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  providers: [DataloaderService, DataloaderResolver],
  exports: [DataloaderService],
})
export class DataloaderModule {}
