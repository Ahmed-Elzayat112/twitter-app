import { InputType, Field } from '@nestjs/graphql';
import {
  IsDate,
  IsOptional,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { CreateDateColumn } from 'typeorm';

@InputType()
export class CreateCommentInput {
  @Length(5, 50, { message: 'STRING_MAX_MIN' })
  @IsString({ message: 'INVALID_STRING' })
  @Field()
  content: string;

  @IsOptional()
  @IsDate({ message: 'DATE_INVALID' })
  // @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  tweet_id: number;

  @Field()
  user_id: number;
}
