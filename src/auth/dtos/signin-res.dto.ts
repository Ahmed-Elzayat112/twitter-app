import { InputType, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUserResponse {
  @Field()
  accessToken: string;
  refreshToken: string;
}
