import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
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

  @Field(() => [String], { nullable: true })
  @Column('simple-array', { nullable: true })
  permissions?: string[];

  @Field(() => [User], { nullable: true })
  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
