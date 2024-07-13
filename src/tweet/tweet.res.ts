import { Tweet } from 'src/entities';
import { generateGqlResponse } from 'src/utils/response';

export const GqlTweetResponse = generateGqlResponse(Tweet);

export const GqlTweetsResponse = generateGqlResponse(Array(Tweet), true);
