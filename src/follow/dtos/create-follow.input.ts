import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFollowInput {
  @Field(() => Int)
  follower_id: number;

  @Field(() => Int)
  following_id: number;
}
