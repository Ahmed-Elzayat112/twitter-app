import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUserResponse {
  @Field()
  access_token: string;
}
