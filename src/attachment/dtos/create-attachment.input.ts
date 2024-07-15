import { InputType, Field } from '@nestjs/graphql';
import { AttachmentType } from '../attachment-type.enum';
import { IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateAttachmentInput {
  @Field(() => AttachmentType)
  type: AttachmentType;

  @Field()
  size: number;

  @IsUrl({}, { message: 'INVALID_URL' })
  @Field()
  url: string;

  @IsString({ message: 'INVALID_STRING' })
  @Field()
  thumbnail: string;

  @Field()
  tweet_id: number;

  @Field()
  user_id: number;
}
