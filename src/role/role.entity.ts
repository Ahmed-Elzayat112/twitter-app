import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Permission } from '../permission/permission.entity';
import { User } from 'src/entities';
import { Field, ObjectType } from '@nestjs/graphql';
import { Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Role {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Permission], { nullable: true })
  @ManyToMany(() => Permission, (permission) => permission.roles, {
    eager: true,
  })
  @JoinTable()
  permissions?: Permission[];

  @Field(() => [User], { nullable: true })
  @ManyToMany(() => User, (user) => user.roles)
  users: User[];
}
