import { Attachment } from 'src/entities';
import { generateGqlResponse } from 'src/utils/Gql-response';

export const GqlAttAchmentResponse = generateGqlResponse(Attachment);

export const GqlAttAchmentsResponse = generateGqlResponse(
  Array(Attachment),
  true,
);
