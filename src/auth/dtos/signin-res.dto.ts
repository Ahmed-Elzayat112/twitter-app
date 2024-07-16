import { Field, ObjectType } from '@nestjs/graphql';
import { generateGqlResponse } from 'src/utils/Gql-response';

@ObjectType()
export class SignUserResponse {
  @Field()
  accessToken: string;
  // refreshToken: string;
}

export const GqlSignUserResponse = generateGqlResponse(SignUserResponse);
