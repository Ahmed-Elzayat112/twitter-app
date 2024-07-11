import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTweetInput {
  @Field()
  content: string;

  @Field()
  created_at: Date;

  @Field()
  user_id: number;
}
