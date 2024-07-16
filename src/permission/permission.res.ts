import { Permission } from 'src/entities';
import { generateGqlResponse } from 'src/utils/Gql-response';

export const GqlPermissionResponse = generateGqlResponse(Permission);

export const GqlPermissionsResponse = generateGqlResponse(
  Array(Permission),
  true,
);
