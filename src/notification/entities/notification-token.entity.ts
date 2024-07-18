import { Field, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/entities';
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class NotificationToken {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  @ManyToOne(() => User)
  user: User;

  @Field(() => String)
  @Column()
  device_type: string;

  @Field(() => String)
  @Column()
  notification_token: string;

  @Field(() => String)
  @Column({
    default: 'ACTIVE',
  })
  status: string;
}
