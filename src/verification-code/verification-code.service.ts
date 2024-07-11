import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VerificationCode } from './entities/verification-code.entity';
import { CreateVerificationCodeInput } from './dtos/create-verification-code.input';
import { UpdateVerificationCodeInput } from './dtos/update-verification-code.input';

@Injectable()
export class VerificationCodeService {
  constructor(
    @InjectRepository(VerificationCode)
    private verificationCodesRepository: Repository<VerificationCode>,
  ) {}

  async create(user_id: number): Promise<VerificationCode> {
    const code = Math.random().toString(36).substring(2, 7);
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

    return createdVerificationCode;
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
    await this.verificationCodesRepository.update(
      id,
      updateVerificationCodeInput,
    );
    return this.verificationCodesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<VerificationCode> {
    const verificationCode = await this.findOne(id);
    await this.verificationCodesRepository.remove(verificationCode);
    return verificationCode;
  }
}
