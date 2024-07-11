import { InputType, Field } from '@nestjs/graphql';
import { AttachmentType } from '../attachment-type.enum';

@InputType()
export class CreateAttachmentInput {
  @Field(() => AttachmentType)
  type: AttachmentType;

  @Field()
  size: number;

  @Field()
  url: string;

  @Field()
  thumbnail: string;

  @Field()
  tweet_id: number;

  @Field()
  user_id: number;
}
