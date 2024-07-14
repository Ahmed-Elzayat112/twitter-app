import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsString, Max, Min } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class CreateCommentInput {
  @Max(50)
  @Min(5)
  @IsString({ message: i18nValidationMessage('validation.INVALID_STRING') })
  @Field()
  content: string;

  @IsDate()
  @Field()
  created_at: Date;

  @Field()
  tweet_id: number;

  @Field()
  user_id: number;
}
