import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Tweet } from '../../tweet/entities/tweet.entity';
import { User } from '../../user/entities/user.entity';

@ObjectType()
@Entity()
export class Like {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Tweet)
  @ManyToOne(() => Tweet, (tweet) => tweet.likes)
  tweet: Tweet;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.likes)
  user: User;
}
