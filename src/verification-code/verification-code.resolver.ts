import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VerificationCodeService } from './verification-code.service';
import { VerificationCode } from './entities/verification-code.entity';
import { UpdateVerificationCodeInput } from './dtos/update-verification-code.input';
import {
  GqlVerificationCodeResponse,
  GqlVerificationCodesResponse,
} from './verification.res';

@Resolver(() => VerificationCode)
export class VerificationCodeResolver {
  constructor(
    private readonly verificationCodeService: VerificationCodeService,
  ) {}

  @Mutation(() => GqlVerificationCodeResponse)
  createVerificationCode(
    @Args('user_id')
    user_id: number,
  ) {
    return this.verificationCodeService.create(user_id);
  }

  @Mutation(() => Boolean)
  verifyCode(@Args('user_id') user_id: number, @Args('code') code: string) {
    return this.verificationCodeService.verifyCode(user_id, code);
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
