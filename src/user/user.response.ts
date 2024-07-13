import { User } from 'src/entities';
import { generateGqlResponse } from 'src/utils/response';

export const GqlUserResponse = generateGqlResponse(User);

export const GqlUsersResponse = generateGqlResponse(Array(User), true);
