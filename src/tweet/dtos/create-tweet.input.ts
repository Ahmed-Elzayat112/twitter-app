import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class CreateTweetInput {
  @IsString({ message: 'INVALID_STRING' })
  @Field()
  content: string;

  @Field()
  user_id: number;
}
