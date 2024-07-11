import { CreateVerificationCodeInput } from './create-verification-code.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateVerificationCodeInput extends PartialType(
  CreateVerificationCodeInput,
) {
  @Field(() => Int)
  id: number;
}
