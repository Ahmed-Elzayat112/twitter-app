import { Attachment } from 'src/entities';
import { generateGqlResponse } from 'src/utils/Gql-response';

export const GqlattAchmentResponse = generateGqlResponse(Attachment);

export const GqlattAchmentsResponse = generateGqlResponse(
  Array(Attachment),
  true,
);
