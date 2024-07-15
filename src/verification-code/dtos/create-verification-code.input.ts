import { InputType, Field } from '@nestjs/graphql';
import { IsDate, IsString, Max, Min } from 'class-validator';

@InputType()
export class CreateVerificationCodeInput {
  @IsString({ message: 'INVALID_STRING' })
  @Field()
  code: string;

  @IsDate()
  @Field()
  created_at: Date;

  @IsDate()
  @Field()
  expire_at: Date;

  @Field()
  user_id: number;
}
