import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { VerificationCodeService } from './verification-code.service';
import { VerificationCode } from './entities/verification-code.entity';
import { CreateVerificationCodeInput } from './dtos/create-verification-code.input';
import { UpdateVerificationCodeInput } from './dtos/update-verification-code.input';

@Resolver(() => VerificationCode)
export class VerificationCodeResolver {
  constructor(
    private readonly verificationCodeService: VerificationCodeService,
  ) {}

  @Mutation(() => VerificationCode)
  createVerificationCode(
    @Args('createVerificationCodeInput')
    createVerificationCodeInput: CreateVerificationCodeInput,
  ) {
    return this.verificationCodeService.create(createVerificationCodeInput);
  }

  @Query(() => [VerificationCode], { name: 'verificationCodes' })
  findAll() {
    return this.verificationCodeService.findAll();
  }

  @Query(() => VerificationCode, { name: 'verificationCode' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.verificationCodeService.findOne(id);
  }

  @Mutation(() => VerificationCode)
  updateVerificationCode(
    @Args('updateVerificationCodeInput')
    updateVerificationCodeInput: UpdateVerificationCodeInput,
  ) {
    return this.verificationCodeService.update(
      updateVerificationCodeInput.id,
      updateVerificationCodeInput,
    );
  }

  @Mutation(() => VerificationCode)
  removeVerificationCode(@Args('id', { type: () => Int }) id: number) {
    return this.verificationCodeService.remove(id);
  }
}
