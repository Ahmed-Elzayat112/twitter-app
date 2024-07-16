import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from '../role/role.entity';
import { Field, ObjectType } from '@nestjs/graphql';
import { Int } from 'type-graphql';

@ObjectType()
@Entity()
export class Permission {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field(() => [Role], { nullable: true })
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];
}
