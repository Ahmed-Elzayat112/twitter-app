import { Follow } from 'src/entities';
import { generateGqlResponse } from 'src/utils/response';

export const GqlFollowResponse = generateGqlResponse(Follow);

export const GqlFollowsResponse = generateGqlResponse(Array(Follow), true);
