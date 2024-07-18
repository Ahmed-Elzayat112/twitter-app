import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { NotificationToken } from './notification-token.entity';
import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Notifications {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => NotificationToken)
  @JoinColumn({ name: 'notification_token_id', referencedColumnName: 'id' })
  @ManyToOne(() => NotificationToken)
  notification_token: NotificationToken;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column({ type: 'text', nullable: true })
  body: string;

  @Field(() => String)
  @Column()
  created_by: string;

  @Field(() => String)
  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
