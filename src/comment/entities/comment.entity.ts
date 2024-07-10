import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Tweet } from '../../tweet/entities/tweet.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => Tweet, (tweet) => tweet.comments)
  tweet: Tweet;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;
}
