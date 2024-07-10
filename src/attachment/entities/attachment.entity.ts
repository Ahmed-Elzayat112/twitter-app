import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Tweet } from '../../tweet/entities/tweet.entity';

@Entity()
export class Attachment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @Column('float')
  size: number;

  @Column()
  url: string;

  @Column({ nullable: true })
  thumbnail: string;

  @ManyToOne(() => Tweet, (tweet) => tweet.attachments)
  tweet: Tweet;

  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
