import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../like/entities/like.entity';
import { Attachment } from '../../attachment/entities/attachment.entity';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.tweets)
  user: User;

  @OneToMany(() => Comment, (comment) => comment.tweet)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.tweet)
  likes: Like[];

  @OneToMany(() => Attachment, (attachment) => attachment.tweet)
  attachments: Attachment[];
}
