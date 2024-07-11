import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateLikeInput {
  @Field(() => Int)
  tweet_id: number;

  @Field(() => Int)
  user_id: number;
}
