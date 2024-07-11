import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateCommentInput {
  @Field()
  content: string;

  @Field()
  created_at: Date;

  @Field()
  tweet_id: number;

  @Field()
  user_id: number;
}
