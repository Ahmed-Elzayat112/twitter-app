import { VerificationCode } from 'src/entities';
import { generateGqlResponse } from 'src/utils/response';

export const GqlVerificationCodeResponse =
  generateGqlResponse(VerificationCode);

export const GqlVerificationCodesResponse = generateGqlResponse(
  Array(VerificationCode),
  true,
);
