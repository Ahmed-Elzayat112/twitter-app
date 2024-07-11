import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class VerificationCode {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column()
  created_at: Date;

  @Field()
  @Column()
  expire_at: Date;

  @Field(() => User)
  @OneToOne(() => User, (user) => user.verificationCode)
  user: User;
}
