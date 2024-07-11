import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateVerificationCodeInput {
  @Field()
  code: string;

  @Field()
  created_at: Date;

  @Field()
  expire_at: Date;

  @Field()
  user_id: number;
}
