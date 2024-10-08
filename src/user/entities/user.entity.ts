import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Tweet } from '../../tweet/entities/tweet.entity';
import { Follow } from '../../follow/entities/follow.entity';
import { VerificationCode } from '../../verification-code/entities/verification-code.entity';
import { Like } from '../../like/entities/like.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Attachment } from '../../attachment/entities/attachment.entity';
import { pathFinderMiddleware } from 'src/middlewares/pathFinderMiddleware';
import { Session } from 'src/entities/session.entity';
import { Role } from 'src/role/role.entity';

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

  @Column()
  password: string;

  @Column({ default: false })
  verified: boolean;

  @Field({ nullable: true })
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

  @Field(() => [Session])
  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @Field({ nullable: true })
  @Column({ nullable: true })
  roleId?: number;

  @Field(() => Role)
  @ManyToOne(() => Role, (role) => role.users, { eager: true })
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
