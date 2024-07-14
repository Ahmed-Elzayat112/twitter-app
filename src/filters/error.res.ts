import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class GqlErrorResponseData {
  @Field(() => Int)
  statusCode: number;

  @Field()
  message: string;

  @Field()
  timestamp: string;

  @Field()
  path: string;
}

import { generateGqlResponse } from 'src/utils/Gql-response';

const GqlErrorResponse = generateGqlResponse(GqlErrorResponseData, true);
