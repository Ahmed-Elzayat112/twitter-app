import { Notifications, NotificationToken } from 'src/entities';
import { generateGqlResponse } from 'src/utils/Gql-response';

export const GqlNotificationTokenResponse =
  generateGqlResponse(NotificationToken);
export const GqlNotificationResponse = generateGqlResponse(Notifications);

export const GqlNotificationTokensResponse = generateGqlResponse(
  Array(NotificationToken),
  true,
);
