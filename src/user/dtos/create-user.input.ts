import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ defaultValue: false })
  verified: boolean;

  @Field({ nullable: true })
  bio?: string;

  @Field({ nullable: true })
  profile_picture?: string;
}
