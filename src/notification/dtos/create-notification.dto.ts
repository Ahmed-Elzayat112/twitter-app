import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field()
  device_type: string;

  @Field()
  notification_token: string;

  @Field({
    defaultValue: 'ACTIVE',
  })
  status: string;
}
