import { Follow } from 'src/entities';
import { generateGqlResponse } from 'src/utils/Gql-response';

export const GqlFollowResponse = generateGqlResponse(Follow);

export const GqlFollowsResponse = generateGqlResponse(Array(Follow), true);
