import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VerificationCodeService } from './verification-code.service';
import { VerificationCodeResolver } from './verification-code.resolver';
import { VerificationCode } from './entities/verification-code.entity';
import { UserModule } from 'src/user/user.module';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    TypeOrmModule.forFeature([VerificationCode]),
    UserModule,
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [VerificationCodeService, VerificationCodeResolver],
  exports: [VerificationCodeService],
})
export class VerificationCodeModule {}
