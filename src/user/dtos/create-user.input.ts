import { InputType, Int, Field } from '@nestjs/graphql';
import { IsBoolean, IsEmail, IsString, IsUrl, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class CreateUserInput {
  @Max(20, { message: i18nValidationMessage('validation.USERNAME_INVALID') })
  @Min(5, { message: i18nValidationMessage('validation.USERNAME_INVALID') })
  @IsString({ message: i18nValidationMessage('validation.INVALID_STRING') })
  @Field()
  username: string;

  @IsEmail({}, { message: i18nValidationMessage('validation.INVALID_EMAIL') })
  @Field()
  email: string;

  @Field()
  password: string;

  @IsBoolean()
  @Field({ defaultValue: false })
  verified: boolean;

  @IsString({ message: i18nValidationMessage('validation.INVALID_STRING') })
  @Field({ nullable: true })
  bio?: string;

  @IsUrl()
  @Field({ nullable: true })
  profile_picture?: string;
}
