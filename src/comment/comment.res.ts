import { Comment } from 'src/entities';
import { generateGqlResponse } from 'src/utils/Gql-response';

export const GqlCommentResponse = generateGqlResponse(Comment);

export const GqlCommentsResponse = generateGqlResponse(Array(Comment), true);
