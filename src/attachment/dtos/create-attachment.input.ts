import { InputType, Field } from '@nestjs/graphql';
import { AttachmentType } from '../attachment-type.enum';
import { IsString, IsUrl } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

@InputType()
export class CreateAttachmentInput {
  @Field(() => AttachmentType)
  type: AttachmentType;

  @Field()
  size: number;

  @IsUrl()
  @Field()
  url: string;

  @IsString({ message: i18nValidationMessage('validation.INVALID_STRING') })
  @Field()
  thumbnail: string;

  @Field()
  tweet_id: number;

  @Field()
  user_id: number;
}
