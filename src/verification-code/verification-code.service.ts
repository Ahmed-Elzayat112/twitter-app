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

  create(
    createVerificationCodeInput: CreateVerificationCodeInput,
  ): Promise<VerificationCode> {
    const newVerificationCode = this.verificationCodesRepository.create(
      createVerificationCodeInput,
    );
    return this.verificationCodesRepository.save(newVerificationCode);
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
