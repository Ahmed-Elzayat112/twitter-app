import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateNotificationInput } from './create-notification.dto';

@InputType()
export class UpdateNotificationInput extends PartialType(
  CreateNotificationInput,
) {
  @Field(() => Int)
  id: number;
}
