import { Field, ObjectType, Int, registerEnumType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Tweet } from '../../tweet/entities/tweet.entity';
import { User } from '../../user/entities/user.entity';
import { AttachmentType } from '../attachment-type.enum';

registerEnumType(AttachmentType, {
  name: 'AttachmentType',
  description: 'The types of attachments',
});

@ObjectType()
@Entity()
export class Attachment {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({
    type: 'enum',
    enum: AttachmentType,
  })
  type: AttachmentType;

  @Field()
  @Column()
  size: number;

  @Field()
  @Column()
  url: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  thumbnail?: string;

  @Field(() => Tweet)
  @ManyToOne(() => Tweet, (tweet) => tweet.attachments)
  tweet: Tweet;

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.id)
  user: User;
}
