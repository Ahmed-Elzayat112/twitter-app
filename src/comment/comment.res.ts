import { Comment } from 'src/entities';
import { generateGqlResponse } from 'src/utils/response';

export const GqlCommentResponse = generateGqlResponse(Comment);

export const GqlCommentsResponse = generateGqlResponse(Array(Comment), true);
