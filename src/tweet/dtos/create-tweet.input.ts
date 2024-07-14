import { InputType, Field } from '@nestjs/graphql';
import { IsString, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class CreateTweetInput {
  @Max(100)
  @Min(5)
  @IsString({ message: i18nValidationMessage('validation.INVALID_STRING') })
  @Field()
  content: string;

  @Field()
  user_id: number;
}
