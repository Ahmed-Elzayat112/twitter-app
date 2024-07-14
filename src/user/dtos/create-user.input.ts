import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ defaultValue: false })
  verified: boolean;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  profile_picture?: string;
}
