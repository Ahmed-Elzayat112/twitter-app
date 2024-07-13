import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Tweet } from '../../tweet/entities/tweet.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class Comment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  content: string;

  @Field()
  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Tweet)
  @ManyToOne(() => Tweet, (tweet) => tweet.comments)
  tweet: Tweet;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
