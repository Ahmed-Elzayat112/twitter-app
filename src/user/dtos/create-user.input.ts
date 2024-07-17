import { InputType, Field } from '@nestjs/graphql';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Length(5, 20, {
    message: 'INVALID_STRING',
  })
  @IsString({ message: 'INVALID_STRING' })
  @Field()
  username: string;

  @IsEmail({}, { message: 'INVALID_EMAIL' })
  @Field()
  email: string;

  @Field()
  password: string;

  @IsBoolean()
  @Field({ defaultValue: false })
  verified: boolean;

  @IsOptional()
  @IsString({ message: 'INVALID_STRING' })
  @Field({ nullable: true })
  bio?: string;

  @IsOptional()
  @IsUrl(
    {},
    {
      message: 'INVALID_URL',
    },
  )
  @Field({ nullable: true })
  profile_picture?: string;

  @Field({ nullable: true })
  role_id?: number;
}
