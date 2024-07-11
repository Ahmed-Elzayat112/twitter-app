import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Tweet } from '../../tweet/entities/tweet.entity';
import { Follow } from '../../follow/entities/follow.entity';
import { VerificationCode } from '../../verification-code/entities/verification-code.entity';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Attachment } from '../../attachment/entities/attachment.entity';
import { Upload } from 'src/scalars/upload.scalar';
import { pathFinderMiddleware } from 'src/middlewares/pathFinderMiddleware';

@ObjectType()
@Entity()
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  username: string;

  @Field()
  @Column()
  email: string;

  @Field()
  @Column()
  password: string;

  @Field(() => [Upload], { nullable: true })
  @Column({ nullable: true })
  bio?: string;

  @Field({ nullable: true, middleware: [pathFinderMiddleware] })
  @Column({ nullable: true })
  profile_picture: string;

  @Field(() => [Tweet], { nullable: true })
  @OneToMany(() => Tweet, (tweet) => tweet.user)
  tweets?: Tweet[];

  @Field(() => [Follow], { nullable: true })
  @OneToMany(() => Follow, (follow) => follow.follower)
  followers?: Follow[];

  @Field(() => [Follow], { nullable: true })
  @OneToMany(() => Follow, (follow) => follow.following)
  followings?: Follow[];

  @Field(() => VerificationCode, { nullable: true })
  @OneToOne(() => VerificationCode)
  @JoinColumn()
  verificationCode?: VerificationCode;

  @Field(() => [Like], { nullable: true })
  @OneToMany(() => Like, (like) => like.user)
  likes?: Like[];

  @Field(() => [Comment], { nullable: true })
  @OneToMany(() => Comment, (comment) => comment.user)
  comments?: Comment[];

  @Field(() => [Attachment], { nullable: true })
  @OneToMany(() => Attachment, (attachment) => attachment.user)
  attachments?: Attachment[];
}
