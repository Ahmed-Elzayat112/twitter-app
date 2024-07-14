import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsString, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class CreateVerificationCodeInput {
  @IsString({ message: i18nValidationMessage('validation.INVALID_STRING') })
  @Field()
  code: string;

  @IsDate()
  @Field()
  created_at: Date;

  @IsDate()
  @Field()
  expire_at: Date;

  @Field()
  user_id: number;
}
