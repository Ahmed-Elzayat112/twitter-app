import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificationCode } from './entities/verification-code.entity';
import { CreateVerificationCodeInput } from './dtos/create-verification-code.input';
import { UpdateVerificationCodeInput } from './dtos/update-verification-code.input';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { UserService } from 'src/user/user.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(VerificationCode)
    private verificationCodesRepository: Repository<VerificationCode>,
    private readonly userService: UserService,
    @InjectQueue('email') private readonly emailQueue: Queue,
  ) {}

  async create(user_id: number): Promise<VerificationCode> {
    const user = await this.userService.findOne(user_id);
    const code = Math.random().toString(36).substring(2, 8);
    const created_at = new Date();
    const expire_at = new Date();
    expire_at.setMinutes(expire_at.getMinutes() + 10);

    const verification: CreateVerificationCodeInput = {
      code,
      created_at,
      expire_at,
      user_id: user_id,
    };

    const newVerificationCode =
      this.verificationCodesRepository.create(verification);

    const createdVerificationCode =
      await this.verificationCodesRepository.save(newVerificationCode);

    // Queue the email sending job
    await this.emailQueue.add('sendMail', {
      email: user.email,
      code: code,
    });

    // console.log(this.emailQueue);

    return createdVerificationCode;
  }

  async verifyCode(user_id: number, code: string): Promise<boolean> {
    const verificationCode = await this.verificationCodesRepository.findOne({
      where: { code },
    });

    if (!verificationCode || verificationCode.expire_at < new Date()) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    // Update user verification status
    const user = await this.userService.findOne(user_id);
    user.verified = true;
    await this.userService.update(user.id, user);

    // Optionally, delete the used verification code
    await this.verificationCodesRepository.remove(verificationCode);

    return true;
  }

  findAll(): Promise<VerificationCode[]> {
    return this.verificationCodesRepository.find();
  }

  findOne(id: number): Promise<VerificationCode> {
    return this.verificationCodesRepository.findOne({ where: { id } });
  }

  async update(
    id: number,
    updateVerificationCodeInput: UpdateVerificationCodeInput,
  ): Promise<VerificationCode> {
    const verificationCode = await this.verificationCodesRepository.findOneBy({
      id,
    });
    if (!verificationCode) {
      throw new BadRequestException('Verification code not found');
    }

    Object.assign(verificationCode, updateVerificationCodeInput);
    return this.verificationCodesRepository.save(verificationCode);
  }

  async remove(id: number): Promise<VerificationCode> {
    const verificationCode = await this.findOne(id);
    if (!verificationCode) {
      throw new BadRequestException('Verification code not found');
    }
    await this.verificationCodesRepository.remove(verificationCode);
    return verificationCode;
  }
}
