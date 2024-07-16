import { Role } from 'src/entities';
import { generateGqlResponse } from 'src/utils/Gql-response';

export const GqlRoleResponse = generateGqlResponse(Role);

export const GqlRolesResponse = generateGqlResponse(Array(Role), true);
