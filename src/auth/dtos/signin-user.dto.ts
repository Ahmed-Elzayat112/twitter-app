import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SignUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  profile_picture?: string;
}
