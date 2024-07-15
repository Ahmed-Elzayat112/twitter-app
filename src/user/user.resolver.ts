import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/common/gql-auth.guard';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dtos/create-user.input';
import { UpdateUserInput } from './dtos/update-user.input';
import { GqlUserResponse, GqlUsersResponse } from './user.res';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => GqlUserResponse)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    const user = await this.userService.create(createUserInput);
    console.log(user);
    return user;
  }

  @Query(() => GqlUsersResponse, { name: 'users' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Query(() => GqlUserResponse, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => GqlUserResponse)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => GqlUserResponse)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.remove(id);
  }
}
