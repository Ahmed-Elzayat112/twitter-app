import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VerificationCodeService } from './verification-code.service';
import { VerificationCode } from './entities/verification-code.entity';
import { UpdateVerificationCodeInput } from './dtos/update-verification-code.input';
import {
  GqlVerificationCodeResponse,
  GqlVerificationCodesResponse,
  VerifyCodeResponse,
} from './verification.res';
import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nContext, I18nService } from 'nestjs-i18n';

@Resolver(() => VerificationCode)
export class VerificationCodeResolver {
  constructor(
    private readonly verificationCodeService: VerificationCodeService,
    private readonly i18n: I18nService,
  ) {}

  @Mutation(() => GqlVerificationCodeResponse)
  createVerificationCode(
    @Args('user_id', { type: () => Int })
    user_id: number,
  ) {
    return this.verificationCodeService.create(user_id);
  }

  @Mutation(() => VerifyCodeResponse)
  async verifyCode(
    @Args('user_id', { type: () => Int }) user_id: number,
    @Args('code') code: string,
  ) {
    try {
      const verified = await this.verificationCodeService.verifyCode(
        user_id,
        code,
      );

      const message = this.i18n.translate('errors.VERIFICATION_SUCCESS', {
        lang: I18nContext.current().lang,
      });

      return {
        data: { verified },
        status: 'success',
        message,
      };
    } catch (error) {
      const message = this.i18n.t('errors.VERIFICATION_FAILURE', {
        lang: I18nContext.current().lang,
      });

      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          message,
          timestamp: new Date().toISOString(),
          path: '/verify-code',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Query(() => GqlVerificationCodesResponse, { name: 'verificationCodes' })
  findAll() {
    return this.verificationCodeService.findAll();
  }

  @Query(() => GqlVerificationCodeResponse, { name: 'verificationCode' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.verificationCodeService.findOne(id);
  }

  @Mutation(() => GqlVerificationCodeResponse)
  updateVerificationCode(
    @Args('updateVerificationCodeInput')
    updateVerificationCodeInput: UpdateVerificationCodeInput,
  ) {
    return this.verificationCodeService.update(
      updateVerificationCodeInput.id,
      updateVerificationCodeInput,
    );
  }

  @Mutation(() => GqlVerificationCodeResponse)
  removeVerificationCode(@Args('id', { type: () => Int }) id: number) {
    return this.verificationCodeService.remove(id);
  }
}
