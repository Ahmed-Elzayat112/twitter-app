import { VerificationCode } from 'src/entities';
import { generateGqlResponse } from 'src/utils/Gql-response';

import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
class VerifyCode {
  @Field(() => Boolean)
  verified: boolean;
}

export const VerifyCodeResponse = generateGqlResponse(VerifyCode);

export const GqlVerificationCodeResponse =
  generateGqlResponse(VerificationCode);

export const GqlVerificationCodesResponse = generateGqlResponse(
  Array(VerificationCode),
  true,
);
