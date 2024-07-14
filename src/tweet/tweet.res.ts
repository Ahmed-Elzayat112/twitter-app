import { Tweet } from 'src/entities';
import { generateGqlResponse } from 'src/utils/Gql-response';

export const GqlTweetResponse = generateGqlResponse(Tweet);

export const TweetPaginationResponse = generateGqlResponse(Array(Tweet));

export const GqlTweetsResponse = generateGqlResponse(Array(Tweet), true);
