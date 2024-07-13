import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { generateGqlResponse } from 'src/utils/response';

@ObjectType()
export class SignUserResponse {
  @Field()
  accessToken: string;
  refreshToken: string;
}

export const GqlSignUserResponse = generateGqlResponse(SignUserResponse);
