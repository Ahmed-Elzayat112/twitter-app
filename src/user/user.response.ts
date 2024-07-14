import { User } from 'src/entities';
import { generateGqlResponse } from 'src/utils/Gql-response';

export const GqlUserResponse = generateGqlResponse(User);

export const GqlUsersResponse = generateGqlResponse(Array(User), true);
