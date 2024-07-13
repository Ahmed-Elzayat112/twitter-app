import { Like } from 'src/entities';
import { generateGqlResponse } from 'src/utils/response';

export const GqlLikeResponse = generateGqlResponse(Like);

export const GqlLikesResponse = generateGqlResponse(Array(Like), true);
